"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

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

  // Tạo socket 
  useEffect(() => {
    if (socketRef.current) return;

    const socket = io("http://localhost:4000", {
      transports: ["websocket", "polling"],
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🔌 Socket connected:", socket.id);
    });

    socket.on("onlineUsers", (users: string[]) => {
      setOnlineUsers(users);
    });

    socket.on("loadMessages", (msgs: Message[]) => {
      setMessages(msgs);
    });

    socket.on("receiveMessage", (msg: Message) => {
      if (msg.roomId === currentRoom.current) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    // cập nhật reaction
    socket.on("reactionUpdated", (msg: Message) => {
      setMessages((prev) =>
        prev.map((m) => (m._id === msg._id ? msg : m))
      );
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connect_error:", err.message);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  // Đăng ký user với server
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !userId) return;

    console.log("📌 REGISTER USER:", userId);
    socket.emit("registerUser", userId);

    if (currentRoom.current) {
      socket.emit("joinRoom", currentRoom.current);
    }
  }, [userId]);

  // Join room
  const joinRoom = useCallback((roomId: string) => {
    const socket = socketRef.current;
    if (!socket || !roomId) return;

    currentRoom.current = roomId;
    setMessages([]);
    socket.emit("joinRoom", roomId);
  }, []);

  // Gửi tin nhắn
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
    },
    [userId]
  );

  // ⭐ gửi reaction
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

  // Upload file 
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
    uploadFile,
    sendReaction,
  };
}
