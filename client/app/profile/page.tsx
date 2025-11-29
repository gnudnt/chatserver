"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { GraduationCap, MapPin, Award, Edit, Settings, LogOut, User } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "student@example.com",
    school: "USTH",
    age: "17",
    gender: "Male",
    achievement: "Dean's List 2024",
    bio: "",
    matchCount: 12,
    studyHours: 48,
    avatar: "",
  })

  useEffect(() => {
    const profileData = localStorage.getItem("profileData")
    if (profileData) {
      const data = JSON.parse(profileData)
      setUser({
        name: data.name || "John Doe",
        email: "student@example.com",
        school: data.school || "USTH",
        age: data.age || "17",
        gender: data.gender || "Male",
        achievement: data.achievement || "Dean's List 2024",
        bio: data.bio || "",
        matchCount: 12,
        studyHours: 48,
        avatar: data.avatar || "",
      })
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24">
              {user.avatar ? (
                <img src={user.avatar || "/placeholder.svg"} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-card-foreground mb-2">{user.name}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user.school}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  <span>{user.age} years old</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{user.gender}</span>
                </div>
              </div>

              {user.bio && <p className="text-sm text-muted-foreground mt-2 mb-4 max-w-2xl">{user.bio}</p>}

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                <Link href="/profile-setup">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </Link>
                <Button variant="outline" className="border-border bg-transparent">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>

            <div className="flex md:flex-col gap-4">
              <Card className="text-center p-4 bg-primary/5 border-primary/10">
                <p className="text-3xl font-bold text-primary">{user.matchCount}</p>
                <p className="text-xs text-muted-foreground">Matches</p>
              </Card>
              <Card className="text-center p-4 bg-green-500/5 border-green-500/10">
                <p className="text-3xl font-bold text-green-600">{user.studyHours}</p>
                <p className="text-xs text-muted-foreground">Study Hours</p>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievement */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Award className="h-5 w-5 text-primary" />
            Achievement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{user.achievement}</p>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => {
              localStorage.removeItem("isLoggedIn")
              localStorage.removeItem("profileData")
              window.location.href = "/"
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
