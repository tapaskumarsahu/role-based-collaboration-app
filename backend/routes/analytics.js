import express from "express";
import Task from "../models/Task.js";
import User from "../models/User.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// Task progress summary
router.get("/task-progress", authenticate, async (req, res) => {
  try {
    const total = await Task.countDocuments();
    const todo = await Task.countDocuments({ status: "todo" });
    const inProgress = await Task.countDocuments({ status: "in-progress" });
    const done = await Task.countDocuments({ status: "done" });
    res.json({ total, todo, inProgress, done });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Member activity summary
router.get("/member-activity", authenticate, async (req, res) => {
  try {
    const users = await User.find();
    const activity = await Promise.all(
      users.map(async (user) => {
        const assigned = await Task.countDocuments({ assignedTo: user._id });
        const completed = await Task.countDocuments({
          assignedTo: user._id,
          status: "done",
        });
        return {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          assigned,
          completed,
        };
      })
    );
    res.json(activity);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
