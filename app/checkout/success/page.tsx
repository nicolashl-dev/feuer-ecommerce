"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"
import LinkWithLoader from "@/components/LinkWithLoader"

export default function CheckoutSuccessPage() {
  const [orderNumber, setOrderNumber] = useState("")

  useEffect(() => {
    // Generar un número de orden aleatorio para la demo
    const randomOrderNumber = Math.floor(100000 + Math.random() * 900000).toString()
    setOrderNumber(randomOrderNumber)
  }, [])

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-16">
          <div className="mx-auto max-w-md rounded-lg border bg-card p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h1 className="mt-6 text-2xl font-bold">¡Pago completado con éxito!</h1>
            <p className="mt-2 text-muted-foreground">
              Tu pedido #{orderNumber} ha sido recibido y está siendo procesado.
            </p>

            <div className="mt-8 rounded-lg border p-4 text-left">
              <h2 className="font-medium">Detalles del pedido</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Número de pedido:</span>
                  <span>{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fecha:</span>
                  <span>{new Date().toLocaleDateString("es-CL")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estado:</span>
                  <span className="text-green-500">Pagado</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <Button asChild>
                <LinkWithLoader
                 href="/pedidos">Ver mis pedidos</LinkWithLoader>
              </Button>
              <Button variant="outline" asChild>
                <LinkWithLoader href="/">Volver a la tienda</LinkWithLoader>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
