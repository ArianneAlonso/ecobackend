import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const QRCodeSchema = new Schema({
  code: { type: String, required: true, unique: true },
  generatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  scannedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  points: { type: Number, required: true, default: 0 },
  isScanned: { type: Boolean, default: false },
  scannedAt: { type: Date }
}, { timestamps: true });

export default model('QRCode', QRCodeSchema);
