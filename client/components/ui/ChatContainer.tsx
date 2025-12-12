"use client";

import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import type { Message } from "@/hooks/useChat";
import { getSocket } from "@/utils/socketSingleton";

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

  // ⭐⭐⭐ TYPING STATE
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const socket = getSocket();

  const handleRightClick = (e: React.MouseEvent, messageId: string) => {
    e.preventDefault();
    setOpenReactionFor(messageId);
  };

  // Auto scroll bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Đóng reaction bar
  useEffect(() => {
    const close = () => setOpenReactionFor(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const isOtherOnline = onlineUsers.includes(otherUserId);

  const roomMessages = messages.filter((m) => m.roomId === roomId);
  const lastMessage = roomMessages[roomMessages.length - 1];

  const isLastMine = lastMessage?.userId === userId;
  const isSeen =
    isLastMine && lastMessage?.readBy?.includes(otherUserId);

  // ⭐⭐⭐ REALTIME SEEN
  useEffect(() => {
    const handler = ({
      roomId: rId,
      userId: reader,
    }: {
      roomId: string;
      userId: string;
    }) => {
      if (rId !== roomId) return;

      roomMessages.forEach((m) => {
        if (!m.readBy) m.readBy = [];
        if (!m.readBy.includes(reader)) {
          m.readBy.push(reader);
        }
      });
    };

    socket.on("messagesRead", handler);
    return () => socket.off("messagesRead", handler);
  }, [messages, roomId]);

  // ⭐⭐⭐ REALTIME TYPING — FIX
  useEffect(() => {
    const handleTyping = ({
      roomId: r,
      userId: typingUser,
    }: {
      roomId: string;
      userId: string;
    }) => {

      // ❗ CHỈ hiện khi:
      // - đúng phòng
      // - người kia đang nhập (không phải mình)
      if (r !== roomId) return;
      if (typingUser !== otherUserId) return;

      setIsTyping(true);

      if (typingTimeout.current) clearTimeout(typingTimeout.current);
      typingTimeout.current = setTimeout(() => setIsTyping(false), 1800);
    };

    const handleStopTyping = ({
      roomId: r,
      userId: typingUser,
    }: {
      roomId: string;
      userId: string;
    }) => {
      if (r !== roomId) return;
      if (typingUser !== otherUserId) return;

      setIsTyping(false);
    };

    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
  }, [roomId, otherUserId]); // FIX dependency lỗi React

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

          {isTyping ? (
            <span className="text-xs text-blue-400">Đang nhập...</span>
          ) : (
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
          )}
        </div>
      </div>

      {/* MESSAGE LIST */}
      <div className="flex-1 space-y-4 overflow-y-auto bg-[#18191A] p-4">
        {roomMessages.map((msg, idx, arr) => {
          const isMe = msg.userId === userId;

          const nextMsg = arr[idx + 1];
          const showAvatar =
            !isMe && (!nextMsg || nextMsg.userId !== msg.userId);

          const avatarSrc = `/avatars/${msg.userId}.png`;

          const reactions = msg.reactions ?? [];

          return (
            <div
              key={msg._id ?? idx}
              className={`flex gap-2 ${isMe ? "justify-end" : "justify-start"}`}
            >
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

              <div className="flex max-w-[70%] flex-col relative">
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
          <div className="pr-2 text-right text-xs text-gray-400 flex items-center justify-end gap-1">
            {isSeen ? (
              <>
                <img
                  src={`/avatars/${otherUserId}.png`}
                  className="h-4 w-4 rounded-full object-cover"
                />
                <span>Đã xem</span>
              </>
            ) : (
              <span>Đã gửi</span>
            )}
          </div>
        )}

        {/* ⭐⭐⭐ TYPING BUBBLE TRONG KHUNG CHAT — KIỂU MESSENGER */}
{isTyping && (
  <div className="flex items-end gap-2 mb-2">

    {/* Avatar người kia */}
    <img
      src={`/avatars/${otherUserId}.png`}
      className="h-6 w-6 rounded-full object-cover mb-1"
    />

    {/* Bubble 3 chấm */}
    <div className="bg-[#3A3B3C] text-white px-4 py-2 rounded-2xl rounded-bl-none shadow flex items-center gap-1">
      <span className="inline-block w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
      <span className="inline-block w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></span>
      <span className="inline-block w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-300"></span>
    </div>

  </div>
)}

        <div ref={bottomRef} />
      </div>

      {/* CHAT INPUT */}
      <ChatInput
        sendMessage={onSendMessage}
        uploadFile={uploadFile}
        roomId={roomId}
      />
    </div>
  );
}
