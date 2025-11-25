import QRCode from '../models/qrcode.js';
import User from '../models/User.js';
import { randomUUID } from 'crypto';

// GENERAR QR - Conductor
export const generateQRCode = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'No autorizado' });
  try {
    const code = randomUUID();
    const qr = await QRCode.create({
      code,
      generatedBy: req.user._id,
      points: 50
    });
    res.status(201).json({ qrCode: qr.code });
  } catch (error) {
    res.status(500).json({ message: 'Error al generar el QR' });
  }
};

// ESCANEAR QR - Usuario
export const scanQRCode = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'No autorizado' });
  const { code } = req.body;
  try {
    const qr = await QRCode.findOne({ code });
    if (!qr) return res.status(404).json({ message: 'Código QR no válido' });
    if (qr.isScanned) return res.status(400).json({ message: 'Este código ya fue escaneado' });
    qr.isScanned = true;
    qr.scannedAt = new Date();
    qr.scannedBy = req.user._id;
    await qr.save();
    const user = await User.findById(req.user._id);
    if (user) {
      user.points += qr.points;
      await user.save();
      res.json({ message: `¡Felicitaciones! Has ganado ${qr.points} puntos.`, newTotalPoints: user.points });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al escanear el QR' });
  }
};