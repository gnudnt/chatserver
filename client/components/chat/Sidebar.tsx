"use client";

import { useEffect, useMemo, useState } from "react";
import { useConversations } from "@/hooks/useConversations";
import ConversationItem from "./ConversationItem";

interface SidebarProps {
  currentUser: string;
  onlineUsers: string[];
  activeRoom: string | null;
  onSelectRoom: (roomId: string) => void;
}

// 🔤 normalize: lowercase + bỏ dấu
function normalize(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// 🔍 tách từng từ (đã normalize)
function splitWords(str: string) {
  return normalize(str).split(/\s+/);
}

const RECENT_KEY = "recent_chat_searches";

export default function Sidebar({
  currentUser,
  onlineUsers,
  activeRoom,
  onSelectRoom,
}: SidebarProps) {
  const { conversations } = useConversations(currentUser, activeRoom);

  // 🔍 SEARCH STATE
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // 🔁 LOAD RECENT SEARCH
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_KEY);
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // 💾 SAVE RECENT SEARCH
  const saveRecent = (name: string) => {
    if (!name) return;
  if (name === currentUser) return; 
    setRecentSearches((prev) => {
      const updated = [
        name,
        ...prev.filter((n) => n !== name),
      ].slice(0, 5);

      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // 🔍 FILTER CONVERSATIONS
  const filteredConversations = useMemo(() => {
    if (!search.trim()) return conversations;

    const keyword = normalize(search);

    return conversations.filter((convo) => {
      const other =
        convo.members.find((m) => m !== currentUser) || "";

      const words = splitWords(other);

      // ✅ match nếu BẤT KỲ từ nào bắt đầu bằng keyword
      return words.some((word) => word.startsWith(keyword));
    });
  }, [search, conversations, currentUser]);

  return (
    <div className="w-[260px] bg-[#18191A] border-r border-[#3A3B3C] text-white">
      {/* HEADER */}
      <div className="px-4 py-3 border-b border-[#3A3B3C] text-lg font-semibold">
        Đoạn chat
      </div>

      {/* 🔍 SEARCH BOX */}
      <div className="px-3 py-2 border-b border-[#3A3B3C]">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm người dùng..."
          className="
            w-full rounded-lg px-3 py-2 text-sm
            bg-[#242526] text-white
            outline-none
            focus:ring-2 focus:ring-blue-500
          "
        />

        {/* 🕘 RECENT SEARCH */}
        {search.trim() && recentSearches.length > 0 && (
          <div className="mt-2">
            <div className="text-xs text-gray-400 mb-1">
              Tìm gần đây
            </div>

            <div className="flex flex-wrap gap-1">
              {recentSearches.map((name) => (
                <div
                  key={name}
                  className="
                    flex items-center gap-1
                    text-xs px-2 py-1 rounded-full
                    bg-[#3A3B3C]
                    hover:bg-[#4A4B4C]
                  "
                >
                  {/* 🔍 Click để tìm */}
                  <button
                    className="focus:outline-none"
                    onClick={() => setSearch(name)}
                  >
                    {name}
                  </button>

                  {/* ❌ Xóa khỏi tìm gần đây */}
                  <button
                    className="
                      ml-1 text-gray-400 hover:text-white
                      text-[10px] leading-none
                    "
                    title="Xóa"
                    onClick={(e) => {
                      e.stopPropagation();
                      setRecentSearches((prev) => {
                        const updated = prev.filter(
                          (n) => n !== name
                        );
                        localStorage.setItem(
                          RECENT_KEY,
                          JSON.stringify(updated)
                        );
                        return updated;
                      });
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 📜 CONVERSATION LIST */}
      <div className="flex flex-col">
        {filteredConversations.map((convo) => {
          const other =
            convo.members.find((m) => m !== currentUser) || "";
          const isOnline = onlineUsers.includes(other);

          return (
            <ConversationItem
              key={convo.roomId}
              name={other}
              roomId={convo.roomId}
              active={activeRoom === convo.roomId}
              online={isOnline}
              lastMessage={convo.lastMessage}
              unread={convo.unreadCount || 0}
              highlight={search}
              onClick={() => {
if (search.trim() && other && other !== currentUser) {
    saveRecent(other);
  }                onSelectRoom(convo.roomId);
                setSearch("");
              }}
            />
          );
        })}

        {filteredConversations.length === 0 && (
          <div className="px-4 py-6 text-sm text-gray-400 text-center">
            Không tìm thấy kết quả
          </div>
        )}
      </div>
    </div>
  );
}
