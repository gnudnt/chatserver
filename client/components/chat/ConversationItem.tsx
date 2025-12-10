"use client";

interface ConversationItemProps {
  name: string;
  roomId: string;
  active: boolean;
  online: boolean;
  onClick: () => void;
}

export default function ConversationItem({
  name,
  active,
  online,
  onClick,
}: ConversationItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${
        active ? "bg-[#3A3B3C]" : "hover:bg-[#3A3B3C]/60"
      }`}
    >
      <div className="relative h-12 w-12 rounded-full bg-gray-500">
        {online && (
          <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-[#18191A]" />
        )}
      </div>

      <div className="flex flex-col">
        <span className="font-semibold">{name}</span>
        <span className="text-xs text-gray-400">_{name}</span>
      </div>
    </div>
  );
}
