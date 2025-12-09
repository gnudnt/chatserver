"use client";

import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import { Message } from "@/hooks/useChat";

interface ChatContainerProps {
  userId: string;
  otherUserId: string;
  roomId: string;
  messages: Message[];
  onSendMessage: (content: string, images?: string[], fileUrl?: string) => void;
  uploadFile: (file: File) => Promise<string>;
  typingUser: string | null;
  onlineUsers: string[];
  sendTyping: () => void;
}

export default function ChatContainer({
  userId,
  otherUserId,
  roomId,
  messages,
  onSendMessage,
  uploadFile,
  typingUser,
  onlineUsers,
  sendTyping,
}: ChatContainerProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // ⭐ Thêm state này để scroll lại khi ảnh load xong
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Scroll mỗi khi messages thay đổi
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ⭐ Scroll thêm lần nữa khi ảnh load xong
  useEffect(() => {
    if (imagesLoaded > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setImagesLoaded(0);
    }
  }, [imagesLoaded]);

  const isOtherOnline = onlineUsers.includes(otherUserId);

  const lastMessage = messages[messages.length - 1];
  const isLastMine = lastMessage?.userId === userId;

  const isSeen =
    lastMessage?.readBy?.includes(otherUserId) &&
    lastMessage?.userId === userId;

  return (
    <div className="flex flex-col h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
        <div>
          <h3 className="text-lg font-semibold">{otherUserId}</h3>
          <span className="text-xs">
            {isOtherOnline ? (
              <span className="text-green-500">● Online</span>
            ) : (
              <span className="text-gray-400">● Offline</span>
            )}
          </span>
        </div>

        {typingUser === otherUserId && (
          <div className="flex items-center gap-1">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        )}
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, i) => {
          const isMe = msg.userId === userId;

          return (
            <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className="flex flex-col max-w-[70%]">
                {/* Text bubble */}
                {msg.content && (
                  <div
                    className={`px-4 py-2 rounded-2xl shadow ${
                      isMe
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none border"
                    }`}
                  >
                    {msg.content}
                  </div>
                )}

                {/* IMAGE display */}
                {msg.images && msg.images.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {msg.images.map((img, k) => (
                      <img
                        key={k}
                        src={img}
                        className="max-w-[260px] max-h-[300px] rounded-xl shadow cursor-pointer"
                        onClick={() => window.open(img, "_blank")}

                        // ⭐⭐ THE FIX: scroll khi ảnh load xong
                        onLoad={() => setImagesLoaded((prev) => prev + 1)}
                      />
                    ))}
                  </div>
                )}

                {/* FILE display */}
                {msg.fileUrl &&
                  (!msg.images || msg.images.length === 0) && (
                    <a
                      href={msg.fileUrl}
                      target="_blank"
                      className={`mt-2 px-3 py-2 rounded-lg text-sm shadow ${
                        isMe ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      📎 {msg.fileUrl.split("/").pop()}
                    </a>
                  )}

                {/* TIME */}
                <p className="text-[10px] text-gray-500 mt-1">
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString() : ""}
                </p>
              </div>
            </div>
          );
        })}

        {/* SEEN STATUS */}
        {isLastMine && (
          <div className="text-right text-xs text-gray-500 pr-2">
            {isSeen ? "Đã xem" : "Đã gửi"}
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* INPUT */}
      <ChatInput
        sendMessage={onSendMessage}
        uploadFile={uploadFile}
        onTyping={sendTyping}
      />
    </div>
  );
}
