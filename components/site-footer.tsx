import Link from "next/link"
import LinkWithLoader from "@/components/LinkWithLoader"

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
          <LinkWithLoader href="/">
              <img
                src="https://res.cloudinary.com/dc31jopzd/image/upload/v1746411355/logo1_gnwc1t.png"
                alt="Feüer logo"
                className="h-14 mb-4"
              />
            </LinkWithLoader>
            <p className="mt-2 text-sm text-muted-foreground">
              Calidad y eficiencia en estufas a combustión lenta para tu hogar.
            </p>
            <a href="https://www.facebook.com/profile.php?id=100068503562178" target="_blank" rel="noopener noreferrer">
              <img
                src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000"
                alt="Facebook"
                className="h-8 mt-4 mr-2 inline-block"
              />
            </a>
            <a href="https://www.instagram.com/feuercalefactores/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000"
                alt="Instagram"
                className="h-8 mt-4 mr-2 inline-block"
              />
            </a>
            <a href="https://wa.me/974566665" target="_blank" rel="noopener noreferrer">
              <img
                src="https://img.icons8.com/?size=100&id=16713&format=png&color=000000"
                alt="Whatsapp"
                className="h-8 mt-4 mr-2 inline-block"
              />
            </a>         
          </div>
          <div>
            <h3 className="text-base font-medium">Navegación</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <LinkWithLoader href="/" className="text-muted-foreground hover:text-foreground">
                  Inicio
                </LinkWithLoader>
              </li>
              <li>
                <LinkWithLoader href="/productos" className="text-muted-foreground hover:text-foreground">
                  Productos
                </LinkWithLoader>
              </li>
              <li>
                <LinkWithLoader href="/nosotros" className="text-muted-foreground hover:text-foreground">
                  Nosotros
                </LinkWithLoader>
              </li>
              <li>
                <LinkWithLoader href="/contacto" className="text-muted-foreground hover:text-foreground">
                  Contacto
                </LinkWithLoader>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-medium">Legal</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <LinkWithLoader href="/terminos" className="text-muted-foreground hover:text-foreground">
                  Términos y condiciones
                </LinkWithLoader>
              </li>
              <li>
                <LinkWithLoader href="/privacidad" className="text-muted-foreground hover:text-foreground">
                  Política de privacidad
                </LinkWithLoader>
              </li>
              <li>
                <LinkWithLoader href="/envios" className="text-muted-foreground hover:text-foreground">
                  Política de envíos
                </LinkWithLoader>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-medium">Contacto</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="text-muted-foreground">contacto@feüer.cl</li>
              <li className="text-muted-foreground">+56 9 74566665</li>
              <li className="text-muted-foreground">Coronel, Chile</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Feüer. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
