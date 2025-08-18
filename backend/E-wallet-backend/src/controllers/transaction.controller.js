import Transaction from "../models/transaction.model.js";
import Wallet from "../models/wallet.model.js";

export const getTransactions = async (req, res, next) => {
  try {
    const wallet = await Wallet.findOne({ user: req.user.id });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    const transactions = await Transaction.find({ wallet: wallet._id });
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

export const createTransaction = async (req, res, next) => {
  try {
    const { amount, type, description } = req.body;
    let wallet = await Wallet.findOne({ user: req.user.id });

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    // update balance
    if (type === "credit") {
      wallet.balance += amount;
    } else if (type === "debit") {
      if (wallet.balance < amount) {
        return res.status(400).json({ message: "Insufficient funds" });
      }
      wallet.balance -= amount;
    } else {
      return res.status(400).json({ message: "Invalid transaction type" });
    }

    await wallet.save();

    // save transaction
    const transaction = await Transaction.create({
      wallet: wallet._id,
      amount,
      type,
      description,
    });

    res.status(201).json({ message: "Transaction successful", transaction, balance: wallet.balance });
  } catch (error) {
    next(error);
  }
};
