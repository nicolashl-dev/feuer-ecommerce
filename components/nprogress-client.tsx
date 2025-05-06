"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import "@/styles/nprogress.css"

export default function NProgressClient() {
  const pathname = usePathname()

  useEffect(() => {
    // Detiene el loader cuando se completa la navegación
    NProgress.done()
  }, [pathname])

  return null
}
