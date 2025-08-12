import { Router } from "express";
import { getDrivers, createDriver, updateDriver, deleteDriver } from "../controllers/driverController.js";

const driverRouter = Router();

driverRouter.get("/", getDrivers);
driverRouter.post("/", createDriver);
driverRouter.put("/:id", updateDriver);
driverRouter.delete("/:id", deleteDriver);

export default driverRouter;
