import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const monthlyData = [
  { month: "Ene", reciclados: 4500, usuarios: 980 },
  { month: "Feb", reciclados: 5200, usuarios: 1050 },
  { month: "Mar", reciclados: 4800, usuarios: 1100 },
  { month: "Abr", reciclados: 5600, usuarios: 1180 },
  { month: "May", reciclados: 6100, usuarios: 1250 },
  { month: "Jun", reciclados: 5900, usuarios: 1234 },
];

const materialData = [
  { material: "Plástico", cantidad: 2400 },
  { material: "Papel", cantidad: 1800 },
  { material: "Vidrio", cantidad: 1200 },
  { material: "Metal", cantidad: 800 },
  { material: "Orgánico", cantidad: 600 },
];

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Participación Mensual</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="reciclados"
                stroke="hsl(var(--chart-1))"
                name="Kg Reciclados"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="usuarios"
                stroke="hsl(var(--chart-2))"
                name="Usuarios Activos"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Materiales Recolectados</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={materialData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="material" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Bar dataKey="cantidad" fill="hsl(var(--chart-1))" name="Kg" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
