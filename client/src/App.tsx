import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Dashboard from "@/pages/dashboard";
import ClientesPage from "@/pages/clientes";
import MedicamentosPage from "@/pages/medicamentos";
import EmpleadosPage from "@/pages/empleados";
import ProveedoresPage from "@/pages/proveedores";
import VentasPage from "@/pages/ventas";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/clientes" component={ClientesPage} />
      <Route path="/medicamentos" component={MedicamentosPage} />
      <Route path="/empleados" component={EmpleadosPage} />
      <Route path="/proveedores" component={ProveedoresPage} />
      <Route path="/ventas" component={VentasPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-1 flex-col">
              <header className="flex h-16 items-center gap-4 border-b border-border px-6">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <div className="flex-1">
                  <h2 className="text-sm font-medium text-muted-foreground">
                    Sistema de Gestión Farmacéutica
                  </h2>
                </div>
              </header>
              <main className="flex-1 overflow-auto">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
