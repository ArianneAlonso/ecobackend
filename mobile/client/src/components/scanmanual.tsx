import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CheckCircle2, Minus, Plus } from "lucide-react-native";

// Ejemplo de definición. Asegúrate de tener materialMap en el mismo archivo o importado.
const materialMap = [
  { id: "plastic", icon: CheckCircle2, label: "Plástico" },
  { id: "glass", icon: CheckCircle2, label: "Vidrio" },
  { id: "paper", icon: CheckCircle2, label: "Papel" },
  { id: "metal", icon: CheckCircle2, label: "Metal" },
  { id: "electronics", icon: CheckCircle2, label: "Electrónicos" },
  { id: "organic", icon: CheckCircle2, label: "Orgánicos" },
];

// ---- COMPONENTE QuantitySelector ----
function QuantitySelector({ value, onChange, min = 1, max = 100, label }) {
  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };
  return (
    <View style={qtyStyles.qtyContainer}>
      {label && <Text style={qtyStyles.qtyLabel}>{label}</Text>}
      <View style={qtyStyles.qtyControls}>
        <TouchableOpacity
          style={qtyStyles.qtyButton}
          onPress={handleDecrement}
          disabled={value <= min}
        >
          <Minus size={20} color={value <= min ? '#ccc' : '#333'} />
        </TouchableOpacity>
        <Text style={qtyStyles.qtyValue}>{value}</Text>
        <TouchableOpacity
          style={qtyStyles.qtyButton}
          onPress={handleIncrement}
          disabled={value >= max}
        >
          <Plus size={20} color={value >= max ? '#ccc' : '#333'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const qtyStyles = StyleSheet.create({
  qtyContainer: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  qtyLabel: { fontSize: 14, fontWeight: '500', flex: 1 },
  qtyControls: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  qtyButton: {
    width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#ccc',
    justifyContent: 'center', alignItems: 'center',
  },
  qtyValue: { fontSize: 20, fontWeight: '600', width: 40, textAlign: 'center' }
});

// ---- COMPONENTE ManualSelector ----
export default function ManualSelector({ selectedMaterials, setSelectedMaterials, onContinue }) {
  const [quantities, setQuantities] = React.useState({});

  return (
    <View>
      <Text style={styles.title}>
        Seleccioná los materiales y cantidad:
      </Text>
      {materialMap.map(material => (
        <View key={material.id} style={{ marginBottom: 12 }}>
          <TouchableOpacity
            style={[
              styles.materialOption,
              selectedMaterials.includes(material.id) && styles.materialSelected
            ]}
            onPress={() => {
              if (selectedMaterials.includes(material.id)) {
                setSelectedMaterials(selectedMaterials.filter(id => id !== material.id));
                setQuantities(prev => {
                  const copy = { ...prev };
                  delete copy[material.id];
                  return copy;
                });
              } else {
                setSelectedMaterials([...selectedMaterials, material.id]);
                setQuantities(prev => ({ ...prev, [material.id]: 1 }));
              }
            }}
          >
            <material.icon size={22} color="#9ccc65" />
            <Text style={styles.materialLabel}>{material.label}</Text>
            {selectedMaterials.includes(material.id) && (
              <CheckCircle2 size={18} color="#9ccc65" style={{ marginLeft: 8 }} />
            )}
          </TouchableOpacity>
          {selectedMaterials.includes(material.id) && (
            <QuantitySelector
              label="Cantidad"
              value={quantities[material.id]}
              onChange={qty => setQuantities(prev => ({ ...prev, [material.id]: qty }))}
              min={1}
              max={50}
            />
          )}
        </View>
      ))}

      <TouchableOpacity
        style={styles.continueButton}
        onPress={onContinue}
        disabled={selectedMaterials.length === 0}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8,
  },
  materialOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  materialSelected: {
    backgroundColor: '#f1f8e9',
    borderColor: "#9ccc65",
    borderWidth: 2,
  },
  materialLabel: {
    fontSize: 15,
    marginLeft: 8,
    flex: 1,
  },
  continueButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#9ccc65",
    alignItems: "center"
  }
});