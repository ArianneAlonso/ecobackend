import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';

import ManualSelector from './scanmanual'; // Ajusta el import según tu ruta real

import {
  CheckCircle2,
  Trash2,
  Wine,
  FileText,
  Cpu,
  Package,
  Leaf,
  Camera as CameraIcon
} from 'lucide-react-native';

import api from '../../servicies/api';
import { CameraView, useCameraPermissions } from 'expo-camera';

interface Material {
  id: string;
  icon: any;
  label: string;
}

// Mapeo para iconos y labels según ids recibidos desde el backend
export const materialMap: Material[] = [
  { id: "plastic", icon: Trash2, label: "Plástico" },
  { id: "glass", icon: Wine, label: "Vidrio" },
  { id: "paper", icon: FileText, label: "Papel" },
  { id: "metal", icon: Package, label: "Metal" },
  { id: "electronics", icon: Cpu, label: "Electrónicos" },
  { id: "organic", icon: Leaf, label: "Orgánicos" },
];

interface ScanResiduoProps {
  scanMethod: "scan" | "manual" | null;
  setScanMethod: (method: "scan" | "manual" | null) => void;
  selectedMaterials: string[];
  setSelectedMaterials: (materials: string[]) => void;
  onContinue: () => void;
}

export default function ScanResiduo({
  scanMethod,
  setScanMethod,
  selectedMaterials,
  setSelectedMaterials,
  onContinue,
}: ScanResiduoProps) {

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  // Lógica de análisis y conexión al backend
  const handleImageSelected = async (uri: string) => {
    setImageUri(uri);
    setSelectedMaterials([]);
    setIsAnalyzing(true);

    try {
      const result = await api.classifyResidue(uri);
      setSelectedMaterials(result.materials || []);
      if (result.materials?.length > 0) {
        Alert.alert("Análisis completado", "Materiales identificados");
      } else {
        Alert.alert("Análisis completado", "No se identificaron materiales");
      }
    } catch (err: any) {
      Alert.alert("Error", err?.message || "No se pudo analizar la imagen");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Cámara
  const takePicture = async () => {
    try {
      const photo = await cameraRef.current?.takePictureAsync();
      if (photo?.uri) {
        setCameraActive(false);
        handleImageSelected(photo.uri);
      }
    } catch (e) {
      console.log("Error al tomar foto", e);
    }
  };

  const renderCamera = () => {
    if (!permission?.granted) {
      return (
        <View style={styles.permissionContainer}>
          <Text style={{ textAlign: "center", marginBottom: 10 }}>
            Necesitamos permiso para usar la cámara
          </Text>
          <TouchableOpacity
            style={styles.permissionBtn}
            onPress={requestPermission}
          >
            <Text style={{ color: "#fff" }}>Conceder permiso</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={{ height: 400, borderRadius: 12, overflow: "hidden" }}>
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing="back"
        />
        <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
          <View style={styles.captureInner}/>
        </TouchableOpacity>
      </View>
    );
  };

  // Renderizar materiales detectados dinámicamente
  const renderDetectedMaterials = () => (
    <View style={{ marginTop: 18 }}>
      <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 8 }}>
        Materiales detectados:
      </Text>
      {selectedMaterials.length === 0 ? (
        <Text style={{ color: "#999" }}>No se detectó ningún residuo reciclable</Text>
      ) : (
        selectedMaterials.map(id => {
          const material = materialMap.find(m => m.id === id);
          if (!material) return null;
          const IconComponent = material.icon;
          return (
            <View key={material.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <IconComponent size={24} color="#9ccc65" />
              <Text style={{ fontSize: 15 }}>{material.label}</Text>
            </View>
          );
        })
      )}
    </View>
  );

  // Opciones para iniciar el escaneo o modo manual
  const renderMethodOptions = () => (
    <View style={styles.methodOptions}>
      <TouchableOpacity
        style={styles.methodCard}
        onPress={() => {
          setScanMethod("scan");
          setCameraActive(true);
        }}
      >
        <CameraIcon size={24} color="#9ccc65" />
        <Text>Escanear con cámara</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.methodCard}
        onPress={() => setScanMethod("manual")}
      >
        <CheckCircle2 size={24} color="#9ccc65" />
        <Text>Selección manual</Text>
      </TouchableOpacity>
    </View>
  );

  // Render escaneo + materiales
  const renderScan = () => (
    <View style={{ gap: 16 }}>
      {cameraActive ? (
        renderCamera()
      ) : !imageUri ? (
        <TouchableOpacity style={styles.uploadArea} onPress={() => setCameraActive(true)}>
          <CameraIcon size={48} color="#999" />
          <Text>Tocar para abrir la cámara</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          {isAnalyzing && (
            <View style={styles.analyzingOverlay}>
              <ActivityIndicator color="#fff" size="large" />
              <Text style={{ color: "#fff" }}>Analizando...</Text>
            </View>
          )}
          {!isAnalyzing && renderDetectedMaterials()}
        </>
      )}

      <TouchableOpacity style={styles.changeMethodButton} onPress={() => setScanMethod(null)}>
        <Text>Cambiar método</Text>
      </TouchableOpacity>
    </View>
  );

  // Render principal
  return (
    <View>
      <Text style={styles.stepTitle}>Reconocimiento de materiales</Text>
      <Text style={styles.stepDescription}>Escanea o seleccioná tus residuos</Text>

      {!scanMethod && renderMethodOptions()}
      {scanMethod === "scan" && renderScan()}
      {scanMethod === "manual" && (
        <ManualSelector
          selectedMaterials={selectedMaterials}
          setSelectedMaterials={setSelectedMaterials}
          onContinue={onContinue}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  stepTitle: { fontSize: 20, fontWeight: "600", marginBottom: 8 },
  stepDescription: { color: "#666", marginBottom: 20 },
  methodOptions: { gap: 12 },
  methodCard: {
    padding: 14,
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 3,
    alignItems: "center",
  },
  uploadArea: {
    height: 200,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 12,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 300,
    borderRadius: 12,
  },
  analyzingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  changeMethodButton: {
    borderWidth: 1,
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    borderColor: "#ccc",
    alignItems: "center"
  },
  permissionContainer: { padding: 20, alignItems: "center" },
  permissionBtn: {
    backgroundColor: "#689f38",
    padding: 10,
    borderRadius: 8,
  },
  captureBtn: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center"
  },
  captureInner: {
    width: 55,
    height: 55,
    backgroundColor: "#fff",
    borderRadius: 35,
  },
});
