const mongoose = require("mongoose");

// Define the Transaction schema
const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
    enum: ["Food", "Transport", "Shopping", "Bills", "Salary", "Investment", "Others"], // Predefined categories
  },
});

// Create a model using the schema
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
