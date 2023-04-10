import mongoose from 'mongoose';

const CameraSchema = new mongoose.Schema({
  serial: {
    type: String,
    required: true,
    unique: true,
  },
  homeId: {
    type: String,
  },
  connection: {
    type: Boolean,
  },
  securityLevel: {
    type: String,
  },
});

const Camera = mongoose.model('Camera', CameraSchema);
export default Camera;
