import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

async function getProducts() {
  const supabase = createClient()

  const { data, error } = await supabase.from("products").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data || []
}

async function getCategories() {
  const supabase = createClient()

  const { data, error } = await supabase.from("categories").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data || []
}

export default async function ProductsPage() {
  const products = await getProducts()
  const categories = await getCategories()

  // Placeholder products if no data is available yet
  const placeholderProducts = Array.from({ length: 6 }).map((_, i) => ({
    id: `placeholder-${i}`,
    name: `Estufa Modelo Premium ${i + 1}`,
    short_description: "Estufa a combustión lenta de alta eficiencia",
    price: 299990 + i * 50000,
    image_url: `/placeholder.svg?height=600&width=600&text=Estufa+${i + 1}`,
  }))

  const displayProducts = products.length > 0 ? products : placeholderProducts

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
              <p className="text-muted-foreground">Explora nuestra colección de estufas a combustión lenta</p>
            </div>
            <div className="flex items-center gap-4">
              <Select defaultValue="featured">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Destacados</SelectItem>
                  <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="newest">Más recientes</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))
                  ) : (
                    <>
                      <SelectItem value="leña">Estufas a Leña</SelectItem>
                      <SelectItem value="pellet">Estufas a Pellet</SelectItem>
                      <SelectItem value="hibridas">Estufas Híbridas</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="product-grid mt-8">
            {displayProducts.map((product) => (
              <Link
                key={product.id}
                href={`/productos/${product.id}`}
                className="group overflow-hidden rounded-lg border bg-card transition-colors hover:border-primary"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={product.image_url || "/placeholder.svg?height=600&width=600"}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{product.short_description}</p>
                  <p className="mt-2 font-medium text-primary">${product.price.toLocaleString("es-CL")}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
