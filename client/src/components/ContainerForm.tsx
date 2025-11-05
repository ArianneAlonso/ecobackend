import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function ContainerForm() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: "",
    schedule: "",
    capacity: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Container form submitted:', formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agregar Contenedor</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Contenedor</Label>
            <Input
              id="name"
              placeholder="Ej: Contenedor Centro"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              data-testid="input-container-name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Material</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger id="type" data-testid="select-container-type">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plastico">Plástico</SelectItem>
                <SelectItem value="papel">Papel</SelectItem>
                <SelectItem value="vidrio">Vidrio</SelectItem>
                <SelectItem value="metal">Metal</SelectItem>
                <SelectItem value="organico">Orgánico</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Ubicación</Label>
            <Input
              id="location"
              placeholder="Dirección del contenedor"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              data-testid="input-container-location"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="schedule">Horario de Recolección</Label>
              <Input
                id="schedule"
                placeholder="Ej: Lunes y Jueves"
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                data-testid="input-container-schedule"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacidad (kg)</Label>
              <Input
                id="capacity"
                type="number"
                placeholder="100"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                data-testid="input-container-capacity"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" data-testid="button-submit-container">
              Guardar Contenedor
            </Button>
            <Button type="button" variant="outline" onClick={() => console.log('Cancel clicked')} data-testid="button-cancel">
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
