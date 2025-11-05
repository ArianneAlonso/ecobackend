import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import EventCalendar from "@/components/EventCalendar";
import DataTable from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EventForm from "@/components/EventForm";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const mockEvents = [
  { 
    id: 1, 
    title: "Taller de Compostaje", 
    category: "Taller", 
    date: new Date(2025, 10, 5), 
    location: "Centro Comunitario",
    attendees: 25
  },
  { 
    id: 2, 
    title: "Recolección Especial", 
    category: "Recolección", 
    date: new Date(2025, 10, 8), 
    location: "Plaza Central",
    attendees: 150
  },
  { 
    id: 3, 
    title: "Ecopunto Móvil", 
    category: "Ecopunto", 
    date: new Date(2025, 10, 12), 
    location: "Barrio Norte",
    attendees: 80
  },
  { 
    id: 4, 
    title: "Charla Ambiental", 
    category: "Charla", 
    date: new Date(2025, 10, 15), 
    location: "Biblioteca Municipal",
    attendees: 45
  },
];

const categoryColors: Record<string, string> = {
  "Taller": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  "Recolección": "bg-green-500/10 text-green-700 dark:text-green-400",
  "Ecopunto": "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  "Charla": "bg-purple-500/10 text-purple-700 dark:text-purple-400",
};

export default function Events() {
  const [open, setOpen] = useState(false);

  const columns = [
    { key: 'title', label: 'Evento' },
    { 
      key: 'category', 
      label: 'Categoría',
      render: (value: string) => (
        <Badge className={categoryColors[value] || ""}>{value}</Badge>
      )
    },
    { 
      key: 'date', 
      label: 'Fecha',
      render: (value: Date) => format(value, "PPP", { locale: es })
    },
    { key: 'location', label: 'Ubicación' },
    { 
      key: 'attendees', 
      label: 'Asistentes',
      render: (value: number) => `${value} personas`
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold font-serif text-foreground">Eventos Ambientales</h1>
          <p className="text-muted-foreground mt-2">Gestión de eventos y actividades ecológicas</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-event">
              <Plus className="h-4 w-4 mr-2" />
              Crear Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nuevo Evento</DialogTitle>
            </DialogHeader>
            <EventForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DataTable 
            columns={columns}
            data={mockEvents}
            onEdit={(item) => console.log('Edit event:', item)}
            onDelete={(item) => console.log('Delete event:', item)}
          />
        </div>
        <div>
          <EventCalendar />
        </div>
      </div>
    </div>
  );
}
