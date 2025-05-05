"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "@/styles/nprogress.css"; // Si tienes estilos personalizados

export default function NProgressClient() {
  const pathname = usePathname();
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    NProgress.start();

    // Finge duración de navegación. Cancela si ya se está ejecutando otra.
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      NProgress.done();
    }, 500); // duración simulada, puedes ajustar este tiempo

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [pathname]);

  return null;
}
