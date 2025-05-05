"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggleButton } from "@/components/theme-toggle-button"
import { useCart } from "@/components/cart-provider"
import { useSupabase } from "@/components/supabase-provider"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function SiteHeader() {
  const pathname = usePathname()
  const { totalItems } = useCart()
  const { supabase } = useSupabase()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setIsLoading(false)
    }

    getUser()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    window.location.href = "/"
  }

  const mainNav = [
    {
      title: "Inicio",
      href: "/",
    },
    {
      title: "Productos",
      href: "/productos",
    },
    {
      title: "Nosotros",
      href: "/nosotros",
    },
    {
      title: "Contacto",
      href: "/contacto",
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative container flex h-16 items-center justify-between">
      <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
  <img src="https://res.cloudinary.com/dc31jopzd/image/upload/v1746411355/logo1_gnwc1t.png" alt="Feuer logo" className="h-14" />
</Link>
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
          </Link>
          <nav className="hidden gap-6 md:flex">
            {mainNav.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center text-sm font-medium ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
        <ThemeToggleButton /> 
          <Link href="/carrito">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">Carrito</span>
            </Button>
          </Link>

          {!isLoading &&
            (user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Perfil</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/perfil">Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/pedidos">Mis pedidos</Link>
                  </DropdownMenuItem>
                  {user.app_metadata?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Administración</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>Cerrar sesión</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Iniciar sesión</Link>
              </Button>
            ))}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {mainNav.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`text-sm font-medium ${
                      pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
