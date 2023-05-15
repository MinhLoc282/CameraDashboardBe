import mongoose from 'mongoose';

const StatisticSchema = new mongoose.Schema({
  profile: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  serial: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  isReaded: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false });

const Statistic = mongoose.model('Statistic', StatisticSchema);
export default Statistic;
