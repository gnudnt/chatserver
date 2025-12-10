"use client";

import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import type { Message } from "@/hooks/useChat";

interface ChatContainerProps {
  userId: string;
  otherUserId: string;
  roomId: string;
  messages: Message[];
  onSendMessage: (content: string, images?: string[], fileUrl?: string) => void;
  uploadFile: (file: File) => Promise<string>;
  onlineUsers: string[];
  onSendReaction: (messageId: string, type: string) => void;
}

const REACTIONS = ["👍", "❤️", "😂", "😮", "😢", "😡"];

export default function ChatContainer({
  userId,
  otherUserId,
  roomId,
  messages,
  onSendMessage,
  uploadFile,
  onlineUsers,
  onSendReaction,
}: ChatContainerProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [openReactionFor, setOpenReactionFor] = useState<string | null>(null);
   const handleRightClick = (e: React.MouseEvent, messageId: string) => {
    e.preventDefault();
    setOpenReactionFor(messageId);
  };
  // Auto scroll bottom khi có message mới
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Click ra ngoài thì đóng reaction bar
  useEffect(() => {
    const handleClick = () => setOpenReactionFor(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const isOtherOnline = onlineUsers.includes(otherUserId);

  const lastMessage = messages[messages.length - 1];
  const isLastMine = lastMessage?.userId === userId;
  const isSeen =
    isLastMine && lastMessage?.readBy?.includes(otherUserId);

  return (
    <div className="flex h-full flex-col">
      {/* HEADER */}
      <div className="flex items-center gap-3 border-b border-[#3A3B3C] bg-[#242526] px-4 py-3">
        <div className="relative h-12 w-12 rounded-full bg-gray-500">
          {isOtherOnline && (
            <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-[#242526]" />
          )}
        </div>

        <div className="flex flex-col">
          <h3 className="text-base font-semibold">{otherUserId}</h3>

          <div className="flex items-center gap-1">
            {isOtherOnline ? (
              <>
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs text-green-400">Online</span>
              </>
            ) : (
              <>
                <span className="inline-block h-2 w-2 rounded-full bg-gray-400" />
                <span className="text-xs text-gray-400">Offline</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MESSAGE LIST */}
      <div className="flex-1 space-y-4 overflow-y-auto bg-[#18191A] p-4">
        {messages
          .filter((m) => m.roomId === roomId)
          .map((msg, idx, arr) => {
            const isMe = msg.userId === userId;

            const nextMsg = arr[idx + 1];
            const showAvatar =
              !isMe && (!nextMsg || nextMsg.userId !== msg.userId);

            const avatarSrc = `/avatars/${msg.userId}.png`;

            const reactions = msg.reactions ?? [];

            return (
              <div
                key={msg._id ?? idx}
                className={`flex gap-2 ${
                  isMe ? "justify-end" : "justify-start"
                }`}
              >
                {/* Avatar */}
                {!isMe ? (
                  showAvatar ? (
                    <img
                      src={avatarSrc}
                      className="h-6 w-6 rounded-full object-cover self-end mb-1"
                    />
                  ) : (
                    <div className="h-6 w-6" />
                  )
                ) : (
                  <div className="h-6 w-6" />
                )}

                {/* Nội dung tin nhắn */}
                <div className="flex max-w-[70%] flex-col relative">
                  {/* Bubble text */}
                  {msg.content && (
                    <div
                      className={`rounded-2xl px-4 py-2 shadow ${
                        isMe
                          ? "rounded-br-none bg-primary text-white"
                          : "rounded-bl-none bg-[#3A3B3C] text-white"
                      }`}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        if (!msg._id) return;
                        setOpenReactionFor(msg._id);
                      }}
                    >
                      {msg.content}
                    </div>
                  )}

                  {/* Images */}
                  {msg.images && msg.images.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {msg.images.map((img, k) => (
                        <img
                          key={k}
                          src={img}
                          className="max-h-[300px] max-w-[260px] cursor-pointer rounded-xl shadow"
                          onClick={() => window.open(img, "_blank")}
                          onContextMenu={(e) => handleRightClick(e, msg._id!)}
                          onLoad={() =>
                            bottomRef.current?.scrollIntoView({
                              behavior: "smooth",
                            })
                          }
                        />
                      ))}
                    </div>
                  )}

                  {/* File */}
                  {msg.fileUrl &&
                    (!msg.images || msg.images.length === 0) && (
                      <a
                        href={msg.fileUrl}
                        target="_blank"
                        className={`mt-2 rounded-lg px-3 py-2 text-sm shadow ${
                          isMe
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          if (!msg._id) return;
                          setOpenReactionFor(msg._id);
                        }}
                      >
                        📎 {msg.fileUrl.split("/").pop()}
                      </a>
                    )}

                  {/* Thanh chọn reaction (chuột phải) */}
                  {openReactionFor === msg._id && (
                    <div
                      className={`absolute -top-8 ${
                        isMe ? "right-0" : "left-0"
                      } flex gap-2 rounded-full bg-[#3A3B3C] px-3 py-1 shadow-lg`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {REACTIONS.map((r) => (
                        <span
                          key={r}
                          className="cursor-pointer text-xl hover:scale-125 transition"
                          onClick={() => {
                            if (!msg._id) return;
                            onSendReaction(msg._id, r);
                            setOpenReactionFor(null);
                          }}
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Reactions hiển thị dưới bubble */}
                  {reactions.length > 0 && (
                    <div
                      className={`mt-1 flex gap-1 ${
                        isMe ? "justify-end" : "justify-start"
                      }`}
                    >
                      {reactions.map((r, i) => (
                        <span
                          key={r.userId + "_" + r.type + "_" + i}
                          className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[#3A3B3C] text-sm"
                        >
                         {r.type}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Time */}
                  <p className="mt-1 text-[10px] text-gray-500">
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleTimeString()
                      : ""}
                  </p>
                </div>
              </div>
            );
          })}

        {/* SEEN STATUS */}
        {isLastMine && (
          <div className="pr-2 text-right text-xs text-gray-400">
            {isSeen ? "Đã xem" : "Đã gửi"}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <ChatInput
        sendMessage={onSendMessage}
        uploadFile={uploadFile}
        onTyping={() => {}}
      />
    </div>
  );
}
