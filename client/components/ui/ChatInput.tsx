"use client";

import { useRef, useState, useEffect } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { getSocket } from "@/utils/socketSingleton";

/* TYPE FOR REPLY (NEW)*/
export interface ReplyPreview {
  messageId: string;
  userId: string;
  content?: string;
  images?: string[];
  fileUrl?: string;
}

interface ChatInputProps {
  sendMessage: (
    content: string,
    images?: string[],
    fileUrl?: string,
    replyTo?: ReplyPreview | null // ✅ ADD
  ) => void;
  uploadFile: (file: File) => Promise<string>;
  roomId?: string;

  // ✅ ADD — nhận từ ChatContainer
  replyingMessage?: ReplyPreview | null;
  clearReply?: () => void;
}

export default function ChatInput({
  sendMessage,
  uploadFile,
  roomId,
  replyingMessage,
  clearReply,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewName, setPreviewName] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const socket = getSocket();

  /*  EMOJI CLOSE (GIỮ NGUYÊN)*/
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setShowEmoji(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ RESET REPLY KHI ĐỔI ROOM
useEffect(() => {
  clearReply?.();
}, [roomId]);

  /* YPING EVENT (GIỮ NGUYÊN)*/
  const emitTyping = () => {
    if (!roomId) return;

    socket.emit("typing", { roomId });

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit("stopTyping", { roomId });
    }, 2000);
  };

  /*  SEND MESSAGE (CHỈ THÊM replyTo) */
  const handleSend = () => {
    if (roomId) socket.emit("stopTyping", { roomId });

    if (previewUrl && previewName) {
      const isImage = previewName.match(/\.(jpg|jpeg|png|gif|webp|bmp)$/i);

      sendMessage(
        message.trim(),
        isImage ? [previewUrl] : [],
        isImage ? undefined : previewUrl,
        replyingMessage ?? null // ✅ ADD
      );

      setPreviewUrl(null);
      setPreviewName(null);
      setMessage("");
      clearReply?.(); // ✅ reset reply
      return;
    }

if (!message.trim() && !previewUrl) return;

    sendMessage(message.trim(), undefined, undefined, replyingMessage ?? null);
    setMessage("");
    clearReply?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    emitTyping();

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* UPLOAD FILE (GIỮ NGUYÊN)*/
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setPreviewName(file.name);

    try {
      const url = await uploadFile(file);
      setPreviewUrl(url);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    }

    e.target.value = "";
  };

  return (
    <div className="flex flex-col gap-2 p-2 border-t border-gray-700 bg-[#242526] relative">

      {/*  REPLY PREVIEW (NEW) */}
      {replyingMessage && (
        <div className="flex items-start justify-between rounded-lg bg-[#3A3B3C] px-3 py-2 text-sm text-white">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-blue-400">
              Đang trả lời {replyingMessage.userId}
            </span>

            {replyingMessage.content && (
              <span className="line-clamp-1 text-gray-200">
                {replyingMessage.content}
              </span>
            )}

            {replyingMessage.images?.length ? (
              <span className="text-xs italic text-gray-300">📷 Ảnh</span>
            ) : replyingMessage.fileUrl ? (
              <span className="text-xs italic text-gray-300">📎 File</span>
            ) : null}
          </div>

          <button
            onClick={clearReply}
            className="ml-2 text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/*  PREVIEW FILE (GIỮ NGUYÊN)  */}
      {previewUrl && (
        <div className="flex items-center gap-2 px-2">
          {previewName?.match(/\.(jpg|jpeg|png|gif|webp|bmp)$/i) ? (
            <img
              src={previewUrl}
              alt="preview"
              className="max-h-24 rounded-md object-contain"
            />
          ) : (
            <div className="px-3 py-2 rounded bg-gray-600 text-xs text-white">
              📎 {previewName}
            </div>
          )}

          <button
            onClick={() => {
              setPreviewUrl(null);
              setPreviewName(null);
            }}
            className="text-xs text-red-400 hover:underline"
          >
            Hủy
          </button>
        </div>
      )}

      {/*  INPUT BAR (GIỮ NGUYÊN) */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowEmoji((prev) => !prev)}
          className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-600"
        >
          😀
        </button>

        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            emitTyping();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Nhập tin nhắn..."
          className="flex-1 px-4 py-2 rounded-full bg-[#3A3B3C] text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input type="file" ref={fileRef} className="hidden" onChange={handleFileChange} />

        <button
          onClick={() => fileRef.current?.click()}
          className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-600"
        >
          📎
        </button>

        <button
          onClick={handleSend}
          className="h-10 w-10 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          ➤
        </button>

        {showEmoji && (
          <div ref={emojiRef} className="absolute bottom-12 left-2 z-50">
            <Picker
              data={data}
              onEmojiSelect={(emoji: any) =>
                setMessage((prev) => prev + emoji.native)
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
