import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Pencil, Trash2, AlertTriangle } from "lucide-react";
import type { Medicamento } from "@shared/schema";

//todo: remove mock functionality
const mockMedicamentos: Medicamento[] = [
  { id: 1, nombre: "Ibuprofeno 400mg", descripcion: "Antiinflamatorio", precio: "5.50", stock: 150, idProveedor: 1, fechaVencimiento: "2026-12-31" },
  { id: 2, nombre: "Paracetamol 500mg", descripcion: "Analgésico", precio: "3.20", stock: 8, idProveedor: 1, fechaVencimiento: "2025-06-30" },
  { id: 3, nombre: "Amoxicilina 500mg", descripcion: "Antibiótico", precio: "12.80", stock: 45, idProveedor: 2, fechaVencimiento: "2026-03-15" },
  { id: 4, nombre: "Omeprazol 20mg", descripcion: "Protector gástrico", precio: "8.90", stock: 3, idProveedor: 2, fechaVencimiento: "2025-12-20" },
];

export default function MedicamentosPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [medicamentos] = useState<Medicamento[]>(mockMedicamentos);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    fechaVencimiento: "",
  });

  const filteredMedicamentos = medicamentos.filter((med) =>
    med.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Agotado</Badge>;
    } else if (stock < 10) {
      return <Badge variant="outline" className="border-yellow-500 text-yellow-600 dark:text-yellow-400">Stock Bajo</Badge>;
    }
    return <Badge variant="outline" className="border-green-500 text-green-600 dark:text-green-400">Normal</Badge>;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Medicamento creado:", formData);
    setOpen(false);
    setFormData({ nombre: "", descripcion: "", precio: "", stock: "", fechaVencimiento: "" });
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Medicamentos</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona el inventario de medicamentos
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-nuevo-medicamento">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Medicamento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nuevo Medicamento</DialogTitle>
              <DialogDescription>
                Registra un nuevo medicamento en el inventario
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    data-testid="input-nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej: Ibuprofeno 400mg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    data-testid="input-descripcion"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    placeholder="Descripción del medicamento"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="precio">Precio</Label>
                    <Input
                      id="precio"
                      type="number"
                      step="0.01"
                      data-testid="input-precio"
                      value={formData.precio}
                      onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      data-testid="input-stock"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaVencimiento">Fecha de Vencimiento</Label>
                  <Input
                    id="fechaVencimiento"
                    type="date"
                    data-testid="input-fecha"
                    value={formData.fechaVencimiento}
                    onChange={(e) => setFormData({ ...formData, fechaVencimiento: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)} data-testid="button-cancelar">
                  Cancelar
                </Button>
                <Button type="submit" data-testid="button-guardar">
                  Guardar Medicamento
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Inventario de Medicamentos</CardTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar medicamento..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMedicamentos.map((med) => (
                <TableRow key={med.id} data-testid={`row-medicamento-${med.id}`}>
                  <TableCell className="font-medium">{med.nombre}</TableCell>
                  <TableCell className="text-muted-foreground">{med.descripcion}</TableCell>
                  <TableCell className="font-mono">${med.precio}</TableCell>
                  <TableCell className="font-mono">{med.stock}</TableCell>
                  <TableCell>{getStockBadge(med.stock)}</TableCell>
                  <TableCell className="font-mono text-sm">{med.fechaVencimiento}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" data-testid={`button-edit-${med.id}`}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" data-testid={`button-delete-${med.id}`}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
