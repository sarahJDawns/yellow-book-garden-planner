const mongoose = require("mongoose");

const ExpensesSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, "Please add some text"],
  },
  amount: {
    type: Number,
    required: [true, "Please add a number"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Expenses", ExpensesSchema);
