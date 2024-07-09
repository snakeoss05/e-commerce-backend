// routes/orderRoutes.js
import express from "express";
import {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrderStatus,
  getOrderProducts,
  deleteOrder,
} from "../controller/orders.js";

const router = express.Router();

router.get("/", getAllOrders);
router.post("/", createOrder);
router.get("/:id", getOrderById);
router.put("/:id", updateOrderStatus);
router.post("/status", updateOrderStatus);
router.get("/getOrderProducts/:id", getOrderProducts);
router.delete("/:id", deleteOrder);

export default router;
