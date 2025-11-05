import MetricCard from '../MetricCard'
import { Users, Leaf, MapPin, Calendar } from "lucide-react";

export default function MetricCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-background">
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
    </div>
  )
}
