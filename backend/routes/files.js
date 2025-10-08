import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { authenticate } from "../middleware/auth.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "attachments",
    };
  },
});

const upload = multer({ storage });

// Upload file
router.post("/upload", authenticate, upload.single("file"), (req, res) => {
  res.json({ fileId: req.file.id, filename: req.file.filename });
});

// Get file by ID
router.get("/:id", authenticate, async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const bucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: "attachments",
    });
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    const downloadStream = bucket.openDownloadStream(fileId);
    downloadStream.on("error", () =>
      res.status(404).json({ message: "File not found" })
    );
    downloadStream.pipe(res);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
