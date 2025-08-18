import { Router } from "express";
import { getProfile } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// @route   GET /api/users/profile
// @desc    Get logged-in user profile
// @access  Private
router.get("/profile", authMiddleware, getProfile);

export default router;
