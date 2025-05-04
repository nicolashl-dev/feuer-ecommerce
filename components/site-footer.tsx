import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-primary">Estufas Premium</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Calidad y eficiencia en estufas a combustión lenta para tu hogar.
            </p>
          </div>
          <div>
            <h3 className="text-base font-medium">Navegación</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="text-muted-foreground hover:text-foreground">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-muted-foreground hover:text-foreground">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-muted-foreground hover:text-foreground">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-medium">Legal</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/terminos" className="text-muted-foreground hover:text-foreground">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-muted-foreground hover:text-foreground">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/envios" className="text-muted-foreground hover:text-foreground">
                  Política de envíos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-medium">Contacto</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="text-muted-foreground">contacto@estufaspremium.cl</li>
              <li className="text-muted-foreground">+56 9 1234 5678</li>
              <li className="text-muted-foreground">Santiago, Chile</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Estufas Premium. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
