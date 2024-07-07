import express from "express";
import {
  Login,
  Register,
  UpdateUser,
  getProfile
} from "../controller/user.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.put("/update", protectRoute, UpdateUser);
router.get("/profile/:id", getProfile);
export default router;
