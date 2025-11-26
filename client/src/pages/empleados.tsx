import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import type { Empleado } from "@shared/schema";

//todo: remove mock functionality
const mockEmpleados: Empleado[] = [
  { id: 1, nombre: "Laura", apellido: "Silva", dni: "20123456", telefono: "555-0201", puesto: "Farmacéutica", fechaContratacion: "2020-01-15" },
  { id: 2, nombre: "Pedro", apellido: "Gómez", dni: "20234567", telefono: "555-0202", puesto: "Auxiliar", fechaContratacion: "2021-06-20" },
  { id: 3, nombre: "Sofia", apellido: "Torres", dni: "20345678", telefono: "555-0203", puesto: "Cajera", fechaContratacion: "2022-03-10" },
  { id: 4, nombre: "Diego", apellido: "Ramírez", dni: "20456789", telefono: "555-0204", puesto: "Auxiliar", fechaContratacion: "2023-09-05" },
];

export default function EmpleadosPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [empleados] = useState<Empleado[]>(mockEmpleados);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    puesto: "",
    fechaContratacion: "",
  });

  const filteredEmpleados = empleados.filter((emp) =>
    `${emp.nombre} ${emp.apellido} ${emp.puesto}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Empleado creado:", formData);
    setOpen(false);
    setFormData({ nombre: "", apellido: "", dni: "", telefono: "", puesto: "", fechaContratacion: "" });
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Empleados</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona el personal de la farmacia
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-nuevo-empleado">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Empleado
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nuevo Empleado</DialogTitle>
              <DialogDescription>
                Registra un nuevo empleado en el sistema
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                      id="nombre"
                      data-testid="input-nombre"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="Ingrese nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input
                      id="apellido"
                      data-testid="input-apellido"
                      value={formData.apellido}
                      onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                      placeholder="Ingrese apellido"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dni">DNI</Label>
                    <Input
                      id="dni"
                      data-testid="input-dni"
                      value={formData.dni}
                      onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                      placeholder="Ingrese DNI"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      data-testid="input-telefono"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      placeholder="Ingrese teléfono"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="puesto">Puesto</Label>
                  <Input
                    id="puesto"
                    data-testid="input-puesto"
                    value={formData.puesto}
                    onChange={(e) => setFormData({ ...formData, puesto: e.target.value })}
                    placeholder="Ej: Farmacéutico, Auxiliar, Cajero"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaContratacion">Fecha de Contratación</Label>
                  <Input
                    id="fechaContratacion"
                    type="date"
                    data-testid="input-fecha"
                    value={formData.fechaContratacion}
                    onChange={(e) => setFormData({ ...formData, fechaContratacion: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)} data-testid="button-cancelar">
                  Cancelar
                </Button>
                <Button type="submit" data-testid="button-guardar">
                  Guardar Empleado
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Lista de Empleados</CardTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar empleado..."
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
                <TableHead>DNI</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellido</TableHead>
                <TableHead>Puesto</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Fecha Contratación</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmpleados.map((emp) => (
                <TableRow key={emp.id} data-testid={`row-empleado-${emp.id}`}>
                  <TableCell className="font-mono text-sm">{emp.dni}</TableCell>
                  <TableCell>{emp.nombre}</TableCell>
                  <TableCell>{emp.apellido}</TableCell>
                  <TableCell>{emp.puesto}</TableCell>
                  <TableCell>{emp.telefono}</TableCell>
                  <TableCell className="font-mono text-sm">{emp.fechaContratacion}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" data-testid={`button-edit-${emp.id}`}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" data-testid={`button-delete-${emp.id}`}>
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
