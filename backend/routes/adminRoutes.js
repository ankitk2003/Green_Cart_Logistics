// adminRoutes.js
import { Signin, verifyOtp, Signup } from "../controllers/adminControllers.js";
import { Router } from "express";
import { getSimulation, returnSimulations } from "../controllers/simulationController.js";
const adminRouter = Router();
import auth from "../middleware/auth.js";

adminRouter.post("/signup", Signup);
adminRouter.post("/verify-otp", verifyOtp);
adminRouter.post("/signin", Signin);
adminRouter.post("/get-simulation", auth, getSimulation);
adminRouter.get("/get-all-simulation",auth,returnSimulations)
export default adminRouter;
