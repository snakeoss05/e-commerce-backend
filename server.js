import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db.js";
import express from "express";
import userRoutese from "./routes/user.js";
import addressesRoutes from "./routes/Addresses.js";
import orderRoutes from "./routes/order.js";
import productRoutes from "./routes/product.js";
import wishlistRoutes from "./routes/wishlist.js";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));
const PORT = process.env.PORT || 8000;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type", "Authorization");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api", userRoutese);
app.use("/api/addresses", addressesRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", productRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.use("*", (req, res) => res.status(404).json({ error: "ops not found" }));
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
