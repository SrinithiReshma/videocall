const express = require('express');
const router = express.Router();
const Call = require('../models/Call');

// CREATE - Add new call
router.post('/', async (req, res) => {
  try {
    const newCall = new Call(req.body);
    const savedCall = await newCall.save();
    res.status(201).json(savedCall);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ - Get all calls
router.get('/', async (req, res) => {
  try {
    const calls = await Call.find().sort({ createdAt: -1 });
    res.json(calls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ - Get single call
router.get('/:id', async (req, res) => {
  try {
    const call = await Call.findById(req.params.id);
    if (!call) {
      return res.status(404).json({ message: 'Call not found' });
    }
    res.json(call);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE - Update call
router.put('/:id', async (req, res) => {
  try {
    const updatedCall = await Call.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCall) {
      return res.status(404).json({ message: 'Call not found' });
    }
    res.json(updatedCall);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Delete call
router.delete('/:id', async (req, res) => {
  try {
    const deletedCall = await Call.findByIdAndDelete(req.params.id);
    if (!deletedCall) {
      return res.status(404).json({ message: 'Call not found' });
    }
    res.json({ message: 'Call deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;