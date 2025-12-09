"use client";

import { useEffect, useRef, useState } from "react";
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
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const socketRef = useRef<Socket | null>(null);
  const currentRoom = useRef<string>("");

  useEffect(() => {
    if (socketRef.current) return;

    const socket = io("http://localhost:4000", {
      transports: ["websocket", "polling"], // ❗ QUAN TRỌNG
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🔌 Connected:", socket.id);
    });

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    socket.on("loadMessages", (msgs) => {
      setMessages(msgs);
    });

    socket.on("receiveMessage", (msg) => {
      if (msg.roomId === currentRoom.current) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    socket.on("typing", ({ userId }) => {
      setTypingUser(userId);
      setTimeout(() => setTypingUser(null), 1200);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connect_error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // REGISTER USER
  useEffect(() => {
    if (socketRef.current && userId) {
      socketRef.current.emit("registerUser", userId);
      console.log("📌 REGISTER:", userId);
    }
  }, [userId]);

  const selectUser = (u: string) => setUserId(u);

  const joinRoom = (roomId: string) => {
    if (!socketRef.current) return;

    currentRoom.current = roomId;
    setMessages([]);

    socketRef.current.emit("joinRoom", roomId);
  };

  const sendMessage = (content: string, images?: string[], fileUrl?: string) => {
    if (!socketRef.current || !currentRoom.current) return;

    socketRef.current.emit("sendMessage", {
      content,
      images: images || [],
      fileUrl: fileUrl || "",
      userId,
      roomId: currentRoom.current,
    });
  };

  const sendTyping = () => {
    if (!socketRef.current || !currentRoom.current) return;

    socketRef.current.emit("typing", {
      roomId: currentRoom.current,
      userId,
    });
  };

  return {
    userId,
    messages,
    typingUser,
    onlineUsers,
    selectUser,
    joinRoom,
    sendMessage,
    sendTyping,
  };
}
