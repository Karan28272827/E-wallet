import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js" ;
import userRoutes from "./routes/user.routes.js";
import walletRoutes from "./routes/wallet.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// Middleware e
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/transactions", transactionRoutes);

// Error Handler
app.use(errorHandler);

export default app;
