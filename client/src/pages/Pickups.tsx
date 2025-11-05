import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import PickupHeatmap from "@/components/PickupHeatmap";
import MetricCard from "@/components/MetricCard";
import { Package, TrendingUp, MapPin, Calendar } from "lucide-react";

const mockPickupLocations = [
  { id: 1, lat: -34.6037, lng: -58.3816, count: 15, address: "Av. Corrientes 1234" },
  { id: 2, lat: -34.5937, lng: -58.3716, count: 8, address: "Calle Florida 567" },
  { id: 3, lat: -34.6137, lng: -58.3916, count: 22, address: "Av. Santa Fe 890" },
  { id: 4, lat: -34.6237, lng: -58.4016, count: 5, address: "Calle Lavalle 234" },
  { id: 5, lat: -34.5837, lng: -58.3616, count: 12, address: "Av. Callao 456" },
];

const wasteTypes = ["Todos", "Plástico", "Papel", "Vidrio", "Metal", "Orgánico"];
const days = ["Todos", "Lunes", "Martes", "Miércoles", "Jueves"];
const shifts = ["Todos", "Mañana", "Tarde"];

interface WasteTypeStats {
  type: string;
  count: number;
  percentage: number;
}

export default function Pickups() {
  const [selectedWasteType, setSelectedWasteType] = useState("Todos");
  const [selectedDay, setSelectedDay] = useState("Todos");
  const [selectedShift, setSelectedShift] = useState("Todos");

  const wasteTypeStats: WasteTypeStats[] = [
    { type: "Plástico", count: 45, percentage: 35 },
    { type: "Papel", count: 38, percentage: 29 },
    { type: "Vidrio", count: 25, percentage: 19 },
    { type: "Metal", count: 15, percentage: 12 },
    { type: "Orgánico", count: 7, percentage: 5 },
  ];

  const materialColors: Record<string, string> = {
    "Plástico": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    "Papel": "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    "Vidrio": "bg-green-500/10 text-green-700 dark:text-green-400",
    "Metal": "bg-slate-500/10 text-slate-700 dark:text-slate-400",
    "Orgánico": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold font-serif text-foreground">Retiros de Residuos</h1>
        <p className="text-muted-foreground mt-2">Gestión de solicitudes de retiro particular</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Retiros Este Mes"
          value="234"
          icon={Package}
          trend={{ value: 18, isPositive: true }}
        />
        <MetricCard 
          title="Kg Recolectados"
          value="1,567"
          icon={TrendingUp}
          subtitle="Este mes"
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard 
          title="Zonas Activas"
          value="12"
          icon={MapPin}
        />
        <MetricCard 
          title="Próximos Retiros"
          value="45"
          icon={Calendar}
          subtitle="Esta semana"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros de Búsqueda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="waste-type">Tipo de Residuo</Label>
              <Select value={selectedWasteType} onValueChange={setSelectedWasteType}>
                <SelectTrigger id="waste-type" data-testid="select-waste-type">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {wasteTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="day">Día</Label>
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger id="day" data-testid="select-day">
                  <SelectValue placeholder="Seleccionar día" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day} value={day}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shift">Turno</Label>
              <Select value={selectedShift} onValueChange={setSelectedShift}>
                <SelectTrigger id="shift" data-testid="select-shift">
                  <SelectValue placeholder="Seleccionar turno" />
                </SelectTrigger>
                <SelectContent>
                  {shifts.map((shift) => (
                    <SelectItem key={shift} value={shift}>{shift}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Filtros activos: 
              <span className="font-semibold text-foreground ml-1">
                {selectedWasteType}
              </span>
              {selectedDay !== "Todos" && (
                <span className="font-semibold text-foreground"> • {selectedDay}</span>
              )}
              {selectedShift !== "Todos" && (
                <span className="font-semibold text-foreground"> • {selectedShift}</span>
              )}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PickupHeatmap locations={mockPickupLocations} />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribución por Material</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {wasteTypeStats.map((stat) => (
                <div key={stat.type} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Badge className={materialColors[stat.type] || ""}>
                      {stat.type}
                    </Badge>
                    <span className="text-sm font-semibold">{stat.count} retiros</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all" 
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-right">{stat.percentage}%</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horarios Más Solicitados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-semibold">Lunes - Mañana</p>
                  <p className="text-xs text-muted-foreground">08:00 - 12:00</p>
                </div>
                <Badge>42 retiros</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-semibold">Miércoles - Tarde</p>
                  <p className="text-xs text-muted-foreground">14:00 - 18:00</p>
                </div>
                <Badge>38 retiros</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-semibold">Martes - Mañana</p>
                  <p className="text-xs text-muted-foreground">08:00 - 12:00</p>
                </div>
                <Badge>35 retiros</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-semibold">Jueves - Tarde</p>
                  <p className="text-xs text-muted-foreground">14:00 - 18:00</p>
                </div>
                <Badge>31 retiros</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
