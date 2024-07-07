// routes/addressRoutes.js
import express from "express";
import {
  getAddress,
  deleteAddress,
  postAddress,
} from "../controller/address.js";

const router = express.Router();

router.get("/user/:id/address", getAddress);
router.delete("/user/:id/address", deleteAddress);
router.post("/user/:id/address", postAddress);

export default router;
