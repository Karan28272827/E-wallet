import { Router } from "express";
import { getWallet, addFunds } from "../controllers/wallet.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// @route   GET /api/wallets
// @desc    Get wallet balance
router.get("/", authMiddleware, getWallet);

// @route   POST /api/wallets/add
// @desc    Add funds to wallet
router.post("/add", authMiddleware, addFunds);

export default router;
