const Account = require("../models/Account");
const mongoose = require("mongoose");
const getBalance = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized - Missing token" });
    }
    const account = await Account.findOne({ user: userId }).exec();
    if (!account) {
      res.status(404).json({ error: "Account not found" });
    }
    return res.status(200).json({ balance: account.balance });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const transferMoney = async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    const userId = req.userId;
    if (!userId) {
      await session.abortTransaction();
      res.status(401).json({ error: "Unauthorized - Missing token" });
    }
    const { to, amount } = req.body;

    const account = await Account.findOne({ user: userId }).session(session);

    if (account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        error: "Insufficient balance",
      });
    }

    const receiver = await Account.findOne({ user: to }).session(session);

    if (!receiver) {
      await session.abortTransaction();
      return res.status(400).json({
        error: "Invalid account",
      });
    }
    await Account.updateOne(
      { user: userId },
      {
        $inc: {
          balance: -amount,
        },
      }
    ).session(session);
    await Account.updateOne(
      {
        user: to,
      },
      {
        $inc: {
          balance: amount,
        },
      }
    ).session(session);
    await session.commitTransaction();
    return res.status(200).json({ message: "Transfer successful" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getBalance, transferMoney };
