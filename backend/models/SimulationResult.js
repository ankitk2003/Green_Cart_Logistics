import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  driver: { type: String, required: true },
  orderId: { type: Number, required: true },
  routeId: { type: Number, required: true },
  profit: { type: Number, required: true },
  isLate: { type: Boolean, required: true },
});

const simulationResultSchema = new mongoose.Schema({
  totalProfit: { type: Number, required: true },
  efficiency: { type: Number, required: true },         // percentage
  totalOrders: { type: Number, required: true },
  onTimeDeliveries: { type: Number, required: true },
  lateDeliveries: { type: Number, required: true },
  assignments: [assignmentSchema],
  createdAt: { type: Date, default: Date.now },
});

const SimulationResult = mongoose.model("SimulationResult", simulationResultSchema);

export default SimulationResult;
