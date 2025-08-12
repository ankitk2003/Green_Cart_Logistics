// adminRoutes.js
import { Signin, verifyOtp, Signup } from "../controllers/adminControllers.js";
import { Router } from "express";
const adminRouter = Router();

adminRouter.post("/signup", Signup);
adminRouter.post("/verify-otp", verifyOtp);
adminRouter.post("/signin", Signin);

export default adminRouter;
