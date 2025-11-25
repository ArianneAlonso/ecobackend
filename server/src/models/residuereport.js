import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ResidueReportSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  residueType: { type: String, required: true },
  size: { type: String, required: true },
  zone: { type: String, required: true },
  status: { type: String, enum: ['reported', 'collected'], default: 'reported' }
}, { timestamps: true });

export default model('ResidueReport', ResidueReportSchema);
