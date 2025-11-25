// services/api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// ============================================
// CONFIGURACIÓN AUTOMÁTICA DE IP
// ============================================

function getBaseURL(port: number): string {
  const expoDebuggerHost = Constants.expoConfig?.hostUri;
  if (expoDebuggerHost) {
    const ip = expoDebuggerHost.split(':')[0];
    const baseUrl = `http://${ip}:${port}`;
    console.log(`📡 IP detectada automáticamente: ${baseUrl}`);
    return baseUrl;
  }
  const FALLBACK_IP = '192.168.1.100'; // Cambia esto a tu IP
  const fallbackUrl = `http://${FALLBACK_IP}:${port}`;
  console.warn(`⚠️ No se pudo detectar IP automáticamente, usando fallback: ${fallbackUrl}`);
  return fallbackUrl;
}

const API_BASE_URL_NODE = `${getBaseURL(3000)}/api`;
console.log('🔵 API Node.js:', API_BASE_URL_NODE);

// ============================================
// CONFIGURACIÓN DE AXIOS
// ============================================

const api = axios.create({
  baseURL: API_BASE_URL_NODE,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token automáticamente
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================
// INTERFACES
// ============================================

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  zone: string;
}

interface LoginResponse {
  token: string;
  role: string;
  user?: {
    _id: string;
    username: string;
    email: string;
    zone: string;
  };
}

// ============================================
// FUNCIONES DE AUTENTICACIÓN
// ============================================

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterData): Promise<{ message: string }> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

// ============================================
// FUNCIONES DE USUARIO
// ============================================

export const getProfile = async (): Promise<any> => {
  const response = await api.get('/auth/profile');
  return response.data;
};

export const updateProfile = async (data: any): Promise<any> => {
  const response = await api.put('/auth/profile', data);
  return response.data;
};

// ============================================
// FUNCIONES DE CÓDIGOS QR
// ============================================

export const scanQRCode = async (code: string): Promise<{ message: string; newTotalPoints: number }> => {
  const response = await api.post('/qrcodes/scan', { code });
  return response.data;
};

export const generateQRCode = async (): Promise<{ qrCode: string }> => {
  const response = await api.post('/qrcodes/generate');
  return response.data;
};

// ============================================
// FUNCIONES DE CONTENEDORES
// ============================================

export const getContainers = async (): Promise<any> => {
  const response = await api.get('/containers');
  return response.data;
};

// ============================================
// FUNCIONES DE CLASIFICACIÓN DE RESIDUOS
// ============================================

export const classifyResidue = async (imageUri: string): Promise<{ materials: string[] }> => {
  const formData = new FormData();
  const uriParts = imageUri.split('/');
  const fileName = uriParts[uriParts.length - 1];

  let mimeType = 'image/jpeg';
  if (fileName.endsWith('.png')) mimeType = 'image/png';

  formData.append('file', {
    uri: imageUri,
    type: mimeType,
    name: fileName,
  } as any);

  // Ajusta '/images/upload-image' si tu endpoint es diferente
  const response = await api.post('/images/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data; // Espera { materials: [...] }
};

// ============================================
// EXPORT POR DEFECTO
// ============================================

export default {
  login,
  register,
  getProfile,
  updateProfile,
  scanQRCode,
  generateQRCode,
  getContainers,
  classifyResidue
};
