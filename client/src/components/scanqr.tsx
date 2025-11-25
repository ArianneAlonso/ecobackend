import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Camera as CameraIcon } from 'lucide-react-native';
import { Camera, CameraView } from 'expo-camera'; 
import { PermissionStatus } from 'expo-modules-core'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../servicies/api';

interface ScanQRProps {
  onScan: (data: string, points?: number) => void;
  title?: string;
  description?: string;
}

export default function ScanQR({ 
  onScan, 
  title = "Escanear Código QR/Barra", 
  description = "Apunta la cámara al código para iniciar el proceso de retiro." 
}: ScanQRProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync(); 
      setHasPermission(status === PermissionStatus.GRANTED); 
    };

    requestCameraPermission();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string; }) => {
    if (scanned) return;
    setScanned(true);

    try {
      // Obtener el token del usuario
      const userToken = await AsyncStorage.getItem('userToken');
      
      if (!userToken) {
        Alert.alert(
          'Error',
          'No se encontró token de autenticación. Por favor, inicia sesión nuevamente.',
          [{ text: 'OK', onPress: () => setScanned(false) }]
        );
        return;
      }
      
      // Llamar a la API para escanear el QR
      const result = await api.scanQRCode(data, userToken);
      
      Alert.alert(
        "¡Éxito!",
        `${result.message}\nPuntos totales: ${result.newTotalPoints}`,
        [{ 
          text: "OK", 
          onPress: () => onScan(data, result.newTotalPoints) 
        }]
      );
    } catch (error: any) {
      console.error('Error al escanear QR:', error);
      const msg = error.response?.data?.message || "Error al procesar el código";
      Alert.alert(
        "Error", 
        msg, 
        [{ 
          text: "Reintentar", 
          onPress: () => setScanned(false) 
        }]
      );
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Solicitando permiso de cámara...</Text>
      </View>
    );
  }
  
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          Acceso a la cámara denegado. Por favor, habilítalo en la configuración de tu dispositivo.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      
      <View style={styles.scannerContainer}>
        <CameraView 
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'ean13', 'code128', 'datamatrix', 'pdf417'],
          }}
          style={StyleSheet.absoluteFillObject}
        />

        <View style={styles.overlay} />
        <View style={styles.scanningFrame}>
          <CameraIcon size={50} color="#fff" />
        </View>
        
        {scanned && (
          <TouchableOpacity 
            style={styles.rescanButton} 
            onPress={() => setScanned(false)}
          >
            <Text style={styles.rescanText}>Escanear de nuevo</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    padding: 20,
  },
  scannerContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#000',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderColor: 'rgba(156, 204, 101, 0.5)', 
    borderWidth: 50, 
  },
  scanningFrame: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#9ccc65',
    margin: 45, 
    borderRadius: 8,
  },
  rescanButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
  },
  rescanText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});