import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ContainerSchema = new Schema({
  title: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  acceptedMaterials: [{ type: String }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

ContainerSchema.index({ location: '2dsphere' });

export default model('Container', ContainerSchema);