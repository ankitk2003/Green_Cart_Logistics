import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shift_hours: { type: Number, required: true },
  past_week_hours: {
    type: [Number],
    required: false,  // explicitly optional
    validate: {
      validator: function(arr) {
        if (arr === undefined || arr === null) return true; // allow missing
        if (!Array.isArray(arr)) return false;              // must be an array if present
        return arr.length === 7;
      },
      message: 'past_week_hours must be an array of 7 numbers'
    }
  }
}, { timestamps: true });

export default mongoose.model('Driver', driverSchema);
