"use client";

import ConversationItem from "./ConversationItem";

interface SidebarProps {
  currentUser: string;
  onlineUsers: string[];
  activeRoom: string | null;
  onSelectRoom: (roomId: string) => void;
}

const ALL_USERS = ["Alice", "Bob", "Charlie"];

export default function Sidebar({
  currentUser,
  onlineUsers,
  activeRoom,
  onSelectRoom,
}: SidebarProps) {
  const others = ALL_USERS.filter((u) => u !== currentUser);

  return (
    <div className="w-[260px] bg-[#18191A] border-r border-[#3A3B3C] text-white">
      <div className="px-4 py-3 border-b border-[#3A3B3C] text-lg font-semibold">
        Đoạn chat
      </div>

      <div className="flex flex-col">
        {others.map((name) => {
          const roomId = [currentUser, name].sort().join("_");
          const isActive = roomId === activeRoom;
          const isOnline = onlineUsers.includes(name);

          return (
            <ConversationItem
              key={name}
              name={name}
              roomId={roomId}
              active={!!isActive}
              online={isOnline}
              onClick={() => onSelectRoom(roomId)}
            />
          );
        })}
      </div>
    </div>
  );
}
