import MetricCard from "@/components/MetricCard";
import DashboardCharts from "@/components/DashboardCharts";
import { Users, Leaf, MapPin, Calendar, Store } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold font-serif text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Vista general de la gestión de reciclaje municipal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard 
          title="Usuarios Activos"
          value="1,234"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard 
          title="Kg Reciclados"
          value="5,678"
          icon={Leaf}
          subtitle="Este mes"
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard 
          title="Contenedores"
          value="45"
          icon={MapPin}
        />
        <MetricCard 
          title="Eventos"
          value="12"
          icon={Calendar}
          subtitle="Próximos"
          trend={{ value: 3, isPositive: true }}
        />
        <MetricCard 
          title="Comercios Adheridos"
          value="28"
          icon={Store}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <DashboardCharts />
    </div>
  );
}
