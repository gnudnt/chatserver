"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, FileQuestion, BookOpen, Users, MessageSquare, Video, UserCircle, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function NavBar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
  }, [pathname])

  if (pathname === "/login" || pathname === "/signup" || pathname === "/profile-setup" || pathname === "/onboarding") {
    return null
  }

  if (!isLoggedIn) {
    return (
      <nav className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            Study Buddy Match
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              How It Works
            </Link>
            <Link href="/signup">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  const navItems = [
    { href: "/home", label: "Home", icon: Home },
    { href: "/matching", label: "Matching", icon: Users },
    { href: "/chat", label: "Chat", icon: MessageSquare },
    { href: "/room/123", label: "Video", icon: Video },
    { href: "/quiz", label: "Quiz", icon: FileQuestion },
    { href: "/resource", label: "Resource", icon: BookOpen },
  ]

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("profileData")
    router.push("/")
    setIsLoggedIn(false)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/home" className="text-2xl font-bold text-primary">
          Study Buddy Match
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/profile">
            <button className="flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">
              <UserCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-md bg-red-500/10 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
