import csv from "csvtojson";
import Driver from "./models/Driver.js";
import Order from "./models/Order.js";
import Route from "./models/Route.js";
export const loadData = async () => {

    await Driver.deleteMany();
    await Route.deleteMany();
    await Order.deleteMany();


  const allDrivers = await csv().fromFile("./drivers.csv");
  // console.log(allDrivers);
  const driverDocs = allDrivers.map((d) => ({
    name: d.name,
    shift_hours: Number(d.shift_hours),
    past_week_hours: d.past_week_hours.split("|").map(Number),
  }));
  await Driver.insertMany(driverDocs);

  const orders = await csv().fromFile("./orders.csv");
  const orderDocs = orders.map((o) => ({
    order_id: Number(o.order_id),
    value_rs: Number(o.value_rs),
    route_id: Number(o.route_id),
    delivery_time: o.delivery_time,
  }));
  await Order.insertMany(orderDocs);

  // Import routes.csv
  const routes = await csv().fromFile("./routes.csv");
  const routeDocs = routes.map((r) => ({
    route_id: Number(r.route_id),
    distance_km: Number(r.distance_km),
    traffic_level: r.traffic_level,
    base_time_min: Number(r.base_time_min),
  }));
  await Route.insertMany(routeDocs);
  // console.log("driver data are :",driverDocs);

  console.log("all the data are imported from csv")
};
// loadData()
