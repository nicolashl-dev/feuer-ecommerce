"use client"

import Link from "next/link"
import NProgress from "nprogress"
import { usePathname, useRouter } from "next/navigation"
import { MouseEvent, useEffect } from "react"

type Props = {
  href: string
  children: React.ReactNode
  className?: string
}

export default function LinkWithLoader({ href, children, className }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (href === pathname) {
      e.preventDefault() // No hacer nada si estás en la misma ruta
      return
    }

    NProgress.start()
  }

  // Este hook asegura que se detenga el loader cuando haya una navegación
  useEffect(() => {
    const handleComplete = () => {
      NProgress.done()
    }

    window.addEventListener("pageshow", handleComplete)
    window.addEventListener("load", handleComplete)

    return () => {
      window.removeEventListener("pageshow", handleComplete)
      window.removeEventListener("load", handleComplete)
    }
  }, [])

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}

