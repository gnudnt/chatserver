"use client"

import { useState } from "react"
import { Search, Send, Video, Phone, MoreVertical, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ChatPage() {
  const router = useRouter()
  const [selectedChat, setSelectedChat] = useState<number | null>(1)
  const [message, setMessage] = useState("")

  const chats = [
    {
      id: 1,
      name: "Nguyễn Minh Đức",
      avatar: "NMĐ",
      lastMessage: "Chúng ta học cùng nhau nhé!",
      time: "10:30 AM",
      unread: 2,
    },
    {
      id: 2,
      name: "Trần Thu Hà",
      avatar: "TTH",
      lastMessage: "Bài tập hôm nay khó quá",
      time: "9:15 AM",
      unread: 0,
    },
    {
      id: 3,
      name: "Lê Văn An",
      avatar: "LVA",
      lastMessage: "Thanks for the notes!",
      time: "Yesterday",
      unread: 0,
    },
  ]

  const demoMessages = [
    { id: 1, sender: "them", text: "Chào bạn! Mình có thể học cùng bạn không?", time: "10:25 AM" },
    { id: 2, sender: "me", text: "Chào! Được chứ, bạn học môn gì?", time: "10:26 AM" },
    { id: 3, sender: "them", text: "Mình đang học Toán và Lý. Bạn thì sao?", time: "10:27 AM" },
    { id: 4, sender: "me", text: "Mình cũng học Toán! Chúng ta có thể học cùng nhau", time: "10:28 AM" },
    { id: 5, sender: "them", text: "Tuyệt vời! Khi nào bạn rảnh?", time: "10:29 AM" },
    { id: 6, sender: "me", text: "Chiều nay được không? Mình có thể gọi video luôn", time: "10:30 AM" },
    { id: 7, sender: "them", text: "Chúng ta học cùng nhau nhé!", time: "10:30 AM" },
    { id: 8, sender: "me", text: "Oke, mình gọi luôn nhé?", time: "10:31 AM" },
  ]

  return (
    <div className="fixed inset-0 top-16 flex bg-background">
      {/* Chat List Sidebar */}
      <div
        className={`${selectedChat ? "hidden md:flex" : "flex"} w-full md:w-80 flex-col border-r border-border bg-card`}
      >
        <div className="p-4 border-b border-border">
          <h1 className="text-2xl font-bold mb-4 text-card-foreground">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full rounded-lg border border-border bg-background pl-9 py-2 text-sm outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`flex items-center gap-3 p-4 hover:bg-secondary cursor-pointer transition-colors border-b border-border ${
                selectedChat === chat.id ? "bg-secondary" : ""
              }`}
            >
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                {chat.avatar}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-card-foreground">{chat.name}</p>
                  <span className="text-xs text-muted-foreground">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <span className="ml-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Conversation */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col bg-background">
          {/* Chat Header */}
          <div className="h-16 border-b border-border flex items-center justify-between px-4 bg-card shadow-sm z-10">
            <div className="flex items-center gap-3">
              <button onClick={() => setSelectedChat(null)} className="md:hidden">
                <ArrowLeft className="h-5 w-5 text-muted-foreground" />
              </button>
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {chats.find((c) => c.id === selectedChat)?.avatar}
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-card"></div>
              </div>
              <div>
                <p className="font-semibold text-card-foreground">{chats.find((c) => c.id === selectedChat)?.name}</p>
                <p className="text-xs text-green-600">Active now</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/room/123")}
                className="h-10 w-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center text-foreground transition-colors"
                title="Start Voice Call"
              >
                <Phone className="h-5 w-5" />
              </button>
              <button
                onClick={() => router.push("/room/123")}
                className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
                title="Start Video Call"
              >
                <Video className="h-5 w-5" />
              </button>
              <button className="h-10 w-10 rounded-full hover:bg-secondary flex items-center justify-center text-muted-foreground transition-colors">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-background">
            <div className="space-y-4 max-w-3xl mx-auto">
              {demoMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-2 max-w-[70%] ${msg.sender === "me" ? "flex-row-reverse" : "flex-row"}`}>
                    {msg.sender === "them" && (
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0 self-end mb-1">
                        NMĐ
                      </div>
                    )}
                    <div>
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          msg.sender === "me"
                            ? "bg-primary text-primary-foreground rounded-br-none"
                            : "bg-secondary text-foreground rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                      <p
                        className={`text-[10px] text-muted-foreground mt-1 ${msg.sender === "me" ? "text-right" : "text-left"}`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-border p-4 bg-card">
            <div className="flex items-center gap-2 max-w-3xl mx-auto">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary text-foreground"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && message.trim()) {
                    setMessage("")
                  }
                }}
              />
              <button
                onClick={() => message.trim() && setMessage("")}
                className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-primary-foreground transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-background">
          <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-card-foreground mb-2">Select a conversation</h3>
          <p className="text-muted-foreground">Choose a chat from the list to start messaging</p>
        </div>
      )}
    </div>
  )
}
