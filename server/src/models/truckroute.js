import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const TruckRouteSchema = new Schema({
  zone: { type: String, required: true },
  schedule: { type: Date, required: true },
  driver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending'
  },
  startedAt: { type: Date },
  completedAt: { type: Date }
}, { timestamps: true });

export default model('TruckRoute', TruckRouteSchema);
