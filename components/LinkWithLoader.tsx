"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import NProgress from "nprogress"

// Inicializar NProgress
NProgress.configure({ showSpinner: true })

interface LinkWithLoaderProps {
  href: string
  children: React.ReactNode
  className?: string
  prefetch?: boolean
}

export default function LinkWithLoader({ href, children, className, prefetch }: LinkWithLoaderProps) {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsNavigating(true)
      NProgress.start()
    }

    const handleRouteChangeComplete = () => {
      setIsNavigating(false)
      NProgress.done()
    }

    const handleRouteChangeError = () => {
      setIsNavigating(false)
      NProgress.done()
    }

    // Añadir event listeners
    window.addEventListener("beforeunload", handleRouteChangeStart)
    document.addEventListener("next:router:change:start", handleRouteChangeStart)
    document.addEventListener("next:router:change:complete", handleRouteChangeComplete)
    document.addEventListener("next:router:change:error", handleRouteChangeError)

    // Limpiar event listeners
    return () => {
      window.removeEventListener("beforeunload", handleRouteChangeStart)
      document.removeEventListener("next:router:change:start", handleRouteChangeStart)
      document.removeEventListener("next:router:change:complete", handleRouteChangeComplete)
      document.removeEventListener("next:router:change:error", handleRouteChangeError)
    }
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    NProgress.start()
    router.push(href)
  }

  return (
    <Link href={href} className={className} prefetch={prefetch} onClick={handleClick} aria-disabled={isNavigating}>
      {children}
    </Link>
  )
}
