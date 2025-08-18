import Wallet from "../models/wallet.model.js";

export const getWallet = async (req, res, next) => {
  try {
    const wallet = await Wallet.findOne({ user: req.user.id });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }
    res.status(200).json(wallet);
  } catch (error) {
    next(error);
  }
};

export const addFunds = async (req, res, next) => {
  try {
    const { amount } = req.body;
    let wallet = await Wallet.findOne({ user: req.user.id });

    if (!wallet) {
      wallet = await Wallet.create({ user: req.user.id, balance: 0 });
    }

    wallet.balance += amount;
    await wallet.save();

    res.status(200).json({ message: "Funds added", balance: wallet.balance });
  } catch (error) {
    next(error);
  }
};
