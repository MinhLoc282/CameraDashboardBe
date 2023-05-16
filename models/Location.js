import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    serial: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    activate: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

const Location = mongoose.model('Location', LocationSchema);
export default Location;
