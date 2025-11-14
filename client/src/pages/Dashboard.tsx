import { useState, useEffect } from 'react';
import MetricCard from "@/components/MetricCard";
import DashboardCharts from "@/components/DashboardCharts";
import { Users, Leaf, MapPin, Calendar, Store } from "lucide-react";

// 💡 Interfaz para tipar los datos que vienen del backend
interface MetricData {
    usuariosActivos: number;
    kgRecicladosTotal: number;
    kgRecicladosEsteMes: number;
    totalContenedores: number;
    // Debes añadir estas propiedades si las implementas en el backend:
    totalEventos: number; 
    comerciosAdheridos: number;
}

const initialMetrics: MetricData = {
    usuariosActivos: 0,
    kgRecicladosTotal: 0,
    kgRecicladosEsteMes: 0,
    totalContenedores: 0,
    totalEventos: 0, 
    comerciosAdheridos: 0,
};

export default function Dashboard() {
    const [metrics, setMetrics] = useState<MetricData>(initialMetrics);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // 💡 Nota: Asegúrate de que esta URL sea correcta.
                // Si estás usando cookies, la petición DEBE ser al mismo dominio (o incluir credenciales)
                const response = await fetch('http://localhost:3000/dashboard'); 
                
                if (!response.ok) {
                    // Si el servidor responde con 401, 500, etc.
                    throw new Error(`Error ${response.status}: Fallo al obtener datos`);
                }

                const data = await response.json();
                
                // 💡 Adaptar los datos del backend a tu estructura de MetricData
                setMetrics({
                    usuariosActivos: data.metricas.usuariosActivos,
                    kgRecicladosTotal: data.metricas.kgRecicladosTotal,
                    // Usamos el valor total para el card principal (puedes cambiarlo a EsteMes si prefieres)
                    kgRecicladosEsteMes: data.metricas.kgRecicladosEsteMes, 
                    totalContenedores: data.metricas.totalContenedores,
                    
                    // Asegúrate de que tu backend envíe estos campos (ejemplo de valores):
                    totalEventos: 12,
                    comerciosAdheridos: 28,
                });

            } catch (err) {
                console.error("Error al cargar el dashboard:", err);
                setError("No se pudieron cargar los datos del dashboard. Revisa la conexión al API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []); // El array vacío asegura que se ejecute solo una vez al montar

    if (isLoading) {
        return <div className="p-8 text-center text-lg">Cargando datos...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-500">{error}</div>;
    }
    
    // Función de ayuda para formatear números
    const formatNumber = (num: number) => num.toLocaleString('es-ES');

    return (
        <div className="space-y-6">
            {/* ... Títulos ... */}
            <div>
                <h1 className="text-4xl font-bold font-serif text-foreground">Dashboard</h1>
                <p className="text-muted-foreground mt-2">Vista general de la gestión de reciclaje municipal</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <MetricCard 
                    title="Usuarios Activos"
                    value={formatNumber(metrics.usuariosActivos)} // <-- Conectado
                    icon={Users}
                    // Trend es estático por ahora, deberías calcularlo
                    trend={{ value: 12, isPositive: true }} 
                />
                <MetricCard 
                    title="Kg Reciclados"
                    value={formatNumber(metrics.kgRecicladosEsteMes)} // <-- Conectado (Este Mes)
                    icon={Leaf}
                    subtitle="Este mes"
                    trend={{ value: 8, isPositive: true }}
                />
                <MetricCard 
                    title="Contenedores"
                    value={formatNumber(metrics.totalContenedores)} // <-- Conectado
                    icon={MapPin}
                />
                <MetricCard 
                    title="Eventos"
                    value={formatNumber(metrics.totalEventos)} // <-- Estático/Ejemplo
                    icon={Calendar}
                    subtitle="Próximos"
                    trend={{ value: 3, isPositive: true }}
                />
                <MetricCard 
                    title="Comercios Adheridos"
                    value={formatNumber(metrics.comerciosAdheridos)} // <-- Estático/Ejemplo
                    icon={Store}
                    trend={{ value: 5, isPositive: true }}
                />
            </div>

            <DashboardCharts />
        </div>
    );
}