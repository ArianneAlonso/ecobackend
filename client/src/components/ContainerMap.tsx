import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";

const mockContainers = [
  { id: 1, name: "Contenedor Centro", lat: -34.6037, lng: -58.3816, type: "Plástico", schedule: "Lunes y Jueves" },
  { id: 2, name: "Contenedor Norte", lat: -34.5937, lng: -58.3716, type: "Papel", schedule: "Martes y Viernes" },
  { id: 3, name: "Contenedor Sur", lat: -34.6137, lng: -58.3916, type: "Vidrio", schedule: "Miércoles" },
];

const materialColors: Record<string, string> = {
  "Plástico": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  "Papel": "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  "Vidrio": "bg-green-500/10 text-green-700 dark:text-green-400",
  "Metal": "bg-slate-500/10 text-slate-700 dark:text-slate-400",
};

export default function ContainerMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mapa de Contenedores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[500px] bg-muted rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2">
              <MapPin className="h-12 w-12 text-primary mx-auto" />
              <p className="text-sm text-muted-foreground">Mapa interactivo de contenedores</p>
              <p className="text-xs text-muted-foreground">Integración con Leaflet</p>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 space-y-2">
            {mockContainers.map((container) => (
              <Card key={container.id} className="w-64 hover-elevate active-elevate-2 cursor-pointer" data-testid={`card-container-${container.id}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm">{container.name}</h4>
                    <Badge className={materialColors[container.type] || ""}>
                      {container.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{container.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>{container.lat}, {container.lng}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
