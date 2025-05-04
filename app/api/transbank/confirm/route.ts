import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { getTransactionResult, acknowledgeTransaction } from "@/lib/transbank/webpay"

export async function POST(request: Request) {
  try {
    const { token_ws } = await request.json()

    // Validar token
    if (!token_ws) {
      return NextResponse.json({ error: "Token no proporcionado" }, { status: 400 })
    }

    // Obtener resultado de la transacción
    const result = await getTransactionResult(token_ws)

    // Confirmar transacción
    await acknowledgeTransaction(token_ws)

    // Actualizar estado de la orden en la base de datos
    const supabase = createClient()

    // Buscar la orden por el token de transacción
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("transaction_id", token_ws)
      .single()

    if (orderError) {
      console.error("Error al buscar la orden:", orderError)
      return NextResponse.json({ error: "Error al buscar la orden" }, { status: 500 })
    }

    // Actualizar estado de la orden según el resultado de la transacción
    const orderStatus = result.status === "AUTHORIZED" ? "completed" : "failed"
    const paymentStatus = result.status.toLowerCase()

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: orderStatus,
        payment_status: paymentStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", order.id)

    if (updateError) {
      console.error("Error al actualizar la orden:", updateError)
      return NextResponse.json({ error: "Error al actualizar la orden" }, { status: 500 })
    }

    // Limpiar cookie
    cookies().delete("webpay_token")

    return NextResponse.json({
      success: result.status === "AUTHORIZED",
      orderId: order.id,
      result,
    })
  } catch (error) {
    console.error("Error al procesar la confirmación:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
