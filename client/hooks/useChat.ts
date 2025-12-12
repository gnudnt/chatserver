"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { getSocket } from "@/utils/socketSingleton";

export interface Message {
  _id?: string;
  content?: string;
  userId: string;
  roomId: string;
  images?: string[];
  fileUrl?: string;
  createdAt?: string;
  readBy?: string[];
  reactions?: { userId: string; type: string }[];
}

export function useChat(userId?: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const socketRef = useRef<Socket | null>(null);
  const currentRoom = useRef<string>("");

  // 🔵 Tạo socket chung
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = getSocket();
    }
    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("🔌 Socket connected:", socket.id);
    });

    socket.on("onlineUsers", (users: string[]) => {
      setOnlineUsers(users);
    });

    socket.on("loadMessages", (msgs: Message[]) => {
      setMessages(msgs);
    });

    // ⭐ TRÁNH TRÙNG TIN
    socket.on("receiveMessage", (msg: Message) => {
      if (msg.roomId !== currentRoom.current) return;

      setMessages((prev) => {
        const exists = prev.some((m) => m._id === msg._id);
        if (exists) return prev;
        return [...prev, msg];
      });
    });

    socket.on("reactionUpdated", (msg: Message) => {
      setMessages((prev) =>
        prev.map((m) => (m._id === msg._id ? msg : m))
      );
    });

    // ⭐⭐⭐ REALTIME ĐÃ XEM
    socket.on("messagesRead", ({ roomId, userId: reader }) => {
      if (roomId !== currentRoom.current) return;

      setMessages((prev) =>
        prev.map((msg) =>
          msg.roomId === roomId
            ? {
                ...msg,
                readBy: msg.readBy?.includes(reader)
                  ? msg.readBy
                  : [...(msg.readBy || []), reader],
              }
            : msg
        )
      );
    });

    return () => {
      socket.off("onlineUsers");
      socket.off("loadMessages");
      socket.off("receiveMessage");
      socket.off("reactionUpdated");
      socket.off("messagesRead");
    };
  }, []);

  // 🔵 Đăng ký user
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !userId) return;

    socket.emit("registerUser", userId);

    if (currentRoom.current) {
      socket.emit("joinRoom", currentRoom.current);
    }
  }, [userId]);

  // 🔵 Join room
  const joinRoom = useCallback((roomId: string) => {
    const socket = socketRef.current;
    if (!socket || !roomId) return;

    currentRoom.current = roomId;
    socket.emit("joinRoom", roomId);
  }, []);

  // 🔵 Gửi tin nhắn
  const sendMessage = useCallback(
    (content: string, images?: string[], fileUrl?: string) => {
      const socket = socketRef.current;
      if (!socket || !currentRoom.current || !userId) return;

      if (!content && !images?.length && !fileUrl) return;

      socket.emit("sendMessage", {
        content,
        images: images || [],
        fileUrl: fileUrl || "",
        userId,
        roomId: currentRoom.current,
      });

      // ⭐ Khi gửi xong → stopTyping
      socket.emit("stopTyping", {
        roomId: currentRoom.current,
        userId,
      });
    },
    [userId]
  );

  // 🔵 Gửi reaction
  const sendReaction = useCallback(
    (messageId: string, type: string) => {
      const socket = socketRef.current;
      if (!socket || !userId) return;

      socket.emit("sendReaction", {
        messageId,
        userId,
        type,
      });
    },
    [userId]
  );

  // ⭐⭐⭐ TÍNH NĂNG MỚI — TYPING ⭐⭐⭐

  const sendTyping = useCallback(
    (roomId: string) => {
      const socket = socketRef.current;
      if (!socket || !userId) return;

      socket.emit("typing", {
        roomId,
        userId,
      });
    },
    [userId]
  );

  const sendStopTyping = useCallback(
    (roomId: string) => {
      const socket = socketRef.current;
      if (!socket || !userId) return;

      socket.emit("stopTyping", {
        roomId,
        userId,
      });
    },
    [userId]
  );

  // 🔵 Upload file
  const uploadFile = useCallback(async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:4000/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok || !data?.url) {
      throw new Error(data?.error || "Upload failed");
    }

    return `http://localhost:4000${data.url}`;
  }, []);

  return {
    messages,
    onlineUsers,
    joinRoom,
    sendMessage,
    sendReaction,
    uploadFile,

    // ⭐⭐ EXPORT TYPING API
    sendTyping,
    sendStopTyping,
  };
}
