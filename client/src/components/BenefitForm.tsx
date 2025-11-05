import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function BenefitForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    points: "",
    validUntil: "",
    commerce: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Benefit form submitted:', formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Beneficio</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="commerce">Nombre del Comercio</Label>
            <Input
              id="commerce"
              placeholder="Ej: Café Verde"
              value={formData.commerce}
              onChange={(e) => setFormData({ ...formData, commerce: e.target.value })}
              data-testid="input-benefit-commerce"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Título del Beneficio</Label>
            <Input
              id="title"
              placeholder="Ej: 20% de descuento"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              data-testid="input-benefit-title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe el beneficio..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              data-testid="textarea-benefit-description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="points">Puntos Requeridos</Label>
              <Input
                id="points"
                type="number"
                placeholder="100"
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                data-testid="input-benefit-points"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="validUntil">Válido Hasta</Label>
              <Input
                id="validUntil"
                type="date"
                value={formData.validUntil}
                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                data-testid="input-benefit-valid-until"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" data-testid="button-submit-benefit">
              Crear Beneficio
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
