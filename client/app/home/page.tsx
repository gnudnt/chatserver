"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  GraduationCap,
  Users,
  MessageCircle,
  Video,
  UserCircle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Target,
  TrendingUp,
} from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const profileData = localStorage.getItem("profileData")

    if (profileData) {
      const profile = JSON.parse(profileData)
      setUserName(profile.name || "Student")
    } else {
      // No profile found, show dialog
      setShowProfileDialog(true)
    }
  }, [])

  const handleCompleteProfile = () => {
    setShowProfileDialog(false)
    router.push("/profile-setup")
  }

  const hasProfile = userName !== ""

  const steps = [
    {
      number: "1",
      title: "Complete Your Profile",
      description: "Share your subjects, schedule, and study preferences",
      icon: UserCircle,
      action: () => router.push("/profile-setup"),
      buttonText: "Setup Profile",
      completed: hasProfile,
    },
    {
      number: "2",
      title: "Find Study Buddies",
      description: "Swipe through matched students who share your interests",
      icon: Users,
      action: () => router.push("/matching"),
      buttonText: "Start Matching",
      completed: false,
    },
    {
      number: "3",
      title: "Connect & Chat",
      description: "Message your matches and plan study sessions",
      icon: MessageCircle,
      action: () => router.push("/chat"),
      buttonText: "Open Chat",
      completed: false,
    },
    {
      number: "4",
      title: "Video Study Sessions",
      description: "Join video calls for collaborative learning",
      icon: Video,
      action: () => router.push("/room/demo"),
      buttonText: "Join Room",
      completed: false,
    },
  ]

  return (
    <>
      {/* Profile Setup Dialog for users without profile */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <UserCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <DialogTitle className="text-2xl text-center">Complete Your Profile</DialogTitle>
            <DialogDescription className="text-center text-base">
              To start finding study buddies, please complete your profile with your study preferences and schedule.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button
              onClick={handleCompleteProfile}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Create Profile
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Home Page */}
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
        {/* Hero Section */}
        <div className="container max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            {hasProfile ? (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-card-foreground mb-4">Welcome back, {userName}!</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Continue your learning journey and connect with your study buddies
                </p>
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-card-foreground mb-4">
                  Welcome to Study Buddy Match
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  The platform to connect with the right study buddies and achieve your learning goals together
                </p>
              </>
            )}
          </div>

          {/* Progress Stats */}
          {hasProfile && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <Card className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-card-foreground">12</p>
                      <p className="text-sm text-muted-foreground">Potential Matches</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-card-foreground">3</p>
                      <p className="text-sm text-muted-foreground">Active Chats</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-card-foreground">8h</p>
                      <p className="text-sm text-muted-foreground">Study Time This Week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Getting Started Steps */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-card-foreground mb-2">
                {hasProfile ? "Continue Your Learning Journey" : "Get Started in 4 Steps"}
              </h2>
              <p className="text-muted-foreground">
                {hasProfile
                  ? "Explore features and connect with study buddies"
                  : "Complete these steps to make the most of Study Buddy Match"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((step) => (
                <Card
                  key={step.number}
                  className={`border-border bg-card hover:shadow-lg transition-all ${
                    step.completed ? "ring-2 ring-green-500" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div
                        className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          step.completed ? "bg-green-500/10" : "bg-primary/10"
                        }`}
                      >
                        <step.icon className={`h-6 w-6 ${step.completed ? "text-green-600" : "text-primary"}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-muted-foreground">Step {step.number}</span>
                          {step.completed && (
                            <span className="text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full">
                              Completed
                            </span>
                          )}
                        </div>
                        <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                        <CardDescription className="text-sm">{step.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={step.action}
                      className="w-full bg-primary"
                      disabled={!hasProfile && step.number !== "1"}
                    >
                      {step.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <BookOpen className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Smart Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  AI-powered algorithm finds compatible study buddies based on subjects, schedule, and learning style
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <Target className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Goal Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track your study progress, set goals, and achieve them together with your study buddy
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <Sparkles className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Interactive Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Real-time chat, high-quality video calls, and easy document sharing
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
