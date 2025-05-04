"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"

// Datos de ejemplo para la demo
const demoOrders = [
  {
    id: "ORD-001",
    customer: "Juan Pérez",
    date: "2023-05-15",
    total: 299990,
    status: "completed",
    items: [{ name: "Estufa Modelo Premium 1", quantity: 1, price: 299990 }],
  },
  {
    id: "ORD-002",
    customer: "María González",
    date: "2023-05-18",
    total: 349990,
    status: "processing",
    items: [{ name: "Estufa Modelo Premium 2", quantity: 1, price: 349990 }],
  },
  {
    id: "ORD-003",
    customer: "Carlos Rodríguez",
    date: "2023-05-20",
    total: 799980,
    status: "completed",
    items: [{ name: "Estufa Modelo Premium 3", quantity: 2, price: 399990 }],
  },
  {
    id: "ORD-004",
    customer: "Ana Silva",
    date: "2023-05-22",
    total: 449990,
    status: "shipped",
    items: [{ name: "Estufa Modelo Premium 4", quantity: 1, price: 449990 }],
  },
  {
    id: "ORD-005",
    customer: "Pedro Martínez",
    date: "2023-05-25",
    total: 499990,
    status: "cancelled",
    items: [{ name: "Estufa Modelo Premium 5", quantity: 1, price: 499990 }],
  },
]

export function OrdersTable() {
  const [orders] = useState(demoOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completado</Badge>
      case "processing":
        return <Badge className="bg-blue-500">Procesando</Badge>
      case "shipped":
        return <Badge className="bg-yellow-500">Enviado</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Cancelado</Badge>
      default:
        return <Badge>Desconocido</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Buscar pedidos..."
            className="w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString("es-CL")}</TableCell>
                  <TableCell>${order.total.toLocaleString("es-CL")}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Ver detalles</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Detalles del pedido {order.id}</DialogTitle>
                          <DialogDescription>Información completa del pedido.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-medium">Cliente</h3>
                              <p className="text-muted-foreground">{order.customer}</p>
                            </div>
                            <div>
                              <h3 className="font-medium">Fecha</h3>
                              <p className="text-muted-foreground">
                                {new Date(order.date).toLocaleDateString("es-CL")}
                              </p>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium">Estado</h3>
                            <div className="mt-1">{getStatusBadge(order.status)}</div>
                          </div>
                          <div>
                            <h3 className="font-medium">Productos</h3>
                            <div className="mt-2 rounded-md border">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Producto</TableHead>
                                    <TableHead>Cantidad</TableHead>
                                    <TableHead>Precio</TableHead>
                                    <TableHead>Subtotal</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {order.items.map((item, i) => (
                                    <TableRow key={i}>
                                      <TableCell>{item.name}</TableCell>
                                      <TableCell>{item.quantity}</TableCell>
                                      <TableCell>${item.price.toLocaleString("es-CL")}</TableCell>
                                      <TableCell>${(item.price * item.quantity).toLocaleString("es-CL")}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <h3 className="font-medium">Total</h3>
                            <p className="font-bold text-primary">${order.total.toLocaleString("es-CL")}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No se encontraron pedidos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
