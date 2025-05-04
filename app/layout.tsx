import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/components/cart-provider"
import { createClient } from "@/lib/supabase/client"
import { SupabaseProvider } from "@/components/supabase-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Estufas Premium - Combustión Lenta",
  description: "Tienda online de estufas a combustión lenta de alta calidad",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = createClient()

  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <ThemeProvider>
          <SupabaseProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </SupabaseProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
