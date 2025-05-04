"use client"

import { useEffect, useRef } from "react"

export function LineChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return

    // Datos de ejemplo
    const labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    const data = [
      1200000, 1500000, 1300000, 1700000, 1600000, 1800000, 2100000, 1900000, 2200000, 2500000, 2300000, 2700000,
    ]

    // Configuración del gráfico
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    const padding = 40
    const maxValue = Math.max(...data) * 1.1

    // Limpiar canvas
    ctx.clearRect(0, 0, width, height)

    // Dibujar ejes
    ctx.beginPath()
    ctx.strokeStyle = "#64748b"
    ctx.lineWidth = 1
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Dibujar línea de datos
    ctx.beginPath()
    ctx.strokeStyle = "#dc2626"
    ctx.lineWidth = 2

    const pointWidth = (width - padding * 2) / (data.length - 1)

    data.forEach((value, index) => {
      const x = padding + index * pointWidth
      const y = height - padding - (value / maxValue) * (height - padding * 2)

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Dibujar puntos
    data.forEach((value, index) => {
      const x = padding + index * pointWidth
      const y = height - padding - (value / maxValue) * (height - padding * 2)

      ctx.beginPath()
      ctx.fillStyle = "#dc2626"
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    })

    // Dibujar etiquetas del eje X
    ctx.fillStyle = "#64748b"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"

    labels.forEach((label, index) => {
      const x = padding + index * pointWidth
      ctx.fillText(label, x, height - padding + 15)
    })

    // Dibujar etiquetas del eje Y
    ctx.textAlign = "right"

    const numYLabels = 5
    for (let i = 0; i <= numYLabels; i++) {
      const value = (maxValue / numYLabels) * i
      const y = height - padding - (value / maxValue) * (height - padding * 2)

      ctx.fillText(`$${Math.round(value / 1000000)}M`, padding - 10, y + 3)

      // Líneas de cuadrícula
      ctx.beginPath()
      ctx.strokeStyle = "#e2e8f0"
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }
  }, [])

  return <canvas ref={canvasRef} width={800} height={400} className="w-full" />
}

export function BarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return

    // Datos de ejemplo
    const labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    const visitsData = [2500, 3000, 2800, 3500, 3200, 3800, 4200, 3900, 4500, 5000, 4800, 5500]
    const conversionsData = [120, 150, 140, 180, 160, 190, 210, 195, 225, 250, 240, 275]

    // Configuración del gráfico
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    const padding = 40
    const maxVisits = Math.max(...visitsData) * 1.1
    const maxConversions = Math.max(...conversionsData) * 1.1

    // Limpiar canvas
    ctx.clearRect(0, 0, width, height)

    // Dibujar ejes
    ctx.beginPath()
    ctx.strokeStyle = "#64748b"
    ctx.lineWidth = 1
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Dibujar barras
    const barWidth = (width - padding * 2) / labels.length / 3
    const barSpacing = barWidth / 2

    // Barras de visitas
    visitsData.forEach((value, index) => {
      const x = padding + index * (barWidth * 3) + barSpacing
      const barHeight = (value / maxVisits) * (height - padding * 2)
      const y = height - padding - barHeight

      ctx.fillStyle = "rgba(220, 38, 38, 0.7)"
      ctx.fillRect(x, y, barWidth, barHeight)
    })

    // Barras de conversiones
    conversionsData.forEach((value, index) => {
      const x = padding + index * (barWidth * 3) + barWidth * 2
      const barHeight = (value / maxConversions) * (height - padding * 2)
      const y = height - padding - barHeight

      ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
      ctx.fillRect(x, y, barWidth, barHeight)
    })

    // Dibujar etiquetas del eje X
    ctx.fillStyle = "#64748b"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"

    labels.forEach((label, index) => {
      const x = padding + index * (barWidth * 3) + barWidth * 1.5
      ctx.fillText(label, x, height - padding + 15)
    })

    // Dibujar etiquetas del eje Y (izquierda - visitas)
    ctx.textAlign = "right"

    const numYLabels = 5
    for (let i = 0; i <= numYLabels; i++) {
      const value = (maxVisits / numYLabels) * i
      const y = height - padding - (value / maxVisits) * (height - padding * 2)

      ctx.fillText(`${Math.round(value)}`, padding - 10, y + 3)

      // Líneas de cuadrícula
      ctx.beginPath()
      ctx.strokeStyle = "#e2e8f0"
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Leyenda
    const legendX = width - padding - 150
    const legendY = padding + 20

    // Visitas
    ctx.fillStyle = "rgba(220, 38, 38, 0.7)"
    ctx.fillRect(legendX, legendY, 15, 15)
    ctx.fillStyle = "#64748b"
    ctx.textAlign = "left"
    ctx.fillText("Visitas", legendX + 20, legendY + 12)

    // Conversiones
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
    ctx.fillRect(legendX, legendY + 25, 15, 15)
    ctx.fillStyle = "#64748b"
    ctx.fillText("Conversiones", legendX + 20, legendY + 37)
  }, [])

  return <canvas ref={canvasRef} width={800} height={400} className="w-full" />
}

export function PieChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return

    // Datos de ejemplo
    const data = [
      { label: "Estufas a Leña", value: 45, color: "#dc2626" },
      { label: "Estufas a Pellet", value: 30, color: "#000000" },
      { label: "Estufas Híbridas", value: 25, color: "#64748b" },
    ]

    // Configuración del gráfico
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 40

    // Limpiar canvas
    ctx.clearRect(0, 0, width, height)

    // Calcular el total
    const total = data.reduce((sum, item) => sum + item.value, 0)

    // Dibujar sectores
    let startAngle = -Math.PI / 2

    data.forEach((item) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI

      ctx.beginPath()
      ctx.fillStyle = item.color
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()
      ctx.fill()

      // Calcular posición para la etiqueta
      const midAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 0.7
      const labelX = centerX + Math.cos(midAngle) * labelRadius
      const labelY = centerY + Math.sin(midAngle) * labelRadius

      // Dibujar etiqueta
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 14px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(`${item.value}%`, labelX, labelY)

      startAngle += sliceAngle
    })

    // Leyenda
    const legendX = width - 150
    const legendY = height / 2 - data.length * 15

    ctx.font = "12px sans-serif"
    ctx.textAlign = "left"

    data.forEach((item, index) => {
      const itemY = legendY + index * 25

      // Cuadrado de color
      ctx.fillStyle = item.color
      ctx.fillRect(legendX, itemY, 15, 15)

      // Texto
      ctx.fillStyle = "#64748b"
      ctx.fillText(item.label, legendX + 25, itemY + 10)
    })
  }, [])

  return <canvas ref={canvasRef} width={400} height={400} className="w-full" />
}
