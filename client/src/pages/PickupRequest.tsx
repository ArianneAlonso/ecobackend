import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Package, 
  MapPin, 
  Calendar, 
  ArrowLeft,
  CheckCircle2,
  Trash2, 
  Wine, 
  FileText, 
  Cpu, 
  Leaf, 
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import ScanResiduo from '../components/scanresiduo';

interface Material {
  id: string;
  icon: any;
  label: string;
}

interface Schedule {
  id: string;
  day: string;
  time: string;
  hours: string;
}

const materials: Material[] = [
  { id: "plastic", icon: Trash2, label: "Plástico" },
  { id: "glass", icon: Wine, label: "Vidrio" },
  { id: "paper", icon: FileText, label: "Papel" },
  { id: "metal", icon: Package, label: "Metal" },
  { id: "electronics", icon: Cpu, label: "Electrónicos" },
  { id: "organic", icon: Leaf, label: "Orgánicos" },
];

const containerTypes = {
  bolsas: [
    { id: "bolsa-supermercado", label: "Bolsa de supermercado" },
    { id: "bolsa-consorcio", label: "Bolsa de consorcio / basura" },
    { id: "bolsa-cocina", label: "Bolsa pequeña de cocina" },
    { id: "bolsa-alpillera", label: "Bolsa alpillera" },
    { id: "bolsa-malla", label: "Bolsa malla para jardín" },
  ],
  cajas: [
    { id: "caja-pequeña", label: "Caja pequeña" },
    { id: "caja-mediana", label: "Caja mediana" },
    { id: "caja-grande", label: "Caja grande" },
  ],
  bidones: [
    { id: "bidon-pequeño", label: "Bidón pequeño" },
    { id: "bidon-grande", label: "Bidón grande" },
  ],
  otros: [
    { id: "sueltos", label: "Residuos sueltos / a granel" },
    { id: "rollos", label: "Rollos o fardos" },
  ],
};

const scheduleOptions: Schedule[] = [
  { id: "lunes-mañana", day: "Lunes", time: "Mañana", hours: "8:00 - 12:00" },
  { id: "martes-tarde", day: "Martes", time: "Tarde", hours: "14:00 - 18:00" },
  { id: "miercoles-mañana", day: "Miércoles", time: "Mañana", hours: "8:00 - 12:00" },
  { id: "jueves-tarde", day: "Jueves", time: "Tarde", hours: "14:00 - 18:00" },
];

export default function PickupRequest() {
  const navigation = useNavigation<any>();
  const [step, setStep] = useState(1);
  const [scanMethod, setScanMethod] = useState<"scan" | "manual" | null>(null);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedContainer, setSelectedContainer] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [address, setAddress] = useState("");

  const handleNext = () => {
    if (step === 1) {
      if (selectedMaterials.length === 0) {
        Alert.alert('Error', 'Selecciona al menos un material');
        return;
      }
    }
    if (step === 2) {
      if (!selectedContainer) {
        Alert.alert('Error', 'Selecciona un tipo de envase');
        return;
      }
    }
    if (step < 3) setStep(step + 1);
  };

  const handleSubmit = () => {
    Alert.alert('¡Solicitud enviada!', 'Te notificaremos cuando confirmemos tu retiro', [
      { text: 'OK', onPress: () => navigation.navigate('Home') }
    ]);
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3].map((s) => (
        <View
          key={s}
          style={[
            styles.stepBar,
            s <= step ? styles.stepBarActive : styles.stepBarInactive
          ]}
        />
      ))}
    </View>
  );

  // *** Aquí utilizamos el nuevo componente ScanResiduo.tsx ***
  const renderStep1 = () => (
    <ScanResiduo 
      scanMethod={scanMethod}
      setScanMethod={setScanMethod}
      selectedMaterials={selectedMaterials}
      setSelectedMaterials={setSelectedMaterials}
      onContinue={handleNext}
    />
  );


  const renderStep2 = () => (
    <View>
      <Text style={styles.stepTitle}>Tipo de envase</Text>
      <Text style={styles.stepDescription}>
        ¿En qué tipo de contenedor están tus residuos?
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} style={{ height: 400 }}>
        {Object.entries(containerTypes).map(([category, containers]) => (
          <View key={category} style={styles.containerCategory}>
            <View style={styles.categoryHeader}>
              <Package size={16} color="#333" />
              <Text style={styles.categoryTitle}>
                {category === 'bolsas' ? 'Bolsas' :
                  category === 'cajas' ? 'Cajas o contenedores' :
                  category === 'bidones' ? 'Contenedores rígidos / bidones' :
                  'Otros'}
              </Text>
            </View>
            {containers.map((container) => (
              <TouchableOpacity
                key={container.id}
                style={[
                  styles.containerCard,
                  selectedContainer === container.id && styles.containerCardSelected
                ]}
                onPress={() => setSelectedContainer(container.id)}
              >
                <View style={[
                  styles.radioButton,
                  selectedContainer === container.id && styles.radioButtonSelected
                ]}>
                  {selectedContainer === container.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <Text style={styles.containerLabel}>{container.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderStep3 = () => (
    <View>
      <Text style={styles.stepTitle}>Confirmar retiro</Text>
      <Text style={styles.stepDescription}>
        Verifica los detalles y confirma tu solicitud
      </Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Resumen</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Materiales: </Text>
          <Text style={styles.summaryValue}>
            {selectedMaterials.map(id => 
              materials.find(m => m.id === id)?.label
            ).join(", ")}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Envase: </Text>
          <Text style={styles.summaryValue}>
            {Object.values(containerTypes)
              .flat()
              .find(c => c.id === selectedContainer)?.label}
          </Text>
        </View>
      </View>

      <View style={styles.mapPlaceholder}>
        <MapPin size={48} color="#999" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Dirección de retiro</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Av. Principal 123, Depto 4B"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <View style={styles.scheduleContainer}>
        <Text style={styles.inputLabel}>Selecciona día y horario</Text>
        {scheduleOptions.map((schedule) => (
          <TouchableOpacity
            key={schedule.id}
            style={[
              styles.scheduleCard,
              selectedSchedule === schedule.id && styles.scheduleCardSelected
            ]}
            onPress={() => setSelectedSchedule(schedule.id)}
          >
            <View style={styles.scheduleInfo}>
              <Calendar size={20} color="#9ccc65" />
              <View style={styles.scheduleText}>
                <Text style={styles.scheduleDay}>{schedule.day} - {schedule.time}</Text>
                <Text style={styles.scheduleHours}>{schedule.hours}</Text>
              </View>
            </View>
            {selectedSchedule === schedule.id && (
              <CheckCircle2 size={20} color="#9ccc65" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const isButtonDisabled = step === 1 && !scanMethod; // El botón está desactivado en el paso 1 si no se ha elegido un método.

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Solicitar Retiro</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {renderStepIndicator()}

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomBar}>
        {step > 1 && (
          <TouchableOpacity
            style={[styles.button, styles.buttonOutline]}
            onPress={() => setStep(step - 1)}
          >
            <Text style={styles.buttonOutlineText}>Atrás</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary, isButtonDisabled && styles.buttonDisabled]}
          onPress={step === 3 ? handleSubmit : handleNext}
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonPrimaryText}>
            {step === 3 ? "Confirmar Solicitud" : "Continuar"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Mantuve los estilos que NO están relacionados con el paso 1 para que el archivo sea más conciso.
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  stepIndicator: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  stepBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  stepBarActive: {
    backgroundColor: '#9ccc65',
  },
  stepBarInactive: {
    backgroundColor: '#e0e0e0',
  },
  stepTitle: { // Estilos usados en Step 2 y 3
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  stepDescription: { // Estilos usados en Step 2 y 3
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  containerCategory: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  containerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  containerCardSelected: {
    borderColor: '#9ccc65',
    backgroundColor: '#f1f8e9',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#9ccc65',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#9ccc65',
  },
  containerLabel: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  summaryCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
  },
  scheduleContainer: {
    marginBottom: 16,
  },
  scheduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  scheduleCardSelected: {
    borderColor: '#9ccc65',
    backgroundColor: '#f1f8e9',
  },
  scheduleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scheduleText: {
    gap: 2,
  },
  scheduleDay: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  scheduleHours: {
    fontSize: 12,
    color: '#666',
  },
  bottomBar: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  buttonOutlineText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  buttonPrimary: {
    backgroundColor: '#9ccc65',
  },
  buttonPrimaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  buttonDisabled: {
    backgroundColor: '#e0e0e0',
  },
});