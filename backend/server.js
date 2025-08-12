import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { loadData } from "./LoadData.js";
import adminRouter from "./routes/adminRoutes.js";
import driverRouter from "./routes/driverRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import routeRouter from "./routes/routeRoutes.js";
dotenv.config({ path: "./server.env" }); 

const app = express();
app.use(express.json())
app.use("/api/user",adminRouter)
app.use("/api/drivers", driverRouter);
app.use("/api/routes", routeRouter);
app.use("/api/orders", orderRouter);

async function main() {
  try {
    
    await mongoose.connect(process.env.MONGO_URL);
    console.log(" DB connected");
   await  loadData()

    app.listen(3000, () => {
      console.log(" Server started on port 3000");
    });
  } catch (err) {
    console.error("DB connection failed:", err);
  }
}

main();
