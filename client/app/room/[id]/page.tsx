"use client"

import { Mic, Video, PhoneOff, MicOff, VideoOff, MessageSquare, Users, Settings, Monitor } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function RoomPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showParticipants, setShowParticipants] = useState(true)

  return (
    <div className="fixed inset-0 flex flex-col bg-zinc-900">
      {/* Top Bar */}
      <div className="h-16 bg-zinc-800/50 backdrop-blur-sm flex items-center justify-between px-6 border-b border-zinc-700/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <Video className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white">Study Session</h1>
              <p className="text-xs text-zinc-400">Room #{params.id}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
            <span className="text-xs font-medium text-red-400">Recording</span>
          </div>
          <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-700">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Video Area */}
        <div className="flex-1 p-4 flex flex-col gap-4">
          {/* Main Participant Video */}
          <div className="flex-1 bg-zinc-950 rounded-xl flex items-center justify-center relative overflow-hidden shadow-2xl border border-zinc-800">
            {/* Simulated video feed */}
            <div className="text-white text-center">
              <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary to-yellow-600 mx-auto mb-6 flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-primary-foreground">NMĐ</span>
              </div>
              <h2 className="text-2xl font-semibold mb-2">Nguyễn Minh Đức</h2>
              <div className="flex items-center justify-center gap-2 text-green-400">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                <p className="text-sm">Connected</p>
              </div>
            </div>

            {/* Name Badge */}
            <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10">
              <p className="text-sm font-medium text-white">Nguyễn Minh Đức</p>
            </div>

            {/* Connection Quality */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10">
              <div className="flex gap-0.5">
                <div className="w-1 h-3 bg-green-400 rounded-sm"></div>
                <div className="w-1 h-3 bg-green-400 rounded-sm"></div>
                <div className="w-1 h-3 bg-green-400 rounded-sm"></div>
              </div>
              <span className="text-xs text-white font-medium">Good</span>
            </div>

            {/* Self View - bottom right corner */}
            <div className="absolute bottom-4 right-4 h-36 w-52 bg-zinc-900 rounded-lg border-2 border-zinc-700 overflow-hidden shadow-xl hover:scale-105 transition-transform cursor-pointer">
              <div className="h-full w-full flex items-center justify-center relative bg-gradient-to-br from-zinc-800 to-zinc-900">
                <span className="text-white font-semibold text-lg">You</span>
                {isVideoOff && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                    <VideoOff className="h-8 w-8 text-white" />
                  </div>
                )}
              </div>
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs text-white">
                You
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Participants & Chat */}
        {(showParticipants || showChat) && (
          <div className="w-80 bg-zinc-800 border-l border-zinc-700 flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-zinc-700">
              <button
                onClick={() => {
                  setShowParticipants(true)
                  setShowChat(false)
                }}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  showParticipants ? "text-white bg-zinc-900" : "text-zinc-400 hover:text-white"
                }`}
              >
                <Users className="h-4 w-4 inline mr-2" />
                Participants (2)
              </button>
              <button
                onClick={() => {
                  setShowChat(true)
                  setShowParticipants(false)
                }}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  showChat ? "text-white bg-zinc-900" : "text-zinc-400 hover:text-white"
                }`}
              >
                <MessageSquare className="h-4 w-4 inline mr-2" />
                Chat
              </button>
            </div>

            {/* Content */}
            {showParticipants && (
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900 hover:bg-zinc-900/80 transition-colors">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold flex-shrink-0 shadow-md">
                      You
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">You (Host)</p>
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                        <p className="text-xs text-zinc-400">Active</p>
                      </div>
                    </div>
                    {!isMuted ? (
                      <Mic className="h-4 w-4 text-green-400" />
                    ) : (
                      <MicOff className="h-4 w-4 text-red-400" />
                    )}
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900 hover:bg-zinc-900/80 transition-colors">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-yellow-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md">
                      NMĐ
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">Nguyễn Minh Đức</p>
                      <p className="text-xs text-zinc-400">Active</p>
                    </div>
                    <Mic className="h-4 w-4 text-green-400" />
                  </div>
                </div>
              </div>
            )}

            {showChat && (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  <div className="text-xs text-zinc-500 text-center mb-4">Today, 10:30 AM</div>

                  <div className="flex gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-yellow-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      NMĐ
                    </div>
                    <div>
                      <div className="bg-zinc-900 rounded-lg rounded-tl-none px-3 py-2">
                        <p className="text-sm text-white">Hi! Can you hear me?</p>
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1">10:30 AM</p>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <div>
                      <div className="bg-primary rounded-lg rounded-tr-none px-3 py-2">
                        <p className="text-sm text-primary-foreground">Yes, loud and clear!</p>
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1 text-right">10:31 AM</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-zinc-700">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="h-20 bg-zinc-800/50 backdrop-blur-sm flex items-center justify-center gap-3 px-4 border-t border-zinc-700/50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`h-12 w-12 rounded-full flex items-center justify-center transition-all shadow-lg ${
              isMuted ? "bg-red-500 hover:bg-red-600 text-white" : "bg-zinc-700 hover:bg-zinc-600 text-white"
            }`}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>

          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`h-12 w-12 rounded-full flex items-center justify-center transition-all shadow-lg ${
              isVideoOff ? "bg-red-500 hover:bg-red-600 text-white" : "bg-zinc-700 hover:bg-zinc-600 text-white"
            }`}
            title={isVideoOff ? "Turn on camera" : "Turn off camera"}
          >
            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </button>

          <button
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className={`h-12 w-12 rounded-full flex items-center justify-center transition-all shadow-lg ${
              isScreenSharing
                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                : "bg-zinc-700 hover:bg-zinc-600 text-white"
            }`}
            title="Share screen"
          >
            <Monitor className="h-5 w-5" />
          </button>

          <button
            onClick={() => {
              setShowChat(!showChat)
              if (!showChat) setShowParticipants(false)
            }}
            className="h-12 w-12 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white flex items-center justify-center transition-all shadow-lg"
            title="Toggle chat"
          >
            <MessageSquare className="h-5 w-5" />
          </button>

          <button
            onClick={() => {
              setShowParticipants(!showParticipants)
              if (!showParticipants) setShowChat(false)
            }}
            className="h-12 w-12 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white flex items-center justify-center transition-all shadow-lg"
            title="Toggle participants"
          >
            <Users className="h-5 w-5" />
          </button>

          <div className="w-px h-8 bg-zinc-600 mx-2"></div>

          <button
            onClick={() => router.push("/chat")}
            className="h-12 px-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-all shadow-lg gap-2 font-medium"
            title="End call"
          >
            <PhoneOff className="h-5 w-5" />
            <span className="text-sm">End Call</span>
          </button>
        </div>
      </div>
    </div>
  )
}
