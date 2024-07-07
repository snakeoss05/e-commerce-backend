import express from "express";
import {
  addToWishlist,
  getWishlist,
  updateWishlist,
  deleteWishlist,
} from "../controller/wishlist.js";

const router = express.Router();

router.post("/wishlist/:id", addToWishlist);
router.get("/wishlist/:id", getWishlist);
router.put("/wishlist/:id", updateWishlist);
router.delete("/wishlist/:id", deleteWishlist);

export default router;
