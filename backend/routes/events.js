const express = require("express");
const Event = require("../models/Event");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name email")
      .sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/events/:id
// @desc    Get single event by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("registeredUsers", "name email");

    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (Admin)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   PUT /api/events/:id
// @desc    Update an event
// @access  Private (Admin)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Private (Admin)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   POST /api/events/:id/register
// @desc    Register for an event
// @access  Private
router.post("/:id/register", protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    if (event.registeredUsers.includes(req.user.id)) {
      return res.status(400).json({ error: "Already registered for this event" });
    }

    if (event.registeredUsers.length >= event.maxParticipants) {
      return res.status(400).json({ error: "Event is full" });
    }

    event.registeredUsers.push(req.user.id);
    await event.save();

    res.json({ message: "Successfully registered for the event" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
