import { Router } from "express";
import { createTransaction, getTransactions } from "../controllers/transaction.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// @route   GET /api/transactions
// @desc    Get all transactions for user
router.get("/", authMiddleware, getTransactions);

// @route   POST /api/transactions
// @desc    Create a transaction (credit/debit)
router.post("/", authMiddleware, createTransaction);

export default router;
