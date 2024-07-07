// routes/orderRoutes.js
import express from "express";
import {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controller/orders.js";

const router = express.Router();

router.get("/orders", getAllOrders);
router.post("/orders", createOrder);
router.get("/orders/:id", getOrderById);
router.post("/orders/status", updateOrderStatus);
router.delete("/orders/:id", deleteOrder);

export default router;
