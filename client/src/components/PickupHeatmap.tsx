import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PickupLocation {
  id: number;
  lat: number;
  lng: number;
  count: number;
  address: string;
}

interface PickupHeatmapProps {
  locations: PickupLocation[];
}

export default function PickupHeatmap({ locations }: PickupHeatmapProps) {
  const maxCount = Math.max(...locations.map(l => l.count), 1);

  const getHeatColor = (count: number) => {
    const intensity = count / maxCount;
    if (intensity > 0.7) return 'bg-red-500/80';
    if (intensity > 0.4) return 'bg-orange-500/80';
    if (intensity > 0.2) return 'bg-yellow-500/80';
    return 'bg-green-500/80';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mapa de Calor - Solicitudes de Retiro</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[500px] bg-muted rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          
          <div className="absolute top-4 right-4 bg-card p-4 rounded-lg shadow-lg border border-border">
            <h4 className="text-sm font-semibold mb-2">Densidad</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-500/80" />
                <span className="text-xs text-muted-foreground">Alta</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-orange-500/80" />
                <span className="text-xs text-muted-foreground">Media-Alta</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-yellow-500/80" />
                <span className="text-xs text-muted-foreground">Media</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-500/80" />
                <span className="text-xs text-muted-foreground">Baja</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 space-y-2 max-h-[350px] overflow-y-auto">
            {locations.map((location) => (
              <Card 
                key={location.id} 
                className="hover-elevate active-elevate-2 cursor-pointer" 
                data-testid={`card-pickup-location-${location.id}`}
              >
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{location.address}</p>
                    <p className="text-xs text-muted-foreground">
                      {location.lat}, {location.lng}
                    </p>
                  </div>
                  <Badge className={`${getHeatColor(location.count)} text-white`}>
                    {location.count} solicitudes
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
