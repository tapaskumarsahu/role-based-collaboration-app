import express from "express";
import Task from "../models/Task.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// Create task
router.post(
  "/",
  authenticate,
  authorize("Admin", "Manager"),
  async (req, res) => {
    try {
      const task = await Task.create(req.body);
      res.status(201).json(task);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get all tasks
router.get("/", authenticate, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("board");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get task by ID
router.get("/:id", authenticate, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("board");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update task
router.put(
  "/:id",
  authenticate,
  authorize("Admin", "Manager"),
  async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.json(task);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Delete task
router.delete("/:id", authenticate, authorize("Admin"), async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
