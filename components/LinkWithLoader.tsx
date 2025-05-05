"use client"

import Link from "next/link"
import NProgress from "nprogress"
import { useRouter } from "next/navigation"
import { MouseEvent } from "react"

type Props = {
  href: string
  children: React.ReactNode
  className?: string
}

export default function LinkWithLoader({ href, children, className }: Props) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    NProgress.start()
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}
