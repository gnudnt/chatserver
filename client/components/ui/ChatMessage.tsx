"use client";

import { useRef, useEffect, useState } from "react";
import { useChat } from "@/hooks/useChat";

interface ChatMessagesProps {
  className?: string;
}

export default function ChatMessages({ className }: ChatMessagesProps) {
  const { messages, userId } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Scroll xuống cuối khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Scroll sau khi ảnh load xong
  useEffect(() => {
    if (imagesLoaded > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setImagesLoaded(0);
    }
  }, [imagesLoaded]);

  return (
    <div className={`flex-1 overflow-y-auto p-4 ${className}`}>
      <div className="space-y-4 max-w-3xl mx-auto">
        {messages.map((msg) => {
          const isOwn = userId === msg.userId;
          return (
            <div
              key={msg._id}
              className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-2 max-w-[70%] ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
                {!isOwn && (
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0 self-end mb-1">
                    {msg.fullName?.[0] || "U"}
                  </div>
                )}

                <div>
                  {/* Tin nhắn text */}
                  {msg.content && (
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        isOwn
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-secondary text-foreground rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  )}

                  {/* Hình ảnh */}
                  {msg.images && msg.images.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {msg.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`Uploaded image ${idx + 1}`}
                          className="max-w-[300px] max-h-[400px] rounded-lg object-contain cursor-pointer hover:opacity-90 transition-opacity"
                          onLoad={() => setImagesLoaded((prev) => prev + 1)}
                          onClick={() => window.open(img, "_blank")}
                        />
                      ))}
                    </div>
                  )}

                  {/* File */}
                  {msg.fileUrl && !msg.fileUrl.match(/\.(jpg|jpeg|png|gif|webp|bmp)$/i) && (
                    <a
                      href={msg.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 mt-2 px-3 py-2 rounded-lg transition-colors ${
                        isOwn
                          ? "bg-primary/20 text-primary-foreground hover:bg-primary/30"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      <span>📎</span>
                      <span className="text-sm font-medium truncate max-w-[200px]">
                        {msg.fileUrl.split("/").pop()?.replace(/^[^-]+-/, "") || "File"}
                      </span>
                    </a>
                  )}

                  {/* Thời gian */}
                  <p className={`text-[10px] text-muted-foreground mt-1 ${isOwn ? "text-right" : "text-left"}`}>
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString() : ""}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
