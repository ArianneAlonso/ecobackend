import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, TrendingUp, Users, Gift, Calendar } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import QRGenerator from "@/components/QRGenerator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockActiveEvents = [
  { id: 1, title: "Taller de Compostaje", date: "05/11/2025", location: "Centro Comunitario", points: 50 },
  { id: 2, title: "Recolección Especial", date: "08/11/2025", location: "Plaza Central", points: 30 },
  { id: 3, title: "Ecopunto Móvil", date: "12/11/2025", location: "Barrio Norte", points: 40 },
];

export default function Points() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold font-serif text-foreground">Sistema de Puntos</h1>
        <p className="text-muted-foreground mt-2">Gestión de códigos QR para eventos y retiros</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Puntos"
          value="125,430"
          icon={Award}
          subtitle="Distribuidos"
        />
        <MetricCard 
          title="Canjes Realizados"
          value="892"
          icon={Gift}
          trend={{ value: 15, isPositive: true }}
        />
        <MetricCard 
          title="Usuarios Activos"
          value="1,234"
          icon={Users}
        />
        <MetricCard 
          title="Tasa de Conversión"
          value="72%"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Códigos QR Activos</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="events" data-testid="tab-events">
                <Calendar className="h-4 w-4 mr-2" />
                Eventos
              </TabsTrigger>
              <TabsTrigger value="pickups" data-testid="tab-pickups">
                <Award className="h-4 w-4 mr-2" />
                Retiros Particulares
              </TabsTrigger>
            </TabsList>

            <TabsContent value="events">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockActiveEvents.map((event) => (
                  <QRGenerator 
                    key={event.id}
                    value={`EVENT-${event.id}-${event.title.replace(/\s+/g, '-').toUpperCase()}`}
                    title={event.title}
                    description={`${event.date} - ${event.location}`}
                    points={event.points}
                  />
                ))}
              </div>
              {mockActiveEvents.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No hay eventos activos en este momento
                </div>
              )}
            </TabsContent>

            <TabsContent value="pickups">
              <div className="flex justify-center">
                <div className="max-w-md">
                  <QRGenerator 
                    value="PICKUP-GENERAL-2025"
                    title="Retiro Particular de Residuos"
                    description="Código QR para solicitudes de retiro particular"
                    points={20}
                  />
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Información del QR</h4>
                    <p className="text-sm text-muted-foreground">
                      Los usuarios pueden escanear este código al solicitar un retiro particular 
                      de residuos reciclables desde su domicilio.
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Puntos por retiro:</span>
                        <span className="font-semibold">20 pts</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Retiros este mes:</span>
                        <span className="font-semibold">234</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
