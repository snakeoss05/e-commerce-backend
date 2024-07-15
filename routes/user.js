import express from "express";
import { Login, Register, UpdateUser, getProfile } from "../controller/user.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/users", Register);
router.post("/auth/login", Login);
router.put("/profile/update", protectRoute, UpdateUser);
router.get("/profile/:id", protectRoute,getProfile);
export default router;
