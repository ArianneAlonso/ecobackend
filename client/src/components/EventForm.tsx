import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function EventForm() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Event form submitted:', formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Evento Ambiental</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título del Evento</Label>
            <Input
              id="title"
              placeholder="Ej: Taller de Compostaje"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              data-testid="input-event-title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger id="category" data-testid="select-event-category">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="taller">Taller</SelectItem>
                <SelectItem value="recoleccion">Recolección</SelectItem>
                <SelectItem value="ecopunto">Ecopunto</SelectItem>
                <SelectItem value="charla">Charla</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Fecha</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                data-testid="input-event-date"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Hora</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                data-testid="input-event-time"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Ubicación</Label>
            <Input
              id="location"
              placeholder="Lugar del evento"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              data-testid="input-event-location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe el evento..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              data-testid="textarea-event-description"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" data-testid="button-submit-event">
              Crear Evento
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
