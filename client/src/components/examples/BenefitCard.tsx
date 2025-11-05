import BenefitCard from '../BenefitCard'

export default function BenefitCardExample() {
  return (
    <div className="p-6 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BenefitCard 
          title="20% de descuento"
          description="Obtén un 20% de descuento en todos nuestros productos orgánicos. Válido para compras superiores a $500."
          points={100}
          validUntil="31/12/2025"
          commerce="Café Verde"
        />
        <BenefitCard 
          title="2x1 en productos seleccionados"
          description="Llevá dos productos y pagá uno. Aplica en toda nuestra línea de productos ecológicos."
          points={150}
          validUntil="15/11/2025"
          commerce="EcoTienda"
        />
        <BenefitCard 
          title="Envío gratis"
          description="Envío sin cargo en tu próxima compra online. Sin mínimo de compra."
          points={50}
          validUntil="30/11/2025"
          commerce="GreenMarket"
        />
      </div>
    </div>
  )
}
