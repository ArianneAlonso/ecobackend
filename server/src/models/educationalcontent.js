import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const EducationalContentSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default model('EducationalContent', EducationalContentSchema);
