import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { createClient } from "@/lib/supabase/server"
import LinkWithLoader from "@/components/LinkWithLoader"

async function getFeaturedProducts() {
  const supabase = createClient()

  const { data, error } = await supabase.from("products").select("*").eq("featured", true).limit(4)

  if (error) {
    console.error("Error fetching featured products:", error)
    return []
  }

  return data || []
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="hero-gradient absolute inset-0 z-10"></div>
          <div className="relative h-[70vh] w-full overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dc31jopzd/image/upload/v1746394934/477657951_937886255171485_5051038350513581750_n_ia1mkk.jpg"
              alt="Estufa a combustión lenta"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Feuer</h1>
            <p className="mt-6 max-w-lg text-lg text-gray-200">
              Calefacción eficiente y duradera para tu hogar. Diseño moderno con la mejor tecnología.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <LinkWithLoader href="/productos">Ver Productos</LinkWithLoader>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <LinkWithLoader href="/nosotros">Conoce Más</LinkWithLoader>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="container py-16">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Productos Destacados</h2>
              <p className="text-muted-foreground">Descubre nuestras estufas más populares</p>
            </div>
            <Button asChild>
              <LinkWithLoader href="/productos">Ver todos</LinkWithLoader>
            </Button>
          </div>

          <div className="product-grid mt-8">
            {featuredProducts.length > 0
              ? featuredProducts.map((product) => (
                  <LinkWithLoader
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
                  </LinkWithLoader>
                ))
              : // Placeholder products if no data is available yet
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="overflow-hidden rounded-lg border bg-card">
                    <div className="aspect-square overflow-hidden bg-muted">
                      <Image
                        src={`/placeholder.svg?height=600&width=600&text=Estufa+${i + 1}`}
                        alt="Placeholder"
                        width={600}
                        height={600}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">Estufa Modelo Premium {i + 1}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Estufa a combustión lenta de alta eficiencia</p>
                      <p className="mt-2 font-medium text-primary">${(299990 + i * 50000).toLocaleString("es-CL")}</p>
                    </div>
                  </div>
                ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted py-16">
          <div className="container">
            <h2 className="text-center text-3xl font-bold tracking-tight">¿Por qué elegir nuestras estufas?</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium">Alta Eficiencia</h3>
                <p className="mt-2 text-muted-foreground">
                  Nuestras estufas aprovechan al máximo el combustible, generando más calor con menos recursos.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium">Larga Duración</h3>
                <p className="mt-2 text-muted-foreground">
                  Combustión lenta que permite mantener el calor por más tiempo, reduciendo la frecuencia de recarga.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium">Diseño Moderno</h3>
                <p className="mt-2 text-muted-foreground">
                  Estufas con diseños elegantes que complementan la decoración de cualquier hogar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container py-16">
          <h2 className="text-center text-3xl font-bold tracking-tight">Lo que dicen nuestros clientes</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                name: "María González",
                location: "Santiago",
                quote:
                  "La estufa ha transformado nuestra sala de estar. El calor es constante y el consumo de leña es mucho menor que con nuestra antigua estufa.",
              },
              {
                name: "Juan Pérez",
                location: "Concepción",
                quote:
                  "Excelente producto y servicio. La instalación fue rápida y profesional. La estufa calienta toda la casa con muy poca leña.",
              },
              {
                name: "Carolina Silva",
                location: "Valdivia",
                quote:
                  "Después de dos inviernos, puedo decir que esta ha sido la mejor inversión para nuestro hogar. Calienta de manera uniforme y es muy fácil de mantener.",
              },
            ].map((testimonial, i) => (
              <div key={i} className="rounded-lg border bg-card p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted"></div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight">¿Listo para mejorar la calefacción de tu hogar?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/90">
              Nuestras estufas a combustión lenta son la solución perfecta para mantener tu hogar cálido y acogedor
              durante los meses más fríos.
            </p>
            <Button asChild size="lg" className="mt-8 bg-white text-primary hover:bg-white/90">
              <LinkWithLoader href="/productos">Ver Catálogo</LinkWithLoader>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
