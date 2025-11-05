import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ContainerMap from "@/components/ContainerMap";
import DataTable from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ContainerForm from "@/components/ContainerForm";

const mockContainers = [
  { id: 1, name: "Contenedor Centro", type: "Plástico", location: "Av. Principal 123", status: "Activo", capacity: "100 kg" },
  { id: 2, name: "Contenedor Norte", type: "Papel", location: "Calle Norte 456", status: "Activo", capacity: "150 kg" },
  { id: 3, name: "Contenedor Sur", type: "Vidrio", location: "Av. Sur 789", status: "Mantenimiento", capacity: "120 kg" },
  { id: 4, name: "Contenedor Este", type: "Metal", location: "Calle Este 321", status: "Activo", capacity: "80 kg" },
];

const materialColors: Record<string, string> = {
  "Plástico": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  "Papel": "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  "Vidrio": "bg-green-500/10 text-green-700 dark:text-green-400",
  "Metal": "bg-slate-500/10 text-slate-700 dark:text-slate-400",
};

const statusColors: Record<string, string> = {
  "Activo": "bg-green-500/10 text-green-700 dark:text-green-400",
  "Mantenimiento": "bg-amber-500/10 text-amber-700 dark:text-amber-400",
};

export default function Containers() {
  const [open, setOpen] = useState(false);

  const columns = [
    { key: 'name', label: 'Nombre' },
    { 
      key: 'type', 
      label: 'Tipo',
      render: (value: string) => (
        <Badge className={materialColors[value] || ""}>{value}</Badge>
      )
    },
    { key: 'location', label: 'Ubicación' },
    { key: 'capacity', label: 'Capacidad' },
    { 
      key: 'status', 
      label: 'Estado',
      render: (value: string) => (
        <Badge className={statusColors[value] || ""}>{value}</Badge>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold font-serif text-foreground">Contenedores</h1>
          <p className="text-muted-foreground mt-2">Gestión de contenedores de reciclaje</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-container">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Contenedor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nuevo Contenedor</DialogTitle>
            </DialogHeader>
            <ContainerForm />
          </DialogContent>
        </Dialog>
      </div>

      <ContainerMap />

      <DataTable 
        columns={columns}
        data={mockContainers}
        onEdit={(item) => console.log('Edit container:', item)}
        onDelete={(item) => console.log('Delete container:', item)}
      />
    </div>
  );
}
