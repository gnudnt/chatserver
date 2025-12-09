import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import MessageModel from "../models/Message";
import ConversationModel from "../models/Conversation";
import conversationRouter from "../routes/conversations";
import { upload } from "../middleware/upload"; 

dotenv.config({ path: path.join(__dirname, "../../.env") });

const app = express();
app.use(express.json());

// ⭐ ENABLE CORS CHO NEXT.JS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// ⭐ CHUẨN HÓA PATH UPLOAD (KHÔNG BAO GIỜ SAI)
const uploadsPath = path.join(process.cwd(), "actions", "uploads");
console.log("📁 STATIC UPLOAD PATH:", uploadsPath);

// ⭐ PHỤC VỤ FILE TỪ uploads
app.use("/uploads", express.static(uploadsPath));

// ⭐ API UPLOAD
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileUrl = `/uploads/${req.file.filename}`;

  console.log("📸 File saved:", fileUrl);

  return res.json({ url: fileUrl });
});

// REST API
app.use("/api/conversations", conversationRouter);

// HTTP SERVER
const server = http.createServer(app);

// 🚀 SOCKET.IO CONFIG
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
  allowEIO3: true,
});

// userId -> Set(socketId)
const onlineUsers: Map<string, Set<string>> = new Map();

io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);

  // REGISTER USER
  socket.on("registerUser", (userId: string) => {
    if (!userId) return;

    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId)!.add(socket.id);

    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
  });

  // JOIN ROOM
  socket.on("joinRoom", async (roomId: string) => {
    socket.join(roomId);
    console.log(`🟢 ${socket.id} joined room: ${roomId}`);

    const messages = await MessageModel.find({ roomId })
      .sort({ createdAt: 1 })
      .lean();

    socket.emit("loadMessages", messages);
  });

  // SEND MESSAGE
  socket.on("sendMessage", async (msg) => {
    try {
      const payload = {
        ...msg,
        createdAt: new Date(),
        readBy: [msg.userId],
      };

      const saved: any = await MessageModel.create(payload);

      const members = saved.roomId.split("_");
      await ConversationModel.findOneAndUpdate(
        { roomId: saved.roomId },
        {
          roomId: saved.roomId,
          members,
          lastMessage: saved.content || "📎 File",
          updatedAt: new Date(),
        },
        { upsert: true, new: true }
      );

      io.to(saved.roomId).emit("receiveMessage", saved);
    } catch (e) {
      console.error("sendMessage error:", e);
    }
  });

  // TYPING
  socket.on("typing", ({ roomId, userId }) => {
    socket.to(roomId).emit("typing", { roomId, userId });
  });

  // MARK AS READ
  socket.on("markAsRead", async ({ roomId, userId }) => {
    try {
      await MessageModel.updateMany(
        { roomId, readBy: { $ne: userId } },
        { $addToSet: { readBy: userId } }
      );
      io.to(roomId).emit("messagesRead", { roomId, userId });
    } catch (e) {
      console.error("markAsRead error:", e);
    }
  });

  // DISCONNECT
  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);

    for (const [uid, sockets] of onlineUsers.entries()) {
      if (sockets.has(socket.id)) {
        sockets.delete(socket.id);
        if (sockets.size === 0) onlineUsers.delete(uid);
      }
    }

    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
  });
});

// START SERVER
server.listen(process.env.PORT || 4000, () => {
  console.log(`🚀 Socket + Upload server running on ${process.env.PORT || 4000}`);
});

// MONGODB
(async () => {
  try {
    console.log("🔧 Connecting MongoDB...");
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("✅ MongoDB connected");
  } catch (e) {
    console.error("❌ MongoDB error:", e);
  }
})();
