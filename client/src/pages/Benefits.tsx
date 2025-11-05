import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BenefitCard from "@/components/BenefitCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BenefitForm from "@/components/BenefitForm";

const mockBenefits = [
  {
    title: "20% de descuento",
    description: "Obtén un 20% de descuento en todos nuestros productos orgánicos. Válido para compras superiores a $500.",
    points: 100,
    validUntil: "31/12/2025",
    commerce: "Café Verde",
  },
  {
    title: "2x1 en productos seleccionados",
    description: "Llevá dos productos y pagá uno. Aplica en toda nuestra línea de productos ecológicos.",
    points: 150,
    validUntil: "15/11/2025",
    commerce: "EcoTienda",
  },
  {
    title: "Envío gratis",
    description: "Envío sin cargo en tu próxima compra online. Sin mínimo de compra.",
    points: 50,
    validUntil: "30/11/2025",
    commerce: "GreenMarket",
  },
  {
    title: "Descuento 15% en ropa sostenible",
    description: "15% de descuento en toda nuestra colección de ropa fabricada con materiales reciclados.",
    points: 120,
    validUntil: "20/12/2025",
    commerce: "EcoFashion",
  },
  {
    title: "Combo familiar",
    description: "Combo de productos orgánicos para toda la familia a precio especial.",
    points: 200,
    validUntil: "31/12/2025",
    commerce: "Almacén Natural",
  },
  {
    title: "Consulta nutricional gratis",
    description: "Una sesión de consulta nutricional gratuita con nuestros especialistas.",
    points: 180,
    validUntil: "31/01/2026",
    commerce: "Centro de Salud Verde",
  },
];

export default function Benefits() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold font-serif text-foreground">Beneficios y Promociones</h1>
          <p className="text-muted-foreground mt-2">Gestión de beneficios para comercios adheridos</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-benefit">
              <Plus className="h-4 w-4 mr-2" />
              Crear Beneficio
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nuevo Beneficio</DialogTitle>
            </DialogHeader>
            <BenefitForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBenefits.map((benefit, index) => (
          <BenefitCard key={index} {...benefit} />
        ))}
      </div>
    </div>
  );
}
