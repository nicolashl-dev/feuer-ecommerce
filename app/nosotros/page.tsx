// app/nosotros/page.tsx
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Image from "next/image"

export default function NosotrosPage() {
return (
    <>
    <SiteHeader />
    <main className="flex-1">
        <section className="relative h-[60vh]">
        <Image
            src="https://res.cloudinary.com/dc31jopzd/image/upload/v1746735569/feuer_ywfhxj.jpg"
            alt="Nosotros"
            fill
            className="object-cover"
            priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-center px-4">
            <div>
            <h1 className="text-4xl md:text-5xl font-bold">Sobre Nosotros</h1>
            <p className="mt-4 max-w-xl mx-auto text-lg text-gray-200">
                Comprometidos con brindarte calefacción eficiente, estética y responsable con el medio ambiente.
            </p>
            </div>
        </div>
        </section>

        {/* Historia */}
        <section className="container py-16">
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight">Nuestra Historia</h2>
            <p className="mt-6 text-muted-foreground">
            Feüer nace de la necesidad de entregar soluciones de calefacción confiables y elegantes en los hogares
            chilenos. Desde nuestros inicios, hemos apostado por tecnología de combustión lenta que mejora la eficiencia
            energética y reduce el impacto ambiental.
            </p>
        </div>
        </section>

        {/* Misión y Visión */}
        <section className="bg-muted py-16">
        <div className="container grid md:grid-cols-2 gap-12">
            <div>
            <h3 className="text-2xl font-semibold">Nuestra Misión</h3>
            <p className="mt-4 text-muted-foreground">
                Entregar estufas de alto rendimiento con un diseño moderno, que aporten calidez y elegancia a tu hogar.
            </p>
            </div>
            <div>
            <h3 className="text-2xl font-semibold">Nuestra Visión</h3>
            <p className="mt-4 text-muted-foreground">
                Ser referentes en calefacción sustentable en Chile y Latinoamérica, liderando con innovación y compromiso
                ambiental.
            </p>
            </div>
        </div>
        </section>

        {/* Valores */}
        <section className="container py-16">
        <h2 className="text-3xl font-bold tracking-tight text-center">Nuestros Valores</h2>
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            {[
            {
                title: "Calidad",
                description: "Seleccionamos los mejores materiales para garantizar durabilidad y rendimiento.",
            },
            {
                title: "Innovación",
                description: "Buscamos mejorar constantemente nuestros diseños y tecnología.",
            },
            {
                title: "Sustentabilidad",
                description: "Diseñamos pensando en el futuro del planeta y el bienestar de las personas.",
            },
            ].map((value, i) => (
            <div key={i} className="rounded-lg border bg-card p-6">
                <h4 className="text-xl font-semibold">{value.title}</h4>
                <p className="mt-2 text-muted-foreground">{value.description}</p>
            </div>
            ))}
        </div>
        </section>
    </main>
    <SiteFooter />
    </>
)
}