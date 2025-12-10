"use client";

import { useState } from "react";
import { useChatContext } from "@/hooks/ChatContext";
import { useChat } from "@/hooks/useChat";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

const USERS = ["Alice", "Bob", "Charlie"];

export default function ChatPageContent() {
  const { userId, setUserId } = useChatContext();
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  
  const chat = useChat(userId);

  
  if (!userId) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-[#18191A] text-white">
        <div className="flex flex-col gap-4 rounded-xl bg-[#242526] p-6 shadow-lg">
          <h2 className="mb-2 text-center text-xl font-semibold">
            Chọn tài khoản để đăng nhập chat
          </h2>
          <div className="flex gap-3">
            {USERS.map((u) => (
              <button
                key={u}
                onClick={() => {
                  setUserId(u);
                  setActiveRoom(null);
                }}
                className="flex-1 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
              >
                {u}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#18191A] text-white">
      {/* Sidebar */}
      <Sidebar
        currentUser={userId}
        onlineUsers={chat.onlineUsers}
        activeRoom={activeRoom}
        onSelectRoom={setActiveRoom}
      />

      {/* Khung chat */}
      <ChatWindow
        roomId={activeRoom}
        userId={userId}
        messages={chat.messages}
        joinRoom={chat.joinRoom}
        sendMessage={chat.sendMessage}
        uploadFile={chat.uploadFile}
        onlineUsers={chat.onlineUsers}
        sendReaction={chat.sendReaction}
      />
    </div>
  );
}
