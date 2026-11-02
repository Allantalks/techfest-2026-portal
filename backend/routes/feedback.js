const express = require("express");
const Feedback = require("../models/Feedback");
const { protect } = require("../middleware/auth");

const router = express.Router();

// ============================================================
// XSS PREVENTION:
// All feedback comments are stored as plain text and returned
// as JSON. The React frontend renders them using { comment }
// inside JSX, which auto-escapes HTML by default.
// We also use textContent instead of innerHTML on the frontend.
// Helmet's Content-Security-Policy header adds another layer.
// ============================================================

// @route   GET /api/feedback/:eventId
// @desc    Get all feedback for an event
// @access  Public
router.get("/:eventId", async (req, res) => {
  try {
    const feedback = await Feedback.find({ event: req.params.eventId })
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   POST /api/feedback
// @desc    Submit feedback for an event
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const { event, rating, comment } = req.body;

    if (!event || !rating) {
      return res.status(400).json({ error: "Event and rating are required" });
    }

    // Sanitize comment - strip any HTML tags as an extra safety layer
    const sanitizedComment = comment
      ? comment.replace(/<[^>]*>/g, "")
      : "";

    const feedback = await Feedback.create({
      user: req.user.id,
      event,
      rating,
      comment: sanitizedComment,
    });

    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
