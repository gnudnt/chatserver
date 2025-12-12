"use client";

import { useConversations } from "@/hooks/useConversations";
import ConversationItem from "./ConversationItem";

interface SidebarProps {
  currentUser: string;
  onlineUsers: string[];
  activeRoom: string | null;
  onSelectRoom: (roomId: string) => void;
}

export default function Sidebar({
  currentUser,
  onlineUsers,
  activeRoom,
  onSelectRoom,
}: SidebarProps) {
  const { conversations } = useConversations(currentUser, activeRoom);

  return (
    <div className="w-[260px] bg-[#18191A] border-r border-[#3A3B3C] text-white">
      <div className="px-4 py-3 border-b border-[#3A3B3C] text-lg font-semibold">
        Đoạn chat
      </div>

      <div className="flex flex-col">
        {conversations.map((convo) => {
          const other = convo.members.find((m) => m !== currentUser) || "";
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
              onClick={() => onSelectRoom(convo.roomId)}
            />
          );
        })}
      </div>
    </div>
  );
}
