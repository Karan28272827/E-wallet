import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    wallet: { type: mongoose.Schema.Types.ObjectId, ref: "Wallet", required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["credit", "debit"], required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
