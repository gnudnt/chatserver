"use client";

import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { getSocket } from "@/utils/socketSingleton";

export interface Conversation {
  _id?: string;
  roomId: string;
  members: string[];
  lastMessage?: string;
  updatedAt: string;
  unreadCount: number;
}

export function useConversations(currentUser: string, activeRoom: string | null) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const socket: Socket = getSocket();

  // REGISTER USER
  useEffect(() => {
    if (!currentUser) return;
    socket.emit("registerUser", currentUser);
  }, [currentUser]);

  // LOAD FROM BACKEND — SORT MẶC ĐỊNH THEO updatedAt
  useEffect(() => {
    if (!currentUser) return;

const ACTIONS_URL =
  process.env.NEXT_PUBLIC_ACTIONS_URL || "http://localhost:8888";

fetch(`/api/conversations?userId=${currentUser}`)

      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((c: any) => ({
          ...c,
          unreadCount: c.unreadCount ?? 0,
        }));

        setConversations(
          mapped.sort(
            (a: Conversation, b: Conversation) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
        );
      });
  }, [currentUser]);

  // LISTEN REALTIME UPDATES — SORT CHỈ KHI CÓ TIN NHẮN MỚI
  useEffect(() => {
    const handleUpdate = (data: any) => {
      setConversations((prev) => {
        const exists = prev.find((c) => c.roomId === data.roomId);
        let updated;

        if (exists) {
          const isNewMessage = exists.lastMessage !== data.lastMessage; // ⭐ CHECK TIN NHẮN MỚI

          updated = prev.map((c) =>
            c.roomId === data.roomId
              ? {
                  ...c,
                  lastMessage: data.lastMessage,
                  updatedAt: data.updatedAt,
                  unreadCount:
                    activeRoom === data.roomId ? 0 : data.unreadCount,
                }
              : c
          );

          // ⭐⭐⭐ CHỈ SORT NẾU CÓ TIN NHẮN MỚI
          if (isNewMessage) {
            return updated.sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            );
          }

          return updated; // ❌ KHÔNG SORT KHI CLICK HOẶC MARK AS READ
        }

        // ⭐ Conversation mới xuất hiện → Luôn đưa lên đầu
        updated = [
          {
            ...data,
            unreadCount: data.unreadCount ?? 1,
          },
          ...prev,
        ];

        return updated.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() -
            new Date(a.updatedAt).getTime()
        );
      });
    };

    socket.on("conversationUpdated", handleUpdate);
    return () => socket.off("conversationUpdated", handleUpdate);
  }, [activeRoom]);

  // RESET UNREAD KHI MỞ PHÒNG — KHÔNG SORT
  useEffect(() => {
    if (!activeRoom) return;

    setConversations((prev) =>
      prev.map((c) =>
        c.roomId === activeRoom
          ? { ...c, unreadCount: 0 }
          : c
      )
    );

    socket.emit("markAsRead", { roomId: activeRoom, userId: currentUser });
  }, [activeRoom]);

  return { conversations, setConversations };
}
