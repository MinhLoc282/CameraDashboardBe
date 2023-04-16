import mongoose from 'mongoose';

const WarningSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  serial: {
    type: String,
    required: true,
  },
  securityLevel: {
    type: String,
    required: true,
  },
  playback: {
    type: String,
  },
}, { versionKey: false });

const Warning = mongoose.model('Warning', WarningSchema);
export default Warning;
