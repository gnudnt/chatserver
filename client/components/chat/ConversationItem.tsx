"use client";

interface ConversationItemProps {
  name: string;
  roomId: string;
  active: boolean;
  online: boolean;
  lastMessage?: string;
  unread: number;
  onClick: () => void;
  highlight?: string;
}

function highlightText(text: string, keyword?: string) {
  if (!keyword) return text;

  const lowerText = text.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();

  // chỉ highlight nếu match ở đầu TỪ
  const index = lowerText.indexOf(lowerKeyword);
  if (index !== 0) return text;

  return (
    <>
      <span className="text-blue-400 font-semibold">
        {text.slice(0, keyword.length)}
      </span>
      {text.slice(keyword.length)}
    </>
  );
}


export default function ConversationItem({
  name,
  active,
  online,
  lastMessage,
  unread,
  onClick,
  highlight,
}: ConversationItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-3 cursor-pointer ${
        active ? "bg-[#3A3B3C]" : "hover:bg-[#3A3B3C]/60"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 rounded-full bg-gray-500">
          {online && (
            <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-[#18191A]" />
          )}
        </div>

        <div className="flex flex-col">
<span className="font-semibold">
  {highlightText(name, highlight)}
</span>
          <span className="text-xs text-gray-400 truncate w-[140px]">
            {lastMessage || "…"}
          </span>
        </div>
      </div>

      {unread > 0 && (
        <span className="rounded-full bg-blue-500 text-xs px-2 py-0.5">
          {unread}
        </span>
      )}
    </div>
  );
}
