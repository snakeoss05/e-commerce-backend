import Order from "../models/Order.js";

// GET all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};

// POST a new order
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    return res.status(201).json({ success: true, data: order });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};

// GET order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return res.status(404).json({ success: false });
    }
    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};

// POST update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;

    if (status === "Delivered") {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    await order.save();
    return res.status(200).json(order);
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};

// DELETE order by ID
export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.deleteOne({ _id: req.params.id });
    if (!deletedOrder) {
      return res.status(404).json({ success: false });
    }
    return res.status(200).json({ success: true, data: {} });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};
