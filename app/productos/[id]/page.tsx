import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { createClient } from "@/lib/supabase/server"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Truck } from "lucide-react"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { notFound } from "next/navigation"

async function getProduct(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("products").select("*, categories(*)").eq("id", id).single()

  if (error) {
    console.error("Error fetching product:", error)
    return null
  }

  return data
}

async function getRelatedProducts(categoryId: string, currentProductId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .neq("id", currentProductId)
    .limit(4)

  if (error) {
    console.error("Error fetching related products:", error)
    return []
  }

  return data || []
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    // If we don't have real data yet, create a placeholder product
    if (params.id.startsWith("placeholder-")) {
      const index = Number.parseInt(params.id.split("-")[1])
      const placeholderProduct = {
        id: params.id,
        name: `Estufa Modelo Premium ${index + 1}`,
        short_description: "Estufa a combustión lenta de alta eficiencia",
        description:
          "Esta estufa a combustión lenta ofrece un rendimiento excepcional, calentando espacios de hasta 90m² con un consumo mínimo de leña. Su diseño moderno se integra perfectamente en cualquier decoración, mientras que su sistema de doble combustión garantiza una mayor eficiencia y menor emisión de partículas.",
        price: 299990 + index * 50000,
        stock: 10,
        image_url: `/placeholder.svg?height=600&width=600&text=Estufa+${index + 1}`,
        category_id: "placeholder",
        categories: { name: "Estufas a Leña" },
      }

      return renderProductPage(placeholderProduct, [])
    }

    return notFound()
  }

  const relatedProducts = await getRelatedProducts(product.category_id, product.id)

  return renderProductPage(product, relatedProducts)
}

function renderProductPage(product: any, relatedProducts: any[]) {
  // Create placeholder related products if none exist
  const displayRelatedProducts =
    relatedProducts.length > 0
      ? relatedProducts
      : Array.from({ length: 4 }).map((_, i) => ({
          id: `related-${i}`,
          name: `Estufa Relacionada ${i + 1}`,
          short_description: "Estufa a combustión lenta",
          price: 299990 + i * 30000,
          image_url: `/placeholder.svg?height=400&width=400&text=Relacionada+${i + 1}`,
        }))

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-lg border bg-card">
              <Image
                src={product.image_url || "/placeholder.svg?height=800&width=800"}
                alt={product.name}
                width={800}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="mt-2">
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                  {product.categories?.name || "Estufas a Leña"}
                </span>
              </div>
              <div className="mt-4 text-2xl font-bold text-primary">${product.price.toLocaleString("es-CL")}</div>

              <div className="mt-6 space-y-6">
                <p className="text-muted-foreground">{product.description}</p>

                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4" />
                  <span>Envío gratis a todo Chile</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">Cantidad:</div>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Minus className="h-3 w-3" />
                      <span className="sr-only">Disminuir cantidad</span>
                    </Button>
                    <div className="w-12 text-center">1</div>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Plus className="h-3 w-3" />
                      <span className="sr-only">Aumentar cantidad</span>
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <AddToCartButton product={product} />
                  <Button variant="outline">Comprar ahora</Button>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="font-medium">Características principales:</div>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>• Potencia: 9.5 kW</li>
                    <li>• Eficiencia: 78%</li>
                    <li>• Área calefaccionada: hasta 90m²</li>
                    <li>• Consumo de leña: 2.5 kg/h</li>
                    <li>• Dimensiones: 70 x 50 x 85 cm</li>
                    <li>• Peso: 120 kg</li>
                    <li>• Garantía: 2 años</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold">Productos relacionados</h2>
            <div className="product-grid mt-6">
              {displayRelatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="overflow-hidden rounded-lg border bg-card">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={relatedProduct.image_url || "/placeholder.svg?height=400&width=400"}
                      alt={relatedProduct.name}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{relatedProduct.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{relatedProduct.short_description}</p>
                    <p className="mt-2 font-medium text-primary">${relatedProduct.price.toLocaleString("es-CL")}</p>
                    <Button variant="outline" className="mt-4 w-full">
                      Ver detalles
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
