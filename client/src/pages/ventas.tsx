import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

//todo: remove mock functionality
const mockMedicamentos = [
  { id: 1, nombre: "Ibuprofeno 400mg", precio: 5.50, stock: 150 },
  { id: 2, nombre: "Paracetamol 500mg", precio: 3.20, stock: 200 },
  { id: 3, nombre: "Amoxicilina 500mg", precio: 12.80, stock: 45 },
  { id: 4, nombre: "Omeprazol 20mg", precio: 8.90, stock: 80 },
];

const mockClientes = [
  { id: 1, nombre: "Juan Pérez" },
  { id: 2, nombre: "María González" },
  { id: 3, nombre: "Carlos Rodríguez" },
];

const mockEmpleados = [
  { id: 1, nombre: "Laura Silva" },
  { id: 2, nombre: "Pedro Gómez" },
];

interface CartItem {
  medicamentoId: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

export default function VentasPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedMedicamento, setSelectedMedicamento] = useState("");
  const [cantidad, setCantidad] = useState("1");
  const [selectedCliente, setSelectedCliente] = useState("");
  const [selectedEmpleado, setSelectedEmpleado] = useState("");

  const addToCart = () => {
    if (!selectedMedicamento) return;

    const med = mockMedicamentos.find(m => m.id.toString() === selectedMedicamento);
    if (!med) return;

    const existingItem = cart.find(item => item.medicamentoId === med.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.medicamentoId === med.id
          ? { ...item, cantidad: item.cantidad + parseInt(cantidad) }
          : item
      ));
    } else {
      setCart([...cart, {
        medicamentoId: med.id,
        nombre: med.nombre,
        precio: med.precio,
        cantidad: parseInt(cantidad),
      }]);
    }

    setSelectedMedicamento("");
    setCantidad("1");
  };

  const removeFromCart = (medicamentoId: number) => {
    setCart(cart.filter(item => item.medicamentoId !== medicamentoId));
  };

  const updateQuantity = (medicamentoId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item =>
      item.medicamentoId === medicamentoId
        ? { ...item, cantidad: newQuantity }
        : item
    ));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const total = subtotal;

  const handleFinalizarVenta = () => {
    console.log("Venta finalizada:", {
      cliente: selectedCliente,
      empleado: selectedEmpleado,
      items: cart,
      total,
    });
    setCart([]);
    setSelectedCliente("");
    setSelectedEmpleado("");
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Punto de Venta</h1>
        <p className="text-sm text-muted-foreground">
          Registra ventas de medicamentos
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Agregar Medicamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="medicamento">Medicamento</Label>
                  <Select value={selectedMedicamento} onValueChange={setSelectedMedicamento}>
                    <SelectTrigger id="medicamento" data-testid="select-medicamento">
                      <SelectValue placeholder="Seleccionar medicamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockMedicamentos.map((med) => (
                        <SelectItem key={med.id} value={med.id.toString()}>
                          {med.nombre} - ${med.precio} (Stock: {med.stock})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cantidad">Cantidad</Label>
                  <div className="flex gap-2">
                    <Input
                      id="cantidad"
                      type="number"
                      min="1"
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                      data-testid="input-cantidad"
                    />
                    <Button onClick={addToCart} data-testid="button-agregar">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Carrito de Compra
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  <ShoppingCart className="mx-auto h-12 w-12 mb-4 opacity-20" />
                  <p>No hay productos en el carrito</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.medicamentoId} className="flex items-center gap-4 border-b border-border pb-4 last:border-0 last:pb-0" data-testid={`cart-item-${item.medicamentoId}`}>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.nombre}</p>
                        <p className="text-sm text-muted-foreground">${item.precio} c/u</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.medicamentoId, item.cantidad - 1)}
                          data-testid={`button-decrease-${item.medicamentoId}`}
                        >
                          -
                        </Button>
                        <span className="w-12 text-center font-mono">{item.cantidad}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.medicamentoId, item.cantidad + 1)}
                          data-testid={`button-increase-${item.medicamentoId}`}
                        >
                          +
                        </Button>
                      </div>
                      <div className="w-24 text-right font-mono font-medium">
                        ${(item.precio * item.cantidad).toFixed(2)}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.medicamentoId)}
                        data-testid={`button-remove-${item.medicamentoId}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Información de Venta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cliente">Cliente (Opcional)</Label>
                <Select value={selectedCliente} onValueChange={setSelectedCliente}>
                  <SelectTrigger id="cliente" data-testid="select-cliente">
                    <SelectValue placeholder="Seleccionar cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClientes.map((cliente) => (
                      <SelectItem key={cliente.id} value={cliente.id.toString()}>
                        {cliente.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="empleado">Vendedor</Label>
                <Select value={selectedEmpleado} onValueChange={setSelectedEmpleado}>
                  <SelectTrigger id="empleado" data-testid="select-empleado">
                    <SelectValue placeholder="Seleccionar vendedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockEmpleados.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id.toString()}>
                        {emp.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Resumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-mono font-medium">${subtotal.toFixed(2)}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="font-mono" data-testid="text-total">${total.toFixed(2)}</span>
              </div>
              <Button
                className="w-full"
                size="lg"
                disabled={cart.length === 0 || !selectedEmpleado}
                onClick={handleFinalizarVenta}
                data-testid="button-finalizar"
              >
                Finalizar Venta
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
