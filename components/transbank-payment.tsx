"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/components/cart-provider"

interface TransbankPaymentProps {
  amount: number
}

export function TransbankPayment({ amount }: TransbankPaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { clearCart } = useCart()

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      // En un entorno real, aquí se haría una llamada a la API para iniciar la transacción con Transbank
      // const response = await fetch('/api/transbank/create', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ amount })
      // })
      // const data = await response.json()

      // Simulamos un retraso para la demo
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulamos una redirección a Transbank
      toast({
        title: "Redirigiendo a Transbank",
        description: "Serás redirigido a la página de pago de Transbank...",
      })

      // Simulamos otro retraso para la demo
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulamos un pago exitoso
      clearCart()
      router.push("/checkout/success")
    } catch (error) {
      console.error("Error al procesar el pago:", error)
      toast({
        title: "Error al procesar el pago",
        description: "Ha ocurrido un error al procesar tu pago. Por favor, intenta nuevamente.",
        variant: "destructive",
      })
      setIsProcessing(false)
    }
  }

  return (
    <Button className="mt-6 w-full" onClick={handlePayment} disabled={isProcessing}>
      {isProcessing ? "Procesando..." : "Realizar pago"}
    </Button>
  )
}
