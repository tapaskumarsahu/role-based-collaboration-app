import express from "express";
import Board from "../models/Board.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// Create board
router.post(
  "/",
  authenticate,
  authorize("Admin", "Manager"),
  async (req, res) => {
    try {
      const board = await Board.create({
        name: req.body.name,
        team: req.body.team,
      });
      res.status(201).json(board);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get all boards
router.get("/", authenticate, async (req, res) => {
  try {
    const boards = await Board.find().populate("team").populate("tasks");
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get board by ID
router.get("/:id", authenticate, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
      .populate("team")
      .populate("tasks");
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update board
router.put(
  "/:id",
  authenticate,
  authorize("Admin", "Manager"),
  async (req, res) => {
    try {
      const board = await Board.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!board) return res.status(404).json({ message: "Board not found" });
      res.json(board);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Delete board
router.delete("/:id", authenticate, authorize("Admin"), async (req, res) => {
  try {
    const board = await Board.findByIdAndDelete(req.params.id);
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.json({ message: "Board deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
