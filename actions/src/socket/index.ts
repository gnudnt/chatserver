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

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Static uploads
const uploadsPath = path.join(process.cwd(), "actions", "uploads");
console.log("📁 STATIC UPLOAD PATH:", uploadsPath);
app.use("/uploads", express.static(uploadsPath));

// API upload file
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

// HTTP server
const server = http.createServer(app);

// Socket.io
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

// ⭐ socketId -> userId (để biết ai đang gõ)
const socketUserMap: Map<string, string> = new Map();

// ⭐ socketId -> roomId
const userActiveRoom: Map<string, string> = new Map();

io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);

  // REGISTER USER
  socket.on("registerUser", (userId: string) => {
    if (!userId) return;

    socketUserMap.set(socket.id, userId); // ⭐ LƯU USER ID THẬT

    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId)!.add(socket.id);

    socket.join(userId);

    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
  });

  // JOIN ROOM
  socket.on("joinRoom", async (roomId: string) => {
    socket.join(roomId);
    console.log(`🟢 ${socket.id} joined room: ${roomId}`);

    userActiveRoom.set(socket.id, roomId);

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

      const convoBefore = await ConversationModel.findOne({ roomId: saved.roomId });

      const unreadUpdate: any = {};
      members.forEach((m: string) => {
        if (m === msg.userId) {
          unreadUpdate[`unread.${m}`] = 0;
        } else {
          const oldValue = convoBefore?.unread?.get(m) || 0;
          unreadUpdate[`unread.${m}`] = oldValue + 1;
        }
      });

      const readers: string[] = [];
      for (const user of members) {
        if (user === msg.userId) continue;

        const sockets = onlineUsers.get(user);
        if (!sockets) continue;

        for (const sid of sockets) {
          if (userActiveRoom.get(sid) === saved.roomId) {
            readers.push(user);
          }
        }
      }

      if (readers.length > 0) {
        await MessageModel.updateMany(
          { roomId: saved.roomId },
          { $addToSet: { readBy: { $each: readers } } }
        );

        readers.forEach((u) => {
          unreadUpdate[`unread.${u}`] = 0;
        });
      }

      const conversation = await ConversationModel.findOneAndUpdate(
        { roomId: saved.roomId },
        {
          roomId: saved.roomId,
          members,
          lastMessage: saved.content || "📎 File",
          updatedAt: new Date(),
          ...unreadUpdate,
        },
        { upsert: true, new: true }
      );

      members.forEach((m: string) => {
        io.to(m).emit("conversationUpdated", {
          ...conversation.toObject(),
          unreadCount: conversation.unread?.get(m) || 0,
        });
      });

      io.to(saved.roomId).emit("receiveMessage", saved);

      readers.forEach((u) => {
        io.to(saved.roomId).emit("messagesRead", {
          roomId: saved.roomId,
          userId: u,
        });
      });

    } catch (e) {
      console.error("sendMessage error:", e);
    }
  });

  // REACTION
  socket.on("sendReaction", async ({ messageId, userId, type }) => {
    try {
      const msg = await MessageModel.findById(messageId);
      if (!msg) return;

      const existing = msg.reactions.find((r) => r.userId === userId);

      if (existing) {
        if (existing.type === type) {
          msg.reactions = msg.reactions.filter((r) => r.userId !== userId);
        } else {
          existing.type = type;
        }
      } else {
        msg.reactions.push({ userId, type });
      }

      await msg.save();

      io.to(msg.roomId).emit("reactionUpdated", msg.toObject());
    } catch (e) {
      console.error("sendReaction error:", e);
    }
  });

  // ⭐⭐⭐⭐⭐ TYPING — FIXED TO USE REAL USER ID
  socket.on("typing", ({ roomId }) => {
    const userId = socketUserMap.get(socket.id);
    if (!userId) return;

    io.to(roomId).emit("typing", {
      roomId,
      userId, // ✔ gửi userId thật
    });
  });

  socket.on("stopTyping", ({ roomId }) => {
    const userId = socketUserMap.get(socket.id);
    if (!userId) return;

    io.to(roomId).emit("stopTyping", {
      roomId,
      userId, // ✔ gửi userId thật
    });
  });

  // MARK AS READ
  socket.on("markAsRead", async ({ roomId, userId }) => {
    try {
      await MessageModel.updateMany(
        { roomId, readBy: { $ne: userId } },
        { $addToSet: { readBy: userId } }
      );

      const updated = await ConversationModel.findOneAndUpdate(
        { roomId },
        { $set: { [`unread.${userId}`]: 0 } },
        { new: true }
      );

      if (updated) {
        io.to(userId).emit("conversationUpdated", {
          ...updated.toObject(),
          unreadCount: 0,
        });
      }

      io.to(roomId).emit("messagesRead", {
        roomId,
        userId,
      });

    } catch (e) {
      console.error("markAsRead error:", e);
    }
  });

  // DISCONNECT
  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);

    const userId = socketUserMap.get(socket.id);
    socketUserMap.delete(socket.id);
    userActiveRoom.delete(socket.id);

    if (userId && onlineUsers.has(userId)) {
      onlineUsers.get(userId)!.delete(socket.id);
      if (onlineUsers.get(userId)!.size === 0) {
        onlineUsers.delete(userId);
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
