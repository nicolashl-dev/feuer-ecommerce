import { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
    title: "Contacto | Feüer",
    description: "Contáctanos para más información sobre nuestros productos.",
}

export default function ContactPage() {
    return (
    <>
        <SiteHeader />

        <main className="bg-background text-foreground">
        {/* Facebook Section */}
        <section className="py-12 bg-card border-b">
            
        <h1 className="text-3xl font-bold mb-6 text-center p-10">Síguenos en Facebook</h1>
        <div className="flex justify-center">
            <div className=" ">
                <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100068503562178&tabs=timeline&width=500&height=400&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
                width="500px"
                height="400px"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                frameBorder="0"
                allow="encrypted-media"
                />
            </div>
            </div>
        </section>

        {/* Info & Ubicación */}
        <section className="py-12">
            <div className="container grid md:grid-cols-2 gap-10 items-start">
            <div>
                <h2 className="text-2xl font-semibold mb-4">Ubicación y contacto</h2>
                <ul className="text-muted-foreground space-y-2">
                <li><strong>Dirección:</strong> El Carbón 517, Coronel, Chile</li>
                <li><strong>Correo:</strong> contacto@feüer.cl</li>
                <li><strong>Teléfono:</strong> +56 9 7456 6665</li>
                <li>
                    <strong>WhatsApp:</strong>{" "}
                    <a
                    href="https://wa.me/56974566665"
                    className="text-green-600 underline hover:text-green-700"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Escríbenos por WhatsApp
                    </a>
                </li>
                </ul>
            </div>
            <div className="w-full h-[300px] md:h-[400px] rounded-md overflow-hidden shadow-md">
                <iframe
                title="Mapa ubicación"
                src="https://www.google.com/maps?q=El+Carbón+517,+Coronel,+Chile&output=embed"
                width="70%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                />
            </div>
            </div>
        </section>
        </main>

        <SiteFooter />

      {/* Botón flotante de WhatsApp */}
        <a
        href="https://wa.me/56974566665"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-colors"
        title="Chatea con nosotros por WhatsApp"
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M12.04 2C6.55 2 2 6.33 2 11.57c0 1.93.61 3.72 1.66 5.2L2 22l5.43-1.42a10.34 10.34 0 004.61 1.15c5.49 0 10.04-4.33 10.04-9.57C22.08 6.33 17.53 2 12.04 2zm0 17.34c-1.5 0-2.91-.42-4.12-1.15l-.29-.17-3.23.84.86-3.1-.2-.32a7.79 7.79 0 01-1.31-4.27c0-4.26 3.64-7.71 8.09-7.71s8.09 3.45 8.09 7.71-3.64 7.71-8.09 7.71zm4.42-5.88c-.24-.12-1.45-.71-1.67-.79-.22-.08-.38-.12-.54.12s-.62.79-.76.95c-.14.16-.28.18-.52.06a6.45 6.45 0 01-1.9-1.55 7.12 7.12 0 01-1.33-1.97c-.14-.24 0-.37.1-.5.1-.1.22-.26.34-.39.11-.13.15-.22.23-.37.08-.16.04-.3-.02-.42-.06-.12-.54-1.28-.74-1.75-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3s-.84.82-.84 2 .86 2.32 1 2.48c.12.16 1.69 2.57 4.12 3.61.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z" />
        </svg>
        </a>
    </>
    )
}