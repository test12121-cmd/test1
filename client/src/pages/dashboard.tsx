import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Pill, TrendingUp, AlertTriangle } from "lucide-react";

//todo: remove mock functionality
const stats = [
  {
    title: "Total Medicamentos",
    value: "487",
    icon: Pill,
    description: "En inventario",
  },
  {
    title: "Ventas Hoy",
    value: "$12,450",
    icon: TrendingUp,
    description: "+18% vs ayer",
  },
  {
    title: "Stock Bajo",
    value: "23",
    icon: AlertTriangle,
    description: "Requieren reposición",
  },
  {
    title: "Clientes Activos",
    value: "1,254",
    icon: Users,
    description: "Clientes registrados",
  },
];

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Resumen general de la farmacia
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} data-testid={`card-${stat.title.toLowerCase().replace(/ /g, '-')}`}>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Venta #{1000 + i}</p>
                    <p className="text-xs text-muted-foreground">Cliente: María González</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">$234.50</p>
                    <p className="text-xs text-muted-foreground">Hace {i}h</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Medicamentos Críticos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Ibuprofeno 400mg', 'Paracetamol 500mg', 'Amoxicilina 500mg', 'Omeprazol 20mg'].map((med, i) => (
                <div key={i} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{med}</p>
                    <p className="text-xs text-muted-foreground">Stock: {5 - i} unidades</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-1">
                    <AlertTriangle className="h-3 w-3 text-destructive" />
                    <span className="text-xs font-medium text-destructive">Bajo</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { ShoppingCart } from "lucide-react";
