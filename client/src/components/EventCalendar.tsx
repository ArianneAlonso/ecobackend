import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const mockEvents = [
  {
    id: 1,
    title: "Taller de Compostaje",
    date: new Date(2025, 10, 5),
    time: "10:00",
    location: "Centro Comunitario",
    category: "Taller",
  },
  {
    id: 2,
    title: "Recolección Especial",
    date: new Date(2025, 10, 8),
    time: "08:00",
    location: "Plaza Central",
    category: "Recolección",
  },
  {
    id: 3,
    title: "Ecopunto Móvil",
    date: new Date(2025, 10, 12),
    time: "09:00",
    location: "Barrio Norte",
    category: "Ecopunto",
  },
  {
    id: 4,
    title: "Charla Ambiental",
    date: new Date(2025, 10, 15),
    time: "18:00",
    location: "Biblioteca Municipal",
    category: "Charla",
  },
];

const categoryColors: Record<string, string> = {
  "Taller": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  "Recolección": "bg-green-500/10 text-green-700 dark:text-green-400",
  "Ecopunto": "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  "Charla": "bg-purple-500/10 text-purple-700 dark:text-purple-400",
};

export default function EventCalendar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximos Eventos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockEvents.map((event) => (
            <Card key={event.id} className="hover-elevate active-elevate-2 cursor-pointer" data-testid={`card-event-${event.id}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{event.title}</h4>
                  <Badge className={categoryColors[event.category] || ""}>
                    {event.category}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{format(event.date, "PPP", { locale: es })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{event.time} hs</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
