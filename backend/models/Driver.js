import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shift_hours: { type: Number, required: true }, 
  past_week_hours: { 
    type: [Number], 
    validate: arr => arr.length === 7
  }
}, { timestamps: true });

export default mongoose.model('Driver', driverSchema);
