import { Router } from "express";
import { getRoutes, createRoute, updateRoute, deleteRoute } from "../controllers/routeController.js";

const routeRouter = Router();

routeRouter.get("/", getRoutes);
routeRouter.post("/", createRoute);
routeRouter.put("/:id", updateRoute);
routeRouter.delete("/:id", deleteRoute);

export default routeRouter;
