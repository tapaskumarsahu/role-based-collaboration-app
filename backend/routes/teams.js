import express from "express";
import Team from "../models/Team.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// Create team
router.post(
  "/",
  authenticate,
  authorize("Admin", "Manager"),
  async (req, res) => {
    try {
      const team = await Team.create({
        name: req.body.name,
        members: [req.user._id],
      });
      res.status(201).json(team);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get all teams
router.get("/", authenticate, async (req, res) => {
  try {
    const teams = await Team.find().populate("members", "name email role");
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get team by ID
router.get("/:id", authenticate, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate(
      "members",
      "name email role"
    );
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update team
router.put(
  "/:id",
  authenticate,
  authorize("Admin", "Manager"),
  async (req, res) => {
    try {
      const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!team) return res.status(404).json({ message: "Team not found" });
      res.json(team);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Delete team
router.delete("/:id", authenticate, authorize("Admin"), async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json({ message: "Team deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
