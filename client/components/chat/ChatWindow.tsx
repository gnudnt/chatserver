"use client";

import { useEffect } from "react";
import ChatContainer from "../ui/ChatContainer";
import type { Message } from "@/hooks/useChat";

interface ChatWindowProps {
  roomId: string | null;
  userId: string;
  messages: Message[];
  joinRoom: (roomId: string) => void;
  sendMessage: (content: string, images?: string[], fileUrl?: string) => void;
  uploadFile: (file: File) => Promise<string>;
  onlineUsers: string[];
  sendReaction: (messageId: string, type: string) => void;
}

export default function ChatWindow({
  roomId,
  userId,
  messages,
  joinRoom,
  sendMessage,
  uploadFile,
  onlineUsers,
  sendReaction,
}: ChatWindowProps) {
  useEffect(() => {
    if (!roomId) return;
    joinRoom(roomId);
  }, [roomId, joinRoom]);

  if (!roomId) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#18191A] text-gray-400">
        Chọn 1 đoạn chat để bắt đầu
      </div>
    );
  }

  const otherUser = roomId.split("_").find((x) => x !== userId) ?? "";

  return (
    <div className="flex-1 bg-[#18191A] text-white">
      <ChatContainer
        userId={userId}
        otherUserId={otherUser}
        roomId={roomId}
        messages={messages}
        onSendMessage={sendMessage}
        uploadFile={uploadFile}
        onlineUsers={onlineUsers}
        onSendReaction={sendReaction}
      />
    </div>
  );
}
