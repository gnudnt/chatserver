"use client";

import { useState } from "react";
import ChatContainer from "@/components/ui/ChatContainer";
import { useChat } from "@/hooks/useChat";
import { uploadFile } from "@/lib/uploadFile";   

const USERS = ["Alice", "Bob", "Charlie"];

export default function ChatPage() {
  const {
    selectUser,
    joinRoom,
    userId,
    messages,
    sendMessage,
    sendTyping,
    typingUser,
    onlineUsers,
  } = useChat();

  const [currentUser, setCurrentUser] = useState("");
  const [otherUser, setOtherUser] = useState("");

  const makeRoomId = (a: string, b: string) => [a, b].sort().join("_");

  // STEP 1 — chọn user hiện tại
  if (!currentUser)
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h2 className="text-xl font-semibold">Chọn bạn là ai?</h2>

        {USERS.map((u) => (
          <button
            key={u}
            onClick={() => {
              selectUser(u);
              setTimeout(() => setCurrentUser(u), 200);
            }}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            {u}
          </button>
        ))}
      </div>
    );

  // STEP 2 — chọn người để chat
  if (!otherUser)
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h2 className="text-xl font-semibold">Bạn muốn chat với ai?</h2>

        {USERS.filter((u) => u !== currentUser).map((u) => (
          <button
            key={u}
            onClick={() => {
              const room = makeRoomId(currentUser, u);
              setOtherUser(u);

              setTimeout(() => joinRoom(room), 300);
            }}
            className="px-4 py-2 bg-secondary text-white rounded"
          >
            {u}
          </button>
        ))}
      </div>
    );

  // STEP 3 — giao diện chat
  return (
    <ChatContainer
      userId={currentUser}
      otherUserId={otherUser}
      roomId={makeRoomId(currentUser, otherUser)}
      messages={messages}
      onSendMessage={sendMessage}
      uploadFile={uploadFile}    
      typingUser={typingUser}
      onlineUsers={onlineUsers}
      sendTyping={sendTyping}
    />
  );
}
