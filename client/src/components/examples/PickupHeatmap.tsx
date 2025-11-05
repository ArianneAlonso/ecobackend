import PickupHeatmap from '../PickupHeatmap'

const mockPickupLocations = [
  { id: 1, lat: -34.6037, lng: -58.3816, count: 15, address: "Av. Corrientes 1234" },
  { id: 2, lat: -34.5937, lng: -58.3716, count: 8, address: "Calle Florida 567" },
  { id: 3, lat: -34.6137, lng: -58.3916, count: 22, address: "Av. Santa Fe 890" },
  { id: 4, lat: -34.6237, lng: -58.4016, count: 5, address: "Calle Lavalle 234" },
];

export default function PickupHeatmapExample() {
  return (
    <div className="p-6 bg-background">
      <PickupHeatmap locations={mockPickupLocations} />
    </div>
  )
}
