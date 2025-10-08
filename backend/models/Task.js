import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    attachments: [{ type: String }], // GridFS file IDs
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
