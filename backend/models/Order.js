import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  order_id: { type: Number, required: true, unique: true },
  value_rs: { type: Number, required: true },
  route_id: { type: Number, required: true, ref: 'Route' },
  delivery_time: { type: String, required: true }, // stored as HH:MM
  assigned_driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' } // nullable until allocated
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
