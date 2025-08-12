import Driver from "../models/Driver.js";
import Order from "../models/Order.js";
import Route from "../models/Route.js";
import SimulationResult from "../models/SimulationResult.js";
export const getSimulation = async (req, res) => {
  try {
    const {
      numberOfAvailableDrivers,
      routeStartTime,
      maxHoursPerDriverPerDay,
    } = req.body;

    console.log(req.body);
    if (
      numberOfAvailableDrivers == null ||
      routeStartTime == null ||
      maxHoursPerDriverPerDay == null
    ) {
      return res.status(400).json({ error: "missing parameters" });
    }
    if (numberOfAvailableDrivers <= 0 || maxHoursPerDriverPerDay <= 0) {
      return res.status(400).json({ error: "invalid input" });
    }

    const drivers = await Driver.find({
      shift_hours: { $lt: maxHoursPerDriverPerDay },
    }).limit(numberOfAvailableDrivers);

    if (drivers.length === 0) {
      return res.status(400).json({ error: "drivers not available" });
    }

    const routes = await Route.find();
    const orders = await Order.find();

    let totalProfit = 0;
    let totalOrders = orders.length;
    let onTimeDeliveries = 0;
    let assignments = [];

    orders.forEach((order, index) => {
      const driver = drivers[index % drivers.length];
      const route = routes.find((r) => r.route_id == order.route_id);
      if (!route) return;

      let actualRouteTime = route.base_time_min;
      //   console.log(driver.past_week_hours[6])
      if (driver.past_week_hours[6] > 8) {
        actualRouteTime *= 1.3;
      }

      let penalty = 0;
      let bonus = 0;
      //   const deliveryDeadline = route.base_time_min + 10;
      function timeStringToMinutes(timeStr) {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return hours * 60 + minutes;
      }
      const deliveryDeadline = route.base_time_min + 10;
      const actualDeliveryMinutes = timeStringToMinutes(order.delivery_time);
      const isLate = actualDeliveryMinutes > deliveryDeadline;

      if (isLate) {
        penalty = 50;
      } else {
        onTimeDeliveries++;
        if (order.value_rs > 1000) {
          bonus = order.value_rs * 0.1;
        }
      }

      let fuelCost = route.distance_km * 5;
      if (route.traffic_level === "High") {
        fuelCost += route.distance_km * 2;
      }

      const profit = order.value_rs + bonus - penalty - fuelCost;
      totalProfit += profit;

      assignments.push({
        driver: driver.name,
        orderId: order.order_id,
        routeId: route.route_id,
        profit,
        isLate,
      });
    });

    const efficiency =
      totalOrders > 0 ? (onTimeDeliveries / totalOrders) * 100 : 0;

    const simulationResult = new SimulationResult({
      userId: req.userId,
      totalProfit,
      efficiency,
      totalOrders,
      onTimeDeliveries,
      lateDeliveries: totalOrders - onTimeDeliveries,
      assignments,
    });

    await simulationResult.save();

    res.json({
      totalProfit,
      efficiency,
      totalOrders,
      onTimeDeliveries,
      lateDeliveries: totalOrders - onTimeDeliveries,
      assignments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const returnSimulations = async (req, res) => {
  try {
    const result = await SimulationResult.find({ userId: req.userId });
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
