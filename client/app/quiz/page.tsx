import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Play, Users } from "lucide-react"

export default function QuizPage() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">AI-Powered Quizzes</h1>
          <p className="text-muted-foreground">
            Generate quizzes from your study materials and challenge your study buddies
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Brain className="h-5 w-5 text-primary" />
                Generate New Quiz
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Upload a document and let AI create quiz questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Upload Document</Button>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Users className="h-5 w-5 text-primary" />
                Collaborative Quiz
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Take a quiz together with your study buddy in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full border-border bg-secondary text-foreground hover:bg-secondary/80"
              >
                Join Session
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Available Quizzes */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-foreground">Available Quizzes</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Mathematics - Chapter 5", questions: 15, difficulty: "Medium" },
              { title: "Physics - Mechanics", questions: 20, difficulty: "Hard" },
              { title: "Computer Science - Algorithms", questions: 12, difficulty: "Easy" },
            ].map((quiz, index) => (
              <Card key={index} className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-card-foreground">{quiz.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {quiz.questions} questions • {quiz.difficulty}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Play className="mr-2 h-4 w-4" />
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
