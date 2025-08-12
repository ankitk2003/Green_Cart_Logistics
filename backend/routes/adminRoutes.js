// adminRoutes.js
import { Signin, verifyOtp, Signup } from "../controllers/adminControllers.js";
import { Router } from "express";
import { getSimulation } from "../controllers/simulationController.js";
const adminRouter = Router();

adminRouter.post("/signup", Signup);
adminRouter.post("/verify-otp", verifyOtp);
adminRouter.post("/signin", Signin);
adminRouter.post("/get-simulation",getSimulation)
export default adminRouter;
