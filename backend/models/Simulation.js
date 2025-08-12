import mongoose from 'mongoose';

const simulationSchema = new mongoose.Schema({
  inputs: {
    available_drivers: Number,
    route_start_time: String, // HH:MM
    max_hours_per_driver: Number
  },
  kpis: {
    total_profit: Number,
    efficiency_score: Number,
    on_time_deliveries: Number,
    late_deliveries: Number,
    fuel_cost_breakdown: Object // { route_id: cost }
  },
  orders_allocated: [{
    order_id: Number,
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    delivered_on_time: Boolean,
    profit: Number
  }],
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('Simulation', simulationSchema);
