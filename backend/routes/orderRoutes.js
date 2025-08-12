import { Router } from "express";
import { getOrders, createOrder, updateOrder, deleteOrder } from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter.get("/", getOrders);
orderRouter.post("/", createOrder);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
