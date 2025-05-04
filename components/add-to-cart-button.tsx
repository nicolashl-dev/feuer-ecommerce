"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    image_url: string
  }
  quantity?: number
}

export function AddToCartButton({ product, quantity = 1 }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = () => {
    setIsAdding(true)

    // Simulate a small delay for better UX
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url || "/placeholder.svg?height=100&width=100",
        quantity,
      })

      setIsAdding(false)

      toast({
        title: "Producto agregado",
        description: `${product.name} ha sido agregado al carrito.`,
      })
    }, 500)
  }

  return (
    <Button onClick={handleAddToCart} disabled={isAdding} className="flex-1">
      <ShoppingCart className="mr-2 h-4 w-4" />
      {isAdding ? "Agregando..." : "Agregar al carrito"}
    </Button>
  )
}
