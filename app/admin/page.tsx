"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useSupabase } from "@/components/supabase-provider"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductsTable } from "@/components/admin/products-table"
import { OrdersTable } from "@/components/admin/orders-table"
import { UsersTable } from "@/components/admin/users-table"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  const { supabase } = useSupabase()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        // Verificar si el usuario es administrador en la tabla users_profiles
        const { data: profile, error } = await supabase
          .from('users_profiles')
          .select('is_admin')
          .eq('user_id', user.id)
          .single()

        if (error) {
          console.error("Error al obtener el perfil del usuario:", error)
          setIsAdmin(false)
        } else {
          setIsAdmin(profile?.is_admin || false) // Establecer isAdmin según el perfil
        }
      }

      setIsLoading(false)
    }

    checkUser()
  }, [supabase])

  // Redirigir si no es admin
  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push("/")
    }
  }, [isLoading, user, isAdmin, router])

  if (isLoading) {
    return (
      <>
        <SiteHeader />
        <main className="flex-1">
          <div className="container py-8">
            <h1 className="text-3xl font-bold tracking-tight">Cargando...</h1>
          </div>
        </main>
        <SiteFooter />
      </>
    )
  }

  if (!user || !isAdmin) {
    return null // No renderizamos nada mientras se redirige
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Panel de administración</h1>
            <Button variant="outline" asChild>
              <a href="/" target="_blank" rel="noopener noreferrer">
                Ver tienda
              </a>
            </Button>
          </div>

          <Tabs defaultValue="dashboard" className="mt-8">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="products">Productos</TabsTrigger>
              <TabsTrigger value="orders">Pedidos</TabsTrigger>
              <TabsTrigger value="users">Usuarios</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="mt-6">
              <AdminDashboard />
            </TabsContent>

            <TabsContent value="products" className="mt-6">
              <ProductsTable />
            </TabsContent>

            <TabsContent value="orders" className="mt-6">
              <OrdersTable />
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              <UsersTable />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}