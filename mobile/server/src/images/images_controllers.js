import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { processImage } from './images_services'; // Ajusta la ruta según tu estructura

const router = express.Router();

// Configuración de multer para almacenar imágenes temporalmente
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = 'temp_images';
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Puedes agregar timestamp si quieres evitar duplicados
  }
});
const upload = multer({ storage });

router.post('/upload-image', upload.single('file'), async (req, res) => {
  const authorization = req.headers['authorization'];
  if (!authorization) {
    return res.status(401).json({ detail: 'Token de autorización requerido' });
  }
  console.log(`Token recibido: ${authorization}`);

  // Solo permitimos PNG/JPEG
  const { file } = req;
  if (!file || !['image/png', 'image/jpeg'].includes(file.mimetype)) {
    return res.status(400).json({ detail: 'Tipo de archivo inválido. Solo se permite PNG o JPEG.' });
  }

  const fileLocation = path.join(file.destination, file.filename);

  try {
    // Procesa la imagen usando tu función personalizada
    const responseText = await processImage(fileLocation, file.mimetype);
    return res.json({ result: responseText });
  } catch (err) {
    if (err instanceof ValueError) {
      return res.status(400).json({ detail: err.message });
    }
    console.error(`Error procesando imagen: ${err}`);
    return res.status(500).json({ detail: 'Error interno al procesar la imagen.' });
  }
});

export default router;
