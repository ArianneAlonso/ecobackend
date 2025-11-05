import QRGenerator from '../QRGenerator'

export default function QRGeneratorExample() {
  return (
    <div className="p-6 bg-background flex justify-center">
      <div className="max-w-md">
        <QRGenerator 
          value="BENEFIT-12345"
          title="Descuento 20% - Café Verde"
          description="Válido hasta el 31/12/2025"
          points={100}
        />
      </div>
    </div>
  )
}
