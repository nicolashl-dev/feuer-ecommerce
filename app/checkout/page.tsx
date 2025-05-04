"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCart } from "@/components/cart-provider"
import { useSupabase } from "@/components/supabase-provider"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { TransbankPayment } from "@/components/transbank-payment"
import Link from "next/link"

export default function CheckoutPage() {
  const { items, totalPrice } = useCart()
  const { supabase } = useSupabase()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState("transbank")

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setIsLoading(false)
    }

    getUser()
  }, [supabase])

  useEffect(() => {
    // Redirect to cart if cart is empty
    if (items.length === 0) {
      router.push("/carrito")
    }
  }, [items, router])

  if (isLoading) {
    return (
      <>
        <SiteHeader />
        <main className="flex-1">
          <div className="container py-8">
            <h1 className="text-3xl font-bold tracking-tight">Cargando...</h1>
          </div>
        </main>
        <SiteFooter />
      </>
    )
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-bold tracking-tight">Finalizar compra</h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              {!user ? (
                <div className="rounded-lg border bg-card p-6">
                  <h2 className="text-lg font-medium">Información de cuenta</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    ¿Ya tienes una cuenta?{" "}
                    <Link href="/login?redirect=/checkout" className="text-primary hover:underline">
                      Inicia sesión
                    </Link>
                  </p>

                  <div className="mt-6 space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input id="email" type="email" placeholder="tu@email.com" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border bg-card p-6">
                  <h2 className="text-lg font-medium">Información de cuenta</h2>
                  <p className="mt-2 text-sm text-muted-foreground">Conectado como {user.email}</p>
                </div>
              )}

              <div className="mt-8 rounded-lg border bg-card p-6">
                <h2 className="text-lg font-medium">Información de envío</h2>

                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" placeholder="Juan" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input id="lastName" placeholder="Pérez" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" placeholder="Calle Ejemplo 123" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="city">Ciudad</Label>
                      <Input id="city" placeholder="Santiago" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="region">Región</Label>
                      <Input id="region" placeholder="Metropolitana" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="postalCode">Código postal</Label>
                      <Input id="postalCode" placeholder="8320000" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" placeholder="+56 9 1234 5678" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-lg border bg-card p-6">
                <h2 className="text-lg font-medium">Método de pago</h2>

                <RadioGroup defaultValue="transbank" className="mt-6" onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <RadioGroupItem value="transbank" id="transbank" />
                    <Label htmlFor="transbank" className="flex-1 cursor-pointer">
                      Transbank Webpay
                    </Label>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-12 rounded bg-muted p-1">
                        <svg viewBox="0 0 40 24" className="h-full w-full">
                          <rect width="40" height="24" rx="4" fill="#0075c9" />
                          <path d="M14 7h12v10H14z" fill="#fff" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center space-x-2 rounded-lg border p-4 opacity-50">
                    <RadioGroupItem value="transfer" id="transfer" disabled />
                    <Label htmlFor="transfer" className="flex-1 cursor-not-allowed">
                      Transferencia bancaria (próximamente)
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "transbank" && (
                  <div className="mt-4 rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">
                      Serás redirigido a Transbank Webpay para completar tu pago de forma segura.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="rounded-lg border bg-card">
                <div className="p-6">
                  <h2 className="text-lg font-medium">Resumen del pedido</h2>

                  <div className="mt-6 space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <div className="font-medium">
                            {item.quantity} x {item.name}
                          </div>
                        </div>
                        <div className="font-medium">${(item.price * item.quantity).toLocaleString("es-CL")}</div>
                      </div>
                    ))}

                    <Separator />

                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground">Subtotal</p>
                      <p className="font-medium">${totalPrice.toLocaleString("es-CL")}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground">Envío</p>
                      <p className="font-medium">Gratis</p>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between font-medium">
                      <p>Total</p>
                      <p className="text-lg text-primary">${totalPrice.toLocaleString("es-CL")}</p>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Acepto los términos y condiciones
                        </label>
                        <p className="text-sm text-muted-foreground">
                          Al realizar tu compra, aceptas nuestros{" "}
                          <Link href="/terminos" className="text-primary hover:underline">
                            términos y condiciones
                          </Link>
                          .
                        </p>
                      </div>
                    </div>

                    <TransbankPayment amount={totalPrice} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
