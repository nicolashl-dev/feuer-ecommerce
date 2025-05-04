import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { initTransaction } from "@/lib/transbank/webpay"

export async function POST(request: Request) {
  try {
    const { amount, items, shippingDetails } = await request.json()

    // Validar datos
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "El monto es inválido" }, { status: 400 })
    }

    // Obtener usuario actual
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 })
    }

    // Crear orden en la base de datos
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total: amount,
        status: "pending",
        payment_method: "webpay",
        payment_status: "pending",
        shipping_address: shippingDetails?.address,
        shipping_city: shippingDetails?.city,
        shipping_region: shippingDetails?.region,
        shipping_postal_code: shippingDetails?.postalCode,
        shipping_phone: shippingDetails?.phone,
      })
      .select()
      .single()

    if (orderError) {
      console.error("Error al crear la orden:", orderError)
      return NextResponse.json({ error: "Error al crear la orden" }, { status: 500 })
    }

    // Guardar items de la orden
    if (items && items.length > 0) {
      const orderItems = items.map((item: any) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }))

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

      if (itemsError) {
        console.error("Error al guardar los items de la orden:", itemsError)
      }
    }

    // Iniciar transacción con Transbank
    const buyOrder = order.id
    const sessionId = user.id
    const returnUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/confirm`

    const transaction = await initTransaction(amount, buyOrder, sessionId, returnUrl)

    // Guardar token en la orden
    await supabase.from("orders").update({ transaction_id: transaction.token }).eq("id", order.id)

    // Guardar token en una cookie para recuperarlo después
    cookies().set("webpay_token", transaction.token, {
      path: "/",
      maxAge: 3600, // 1 hora
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })

    return NextResponse.json({
      token: transaction.token,
      url: transaction.url,
      orderId: order.id,
    })
  } catch (error) {
    console.error("Error al procesar la solicitud:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
