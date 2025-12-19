"use client";

import { useEffect, useState } from "react";

interface MessageSearchPanelProps {
  roomId: string;
  onSelect: (messageId: string) => void;
}

export default function MessageSearchPanel({
  roomId,
  onSelect,
}: MessageSearchPanelProps) {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!keyword.trim()) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3001/messages/search?roomId=${roomId}&keyword=${encodeURIComponent(
            keyword
          )}`
        );

        const data = await res.json();

        setResults(Array.isArray(data) ? data : data.data || []);
      } catch (e) {
        console.error("Search error:", e);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const t = setTimeout(fetchData, 400); 
    return () => clearTimeout(t);
  }, [keyword, roomId]);

  return (
    <div className="absolute right-4 top-16 z-50 w-80 rounded-xl bg-[#242526] shadow-xl border border-gray-700">
      <div className="p-3 border-b border-gray-700">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm trong đoạn chat..."
          className="w-full rounded-lg bg-[#3A3B3C] px-3 py-2 text-sm text-white outline-none"
        />
      </div>

      <div className="max-h-80 overflow-y-auto">
        {loading && (
          <div className="px-3 py-2 text-sm text-gray-400">
            Đang tìm...
          </div>
        )}

        {!loading && results.length === 0 && keyword && (
          <div className="px-3 py-2 text-sm text-gray-500">
            Không tìm thấy kết quả
          </div>
        )}

        {results.map((msg) => (
          <div
            key={msg._id}
            className="cursor-pointer px-3 py-2 hover:bg-[#3A3B3C] text-sm text-white"
            onClick={() => onSelect(msg._id)}
          >
            <div className="line-clamp-2">{msg.content || "📎 File / Ảnh"}</div>
            <div className="text-xs text-gray-400">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
