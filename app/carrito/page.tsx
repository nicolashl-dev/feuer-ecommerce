"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCart } from "@/components/cart-provider"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart()
  const router = useRouter()

  const handleCheckout = () => {
    router.push("/checkout")
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-bold tracking-tight">Carrito de compras</h1>

          {items.length === 0 ? (
            <div className="mt-8 flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center">
              <div className="text-6xl">🛒</div>
              <h2 className="mt-4 text-xl font-semibold">Tu carrito está vacío</h2>
              <p className="mt-2 text-muted-foreground">Parece que aún no has agregado productos a tu carrito.</p>
              <Button asChild className="mt-6">
                <Link href="/productos">Ver productos</Link>
              </Button>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="rounded-lg border bg-card">
                  <div className="p-6">
                    <h2 className="text-lg font-medium">Productos ({totalItems})</h2>
                  </div>
                  <Separator />

                  {items.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex gap-4">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={96}
                            height={96}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between text-base font-medium">
                            <h3>
                              <Link href={`/productos/${item.id}`} className="hover:underline">
                                {item.name}
                              </Link>
                            </h3>
                            <p className="ml-4 text-primary">${item.price.toLocaleString("es-CL")}</p>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">Disminuir cantidad</span>
                              </Button>
                              <div className="w-12 text-center">{item.quantity}</div>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">Aumentar cantidad</span>
                              </Button>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Eliminar</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Separator className="mt-6" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="rounded-lg border bg-card">
                  <div className="p-6">
                    <h2 className="text-lg font-medium">Resumen del pedido</h2>
                    <div className="mt-6 space-y-4">
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
                      <Button className="mt-6 w-full" onClick={handleCheckout}>
                        Proceder al pago
                      </Button>
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/productos">Seguir comprando</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
