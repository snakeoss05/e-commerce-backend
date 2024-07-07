// controllers/productController.js
import Product from "../models/Product.js";

// GET all products with filters and pagination
export const getAllProducts = async (req, res) => {
  const { page = 1, limit = 10, category, discount, name } = req.query;

  if (page < 1 || limit < 1) {
    return res.status(400).json({ error: "Invalid pagination parameters" });
  }

  const filter = {};
  if (category) filter.category = category;
  if (discount === "true") filter.discount = { $ne: 0 };
  if (name) filter.name = { $regex: name, $options: "i" };

  try {
    const products = await Product.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(filter);
    return res.status(200).json({
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(total / limit),
      data: products,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch products" });
  }
};

// POST a new product
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json({ success: true, data: product });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// GET product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// PUT update product by ID
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ success: false });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE product by ID
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.deleteOne({ _id: req.params.id });
    if (!deletedProduct) {
      return res.status(404).json({ success: false });
    }
    return res.status(200).json({ success: true, data: {} });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// Search products
export const searchProducts = async (req, res) => {
  const { page = 1, limit = 10, name } = req.query;

  const filter = {};
  if (name) filter.name = { $regex: name, $options: "i" };

  try {
    const products = await Product.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select("name price image stock");

    const total = await Product.countDocuments(filter);
    return res.status(200).json({ data: products });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch products" });
  }
};
