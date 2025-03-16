const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction'); // Import the model

// POST request to create a new transaction
router.post('/', async (req, res) => {
  try {
    const { amount, description, category } = req.body;

    const newTransaction = new Transaction({
      amount,
      description,
      category,
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET request to fetch all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find(); // Find all transactions
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; // Correctly export the router
