const mongoose = require("mongoose");

module.exports = mongoose.model(
  "User",
  new mongoose.Schema({
    userId: { type: String },
    username: { type: String },
    createdAt: { type: Number, default: Date.now() },
    balance: { type: Number, default: 0 },
    // next: Date, count: Number of times the user has searched, amount: Amount of coins from search
    search: { type: Object, default: { next: 0, count: 0, amount: 0 } },
  })
);
