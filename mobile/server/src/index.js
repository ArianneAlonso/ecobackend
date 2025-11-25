import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import os from 'os';

// Rutas
import authRoutes from './routes/authroutes.js';
import containerRoutes from './routes/containerroutes.js';
import truckRouteRoutes from './routes/truckrouteroutes.js';
import qrCodeRoutes from './routes/qrroutes.js';
import imagesRoutes from './routes/imagesroutes.js'; // AÑADE LA IMPORTACIÓN

// --- Función para obtener la IP local ---
function getLocalIp() {
  const networkInterfaces = os.networkInterfaces();
  for (const name of Object.keys(networkInterfaces)) {
    const nets = networkInterfaces[name];
    if (!nets) continue;
    for (const net of nets) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'IP_NO_ENCONTRADA';
}
// ----------------------------------------

dotenv.config();
connectDB();
const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';
const LOCAL_IP = getLocalIp();

app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/containers', containerRoutes);
app.use('/api/routes', truckRouteRoutes);
app.use('/api/qrcodes', qrCodeRoutes);
app.use('/api/images', imagesRoutes); // AÑADE LA RUTA DE IMÁGENES

// Si quieres una raíz "/"
app.get('/', (req, res) => {
  res.json({ Hello: 'World' });
});

app.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
  console.log(`Accesible desde la red local en: http://${LOCAL_IP}:${PORT}`);
});
