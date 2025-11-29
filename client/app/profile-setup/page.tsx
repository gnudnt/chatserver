"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Calendar,
  Target,
  Award,
  Sparkles,
  Zap,
  Upload,
  User,
} from "lucide-react"

const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Biology", "IT"]

const GRADES = ["Grade 10", "Grade 11", "Grade 12"]

const STUDY_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const STUDY_BLOCKS = ["Morning (6AM-12PM)", "Afternoon (12PM-6PM)", "Evening (6PM-9PM)", "Night (9PM-12AM)"]

const STUDY_STYLES = ["Pomodoro", "Deep Work", "Note-taking"]

const LEARNING_GOALS = ["Exam", "Daily homework", "Project", "Competition"]

export default function ProfileSetupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 6

  const [formData, setFormData] = useState({
    name: "",
    school: "",
    grade: "",
    age: "",
    gender: "",
    subjects: [] as string[],
    studyDays: [] as string[],
    studyBlocks: [] as string[],
    studyStyle: [] as string[],
    learningGoal: [] as string[],
    achievement: "",
    bio: "",
    avatar: "",
  })

  const fillDemoData = () => {
    setFormData({
      name: "Nguyễn Minh Anh",
      school: "University of Science and Technology of Hanoi (USTH)",
      grade: "Grade 11",
      age: "17",
      gender: "Female",
      subjects: ["Mathematics", "Physics", "Chemistry", "IT"],
      studyDays: ["Monday", "Wednesday", "Friday", "Saturday"],
      studyBlocks: ["Evening (6PM-9PM)", "Night (9PM-12AM)"],
      studyStyle: ["Pomodoro", "Deep Work"],
      learningGoal: ["Exam", "Project"],
      achievement: "Dean's List 2024",
      bio: "Passionate about AI and data science. Looking for motivated study partners to tackle challenging projects together!",
      avatar: "",
    })
  }

  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter((i) => i !== item)
    } else {
      return [...array, item]
    }
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      localStorage.setItem("profileData", JSON.stringify(formData))
      router.push("/home")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const progress = (step / totalSteps) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-2xl border-border bg-card shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl text-card-foreground">Complete Your Profile</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Step {step} of {totalSteps}
                </CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fillDemoData}
              className="border-primary/40 text-primary hover:bg-primary/10 bg-transparent"
            >
              <Zap className="h-4 w-4 mr-1" />
              Demo Data
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="text-center mb-6">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-2" />
                <h3 className="text-xl font-bold text-card-foreground">Basic Information</h3>
                <p className="text-sm text-muted-foreground">Tell us about your academic background</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Nguyễn Minh Anh"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="school">School/University</Label>
                <Input
                  id="school"
                  placeholder="e.g., USTH, HUST, NEU"
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="e.g., 17"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gender</Label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Grade Level</Label>
                <div className="flex gap-2">
                  {GRADES.map((grade) => (
                    <Badge
                      key={grade}
                      variant={formData.grade === grade ? "default" : "outline"}
                      className={`cursor-pointer px-4 py-2 text-sm transition-colors flex-1 justify-center ${
                        formData.grade === grade
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "hover:bg-secondary"
                      }`}
                      onClick={() => setFormData({ ...formData, grade })}
                    >
                      {grade}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio (Optional)</Label>
                <textarea
                  id="bio"
                  placeholder="Tell us a bit about yourself..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full min-h-[100px] rounded-md border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
          )}

          {/* Step 2: Subjects */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="text-center mb-6">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-2" />
                <h3 className="text-xl font-bold text-card-foreground">Your Subjects</h3>
                <p className="text-sm text-muted-foreground">Select subjects you want to study (at least 2)</p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                {SUBJECTS.map((subject) => (
                  <Badge
                    key={subject}
                    variant={formData.subjects.includes(subject) ? "default" : "outline"}
                    className={`cursor-pointer px-6 py-3 text-base transition-colors ${
                      formData.subjects.includes(subject)
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "hover:bg-secondary"
                    }`}
                    onClick={() => setFormData({ ...formData, subjects: toggleArrayItem(formData.subjects, subject) })}
                  >
                    {subject}
                  </Badge>
                ))}
              </div>

              {formData.subjects.length > 0 && (
                <div className="text-sm text-muted-foreground text-center">
                  {formData.subjects.length} subject{formData.subjects.length > 1 ? "s" : ""} selected
                </div>
              )}
            </div>
          )}

          {/* Step 3: Schedule */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="text-center mb-6">
                <Calendar className="h-12 w-12 text-primary mx-auto mb-2" />
                <h3 className="text-xl font-bold text-card-foreground">Study Schedule</h3>
                <p className="text-sm text-muted-foreground">When are you available to study?</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="mb-3 block">Study Days</Label>
                  <div className="flex flex-wrap gap-2">
                    {STUDY_DAYS.map((day) => (
                      <Badge
                        key={day}
                        variant={formData.studyDays.includes(day) ? "default" : "outline"}
                        className={`cursor-pointer px-4 py-2 text-sm transition-colors ${
                          formData.studyDays.includes(day)
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "hover:bg-secondary"
                        }`}
                        onClick={() =>
                          setFormData({ ...formData, studyDays: toggleArrayItem(formData.studyDays, day) })
                        }
                      >
                        {day}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Study Time Blocks</Label>
                  <div className="flex flex-wrap gap-2">
                    {STUDY_BLOCKS.map((block) => (
                      <Badge
                        key={block}
                        variant={formData.studyBlocks.includes(block) ? "default" : "outline"}
                        className={`cursor-pointer px-4 py-2 text-sm transition-colors ${
                          formData.studyBlocks.includes(block)
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "hover:bg-secondary"
                        }`}
                        onClick={() =>
                          setFormData({ ...formData, studyBlocks: toggleArrayItem(formData.studyBlocks, block) })
                        }
                      >
                        {block}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Study Style */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="text-center mb-6">
                <Sparkles className="h-12 w-12 text-primary mx-auto mb-2" />
                <h3 className="text-xl font-bold text-card-foreground">Study Style</h3>
                <p className="text-sm text-muted-foreground">How do you prefer to learn?</p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                {STUDY_STYLES.map((style) => (
                  <Badge
                    key={style}
                    variant={formData.studyStyle.includes(style) ? "default" : "outline"}
                    className={`cursor-pointer px-6 py-3 text-base transition-colors ${
                      formData.studyStyle.includes(style)
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "hover:bg-secondary"
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, studyStyle: toggleArrayItem(formData.studyStyle, style) })
                    }
                  >
                    {style}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Goals */}
          {step === 5 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="text-center mb-6">
                <Target className="h-12 w-12 text-primary mx-auto mb-2" />
                <h3 className="text-xl font-bold text-card-foreground">Learning Goals</h3>
                <p className="text-sm text-muted-foreground">What are you studying for?</p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                {LEARNING_GOALS.map((goal) => (
                  <Badge
                    key={goal}
                    variant={formData.learningGoal.includes(goal) ? "default" : "outline"}
                    className={`cursor-pointer px-6 py-3 text-base transition-colors ${
                      formData.learningGoal.includes(goal)
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "hover:bg-secondary"
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, learningGoal: toggleArrayItem(formData.learningGoal, goal) })
                    }
                  >
                    {goal}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2 mt-6">
                <Label htmlFor="achievement">Recent Achievement (Optional)</Label>
                <Input
                  id="achievement"
                  placeholder="e.g., Dean's List 2024, Math Competition Winner"
                  value={formData.achievement}
                  onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-card-foreground mb-1">You're almost done!</p>
                    <p className="text-sm text-muted-foreground">
                      Complete your profile to start matching with study buddies who share your goals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Avatar Upload */}
          {step === 6 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="text-center mb-6">
                <User className="h-12 w-12 text-primary mx-auto mb-2" />
                <h3 className="text-xl font-bold text-card-foreground">Profile Picture</h3>
                <p className="text-sm text-muted-foreground">Upload a photo or skip for now</p>
              </div>

              <div className="flex flex-col items-center gap-6">
                <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                  {formData.avatar ? (
                    <img
                      src={formData.avatar || "/placeholder.svg"}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-16 w-16 text-primary" />
                  )}
                </div>

                <div className="w-full max-w-sm space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-primary/40 text-primary hover:bg-primary/10 bg-transparent"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        avatar: "/diverse-student-portraits.png",
                      })
                    }}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Recommended: Square image, at least 200x200px
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-card-foreground mb-1">Profile Complete!</p>
                    <p className="text-sm text-muted-foreground">
                      You're all set! Click Complete to start matching with study buddies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="border-border bg-transparent"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <Button onClick={handleNext} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {step === totalSteps ? "Complete" : "Next"}
              {step !== totalSteps && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
