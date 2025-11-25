import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { processImage } from '../images/images_services.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = 'temp_images';
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

router.post('/upload-image', upload.single('file'), async (req, res) => {
  const authorization = req.headers['authorization'];
  if (!authorization) {
    return res.status(401).json({ detail: 'Token de autorización requerido' });
  }
  const { file } = req;
  if (!file || !['image/png', 'image/jpeg'].includes(file.mimetype)) {
    return res.status(400).json({ detail: 'Tipo de archivo inválido. Solo se permite PNG o JPEG.' });
  }
  const fileLocation = path.join(file.destination, file.filename);

  try {
    const responseText = await processImage(fileLocation, file.mimetype);
    return res.json({ result: responseText });
  } catch (err) {
    return res.status(500).json({ detail: 'Error interno al procesar la imagen.' });
  }
});

// Ruta raíz equivalente al @app.get("/") en FastAPI
router.get('/', (req, res) => {
  res.json({ Hello: 'World' });
});

export default router;
