import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import MessageModel from "./models/Message.js";
import ConversationModel from "./models/Conversation.js";


dotenv.config({ path: path.join(process.cwd(), ".env") });

const server = http.createServer();

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

// userId 
const onlineUsers = new Map();

// socketId 
const socketUserMap = new Map();

// socketId 
const userActiveRoom = new Map();

io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);

  // REGISTER USER
  socket.on("registerUser", (userId) => {
    if (!userId) return;

    socketUserMap.set(socket.id, userId);

    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId).add(socket.id);

    socket.join(userId);

    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
  });

  // JOIN ROOM
  socket.on("joinRoom", async (roomId) => {
    socket.join(roomId);
    console.log(`🟢 ${socket.id} joined room: ${roomId}`);

    userActiveRoom.set(socket.id, roomId);

    const messages = await MessageModel.aggregate([
      { $match: { roomId } },
      { $sort: { createdAt: -1 } },
      { $limit: 100 },
      { $sort: { createdAt: 1 } },
    ])

    socket.emit("loadMessages", messages);
  });

  // SEND MESSAGE
  socket.on("sendMessage", async (msg) => {
    try {
      const payload = {
        ...msg,
        replyTo: msg.replyTo ?? null,
        createdAt: new Date(),
        readBy: [msg.userId],
      };

      const saved = await MessageModel.create(payload);
      const members = saved.roomId.split("_");

      const convoBefore = await ConversationModel.findOne({
        roomId: saved.roomId,
      });

      const unreadUpdate = {};
      members.forEach((m) => {
        if (m === msg.userId) {
          unreadUpdate[`unread.${m}`] = 0;
        } else {
          const oldValue = convoBefore?.unread?.get(m) || 0;
          unreadUpdate[`unread.${m}`] = oldValue + 1;
        }
      });

      // auto-read if user active room
      const readers = [];
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

      // update sidebar member
      members.forEach((m) => {
        io.to(m).emit("conversationUpdated", {
          ...conversation.toObject(),
          unreadCount: conversation.unread?.get(m) || 0,
        });
      });

      io.to(saved.roomId).emit("receiveMessage", saved);

      // emit read event cho người đang mở room
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

  // REVOKE MESSAGE 
  socket.on("revokeMessage", async ({ messageId }) => {
    try {
      const userId = socketUserMap.get(socket.id);
      if (!userId) return;

      const msg = await MessageModel.findById(messageId);
      if (!msg) return;

      if (msg.userId !== userId) return;

      msg.isRevoked = true;
      msg.content = null;
      msg.images = [];
      msg.fileUrl = null;
      await msg.save();

      io.to(msg.roomId).emit("messageRevoked", {
        messageId: msg._id.toString(),
      });

      const latestMessage = await MessageModel.findOne({ roomId: msg.roomId })
        .sort({ createdAt: -1 })
        .lean();

      if (latestMessage && latestMessage._id.toString() === msg._id.toString()) {
        const convo = await ConversationModel.findOneAndUpdate(
          { roomId: msg.roomId },
          { lastMessage: "Tin nhắn đã bị thu hồi", updatedAt: new Date() },
          { new: true }
        );

        if (convo) {
          convo.members.forEach((m) => {
            io.to(m).emit("conversationUpdated", {
              ...convo.toObject(),
              unreadCount: convo.unread?.get(m) || 0,
            });
          });
        }
      }
    } catch (e) {
      console.error("revokeMessage error:", e);
    }
  });

  // EDIT MESSAGE
  socket.on("editMessage", async ({ messageId, content }) => {
    try {
      const userId = socketUserMap.get(socket.id);
      if (!userId) return;

      const msg = await MessageModel.findById(messageId);
      if (!msg) return;

      if (msg.userId !== userId) return;
      if (msg.isRevoked) return;

      msg.content = content;
      msg.isEdited = true;
      msg.editedAt = new Date();
      await msg.save();

      io.to(msg.roomId).emit("messageEdited", {
        _id: msg._id.toString(),
        content: msg.content,
        isEdited: true,
      });

      const latestMessage = await MessageModel.findOne({ roomId: msg.roomId })
        .sort({ createdAt: -1 })
        .lean();

      if (latestMessage && latestMessage._id.toString() === msg._id.toString()) {
        const convo = await ConversationModel.findOneAndUpdate(
          { roomId: msg.roomId },
          { lastMessage: `${content} (đã chỉnh sửa)`, updatedAt: new Date() },
          { new: true }
        );

        if (convo) {
          convo.members.forEach((m) => {
            io.to(m).emit("conversationUpdated", {
              ...convo.toObject(),
              unreadCount: convo.unread?.get(m) || 0,
            });
          });
        }
      }
    } catch (e) {
      console.error("editMessage error:", e);
    }
  });

  // PIN MESSAGE
  socket.on("pinMessage", async ({ messageId }) => {
    try {
      const userId = socketUserMap.get(socket.id);
      if (!userId) return;

      const msg = await MessageModel.findById(messageId);
      if (!msg) return;

      const roomId = msg.roomId;

      await MessageModel.updateMany(
        { roomId, isPinned: true },
        { $set: { isPinned: false, pinnedBy: null, pinnedAt: null } }
      );

      msg.isPinned = true;
      msg.pinnedBy = userId;
      msg.pinnedAt = new Date();
      await msg.save();

      io.to(roomId).emit("messagePinned", {
        messageId: msg._id.toString(),
        pinnedBy: userId,
        pinnedAt: msg.pinnedAt,
      });
    } catch (e) {
      console.error("pinMessage error:", e);
    }
  });

  // UNPIN MESSAGE
  socket.on("unpinMessage", async ({ messageId }) => {
    try {
      const userId = socketUserMap.get(socket.id);
      if (!userId) return;

      const msg = await MessageModel.findById(messageId);
      if (!msg || !msg.isPinned) return;

      const roomId = msg.roomId;

      msg.isPinned = false;
      msg.pinnedBy = null;
      msg.pinnedAt = null;
      await msg.save();

      io.to(roomId).emit("messageUnpinned", {
        messageId: msg._id.toString(),
      });
    } catch (e) {
      console.error("unpinMessage error:", e);
    }
  });

  // TYPING
  socket.on("typing", ({ roomId }) => {
    const userId = socketUserMap.get(socket.id);
    if (!userId) return;

    io.to(roomId).emit("typing", { roomId, userId });
  });

  socket.on("stopTyping", ({ roomId }) => {
    const userId = socketUserMap.get(socket.id);
    if (!userId) return;

    io.to(roomId).emit("stopTyping", { roomId, userId });
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

      io.to(roomId).emit("messagesRead", { roomId, userId });
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
      onlineUsers.get(userId).delete(socket.id);
      if (onlineUsers.get(userId).size === 0) {
        onlineUsers.delete(userId);
      }
    }

    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
  });
});

// START CHATSERVER
server.listen(process.env.CHATSERVER_PORT || 4000, () => {
  console.log(`🚀 Chatserver running on ${process.env.CHATSERVER_PORT || 4000}`);
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
