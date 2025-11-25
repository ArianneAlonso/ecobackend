import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true }
}, { timestamps: true });

export default model('Event', EventSchema);