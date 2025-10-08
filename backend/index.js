import analyticsRoutes from "./routes/analytics.js";
app.use("/api/analytics", analyticsRoutes);
import fileRoutes from "./routes/files.js";
app.use("/api/files", fileRoutes);
import teamRoutes from "./routes/teams.js";
import boardRoutes from "./routes/boards.js";
import taskRoutes from "./routes/tasks.js";
app.use("/api/teams", teamRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);

// Placeholder for routes
app.get("/", (req, res) => res.send("TeamBoard API running"));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Socket.IO setup
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
  // Listen for task updates and broadcast to all clients
  socket.on("task:update", (data) => {
    io.emit("task:updated", data);
  });

  // Listen for notifications and broadcast
  socket.on("notify", (notification) => {
    io.emit("notification", notification);
  });

  // Advanced: Join room by user ID for targeted notifications
  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`Socket ${socket.id} joined room ${userId}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
