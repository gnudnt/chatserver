"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageSquare, Video, BookOpen, Trophy, Heart } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (isLoggedIn) {
      router.push("/home")
    }
  }, [router])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-balance text-5xl font-bold tracking-tight text-foreground">
          Find Your Perfect <span className="text-primary">Study Buddy</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground">
          Connect with students who share your subjects, schedule, and learning goals. Study smarter together with
          real-time chat, video calls, and AI-powered quizzes.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Users className="mr-2 h-5 w-5" />
              Get Started Free
            </Button>
          </Link>
          <Link href="/login">
            <Button
              size="lg"
              variant="outline"
              className="border-border bg-secondary text-foreground hover:bg-secondary/80"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-16" id="how-it-works">
        <h2 className="mb-8 text-center text-3xl font-bold text-foreground">How It Works</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-card-foreground">Smart Matching</CardTitle>
              <CardDescription className="text-muted-foreground">
                Swipe through profiles and match with students who share your subjects, schedule, and study style
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-card-foreground">Real-time Chat</CardTitle>
              <CardDescription className="text-muted-foreground">
                Connect instantly with your study buddies through real-time messaging
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-card-foreground">Video Calls</CardTitle>
              <CardDescription className="text-muted-foreground">
                Study together face-to-face with HD video calls and screen sharing
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-card-foreground">Resource Library</CardTitle>
              <CardDescription className="text-muted-foreground">
                Access shared study materials, notes, and documents from your study group
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-card-foreground">AI-Powered Quizzes</CardTitle>
              <CardDescription className="text-muted-foreground">
                Generate quizzes from your study materials and compete with your study buddy
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-card-foreground">Study Groups</CardTitle>
              <CardDescription className="text-muted-foreground">
                Build your network of study partners and collaborate on projects
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-card-foreground">Ready to Find Your Study Partner?</h2>
        <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
          Join thousands of students who are already studying smarter together
        </p>
        <Link href="/signup">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Get Started Now
          </Button>
        </Link>
      </div>
    </div>
  )
}
