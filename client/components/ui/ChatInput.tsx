"use client";

import { useRef, useState, useEffect } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

interface ChatInputProps {
  sendMessage: (content: string, images?: string[], fileUrl?: string) => void;
  uploadFile: (file: File) => Promise<string>; 
  onTyping: () => void;
}

export default function ChatInput({
  sendMessage,
  uploadFile,
  onTyping,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewName, setPreviewName] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);

  // Ẩn emoji khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setShowEmoji(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ------------------------------
  // GỬI TIN NHẮN
  // ------------------------------
  const handleSend = () => {
    if (previewUrl && previewName) {
      const isImage = previewName.match(/\.(jpg|jpeg|png|gif|webp|bmp)$/i);

      if (isImage) {
        sendMessage(message.trim(), [previewUrl]);
      } else {
        sendMessage(message.trim(), undefined, previewUrl);
      }

      setPreviewUrl(null);
      setPreviewName(null);
      setMessage("");
      return;
    }

    if (!message.trim()) return;
    sendMessage(message.trim());
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onTyping();
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ------------------------------
  // UPLOAD FILE (DÙNG uploadFile props)
  // ------------------------------
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setPreviewName(file.name);

    try {
      const url = await uploadFile(file);   // <— SỬ DỤNG uploadFile ĐÃ FIX
      setPreviewUrl(url);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    }

    e.target.value = ""; // reset input
  };

  return (
    <div className="flex flex-col gap-2 p-2 border-t border-border bg-card relative">

      {/* Preview ảnh/file */}
      {previewUrl && (
        <div className="flex items-center gap-2 px-2">
          {previewName?.match(/\.(jpg|jpeg|png|gif|webp|bmp)$/i) ? (
            <img
              src={previewUrl}
              alt="preview"
              className="max-h-24 rounded-md object-contain"
            />
          ) : (
            <div className="px-3 py-2 rounded bg-secondary text-xs text-white">
              📎 {previewName}
            </div>
          )}

          <button
            onClick={() => {
              setPreviewUrl(null);
              setPreviewName(null);
            }}
            className="text-xs text-red-500"
          >
            Hủy
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Emoji button */}
        <button
          onClick={() => setShowEmoji((prev) => !prev)}
          className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-secondary"
        >
          😀
        </button>

        {/* Input chat */}
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            onTyping();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Nhập tin nhắn..."
          className="flex-1 px-4 py-2 rounded-full border border-border outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileRef}
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Upload button */}
        <button
          onClick={() => fileRef.current?.click()}
          className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-secondary"
        >
          📎
        </button>

        {/* Send button */}
        <button
          onClick={handleSend}
          className="h-10 w-10 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary/90"
        >
          ➤
        </button>

        {/* Emoji picker */}
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
