import DataTable from '../DataTable'
import { Badge } from "@/components/ui/badge";

const mockData = [
  { id: 1, name: "Contenedor Centro", type: "Plástico", location: "Av. Principal 123", status: "Activo" },
  { id: 2, name: "Contenedor Norte", type: "Papel", location: "Calle Norte 456", status: "Activo" },
  { id: 3, name: "Contenedor Sur", type: "Vidrio", location: "Av. Sur 789", status: "Mantenimiento" },
];

const materialColors: Record<string, string> = {
  "Plástico": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  "Papel": "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  "Vidrio": "bg-green-500/10 text-green-700 dark:text-green-400",
};

const statusColors: Record<string, string> = {
  "Activo": "bg-green-500/10 text-green-700 dark:text-green-400",
  "Mantenimiento": "bg-amber-500/10 text-amber-700 dark:text-amber-400",
};

export default function DataTableExample() {
  const columns = [
    { key: 'name', label: 'Nombre' },
    { 
      key: 'type', 
      label: 'Tipo',
      render: (value: string) => (
        <Badge className={materialColors[value] || ""}>{value}</Badge>
      )
    },
    { key: 'location', label: 'Ubicación' },
    { 
      key: 'status', 
      label: 'Estado',
      render: (value: string) => (
        <Badge className={statusColors[value] || ""}>{value}</Badge>
      )
    },
  ];

  return (
    <div className="p-6 bg-background">
      <DataTable 
        columns={columns}
        data={mockData}
        onEdit={(item) => console.log('Edit:', item)}
        onDelete={(item) => console.log('Delete:', item)}
      />
    </div>
  )
}
