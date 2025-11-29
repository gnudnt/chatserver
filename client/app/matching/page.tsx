"use client"

import type React from "react"
import { GraduationCap, Target, Trophy, BookOpen, X, Heart, Sparkles, MapPin, Calendar, Clock } from "lucide-react" // Import new icons

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

// Mock data for demonstration
const mockProfiles = [
  {
    id: 1,
    name: "Nguyễn Minh Đức",
    avatar: "/diverse-student-portraits.png",
    school: "Hanoi Amsterdam High School",
    grade: "Grade 12",
    subjects: ["Mathematics", "Physics", "IT"],
    schedule: ["Monday", "Wednesday", "Friday"],
    studyStyle: "Visual learner, Group study",
    goals: ["Ace final exams", "Improve problem-solving skills"],
    bio: "Dean's List 2024",
    compatibility: 92,
    gender: "Male",
  },
  {
    id: 2,
    name: "Trần Thu Hà",
    avatar: "/diverse-female-student.png",
    school: "Le Hong Phong High School",
    grade: "Grade 11",
    subjects: ["Chemistry", "Biology", "English"],
    schedule: ["Tuesday", "Thursday", "Saturday"],
    studyStyle: "Kinesthetic learner, Solo study",
    goals: ["Master lab techniques", "Research methods"],
    bio: "Science Competition Winner 2023",
    compatibility: 85,
    gender: "Female",
  },
  {
    id: 3,
    name: "Lê Văn Nam",
    avatar: "/diverse-students-studying.png",
    school: "Chu Van An High School",
    grade: "Grade 12",
    subjects: ["Programming", "Algorithms", "Database"],
    schedule: ["Weekend"],
    studyStyle: "Logical, Hands-on",
    goals: ["Build a startup project"],
    bio: "Hackathon Champion",
    compatibility: 88,
    gender: "Male",
  },
  {
    id: 4,
    name: "Phạm Lan Anh",
    avatar: "/diverse-female-student.png",
    school: "Hanoi Amsterdam High School",
    grade: "Grade 11",
    subjects: ["Economics", "Statistics", "Marketing"],
    schedule: ["Monday", "Thursday"],
    studyStyle: "Analytical, Interactive",
    goals: ["Data analysis for business"],
    bio: "Business Case Competition Finalist",
    compatibility: 78,
    gender: "Female",
  },
  {
    id: 5,
    name: "Hoàng Minh Tuấn",
    avatar: "/diverse-student-portraits.png",
    school: "Le Hong Phong High School",
    grade: "Grade 10",
    subjects: ["Mathematics", "Physics", "Engineering"],
    schedule: ["Tuesday", "Friday", "Saturday"],
    studyStyle: "Practical, Collaborative",
    goals: ["Engineering foundation"],
    bio: "Math Olympiad Medalist",
    compatibility: 90,
    gender: "Male",
  },
]

const SCHOOLS = ["Hanoi Amsterdam High School", "Le Hong Phong High School", "Chu Van An High School"]
const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Biology", "IT"]
const GRADES = ["Grade 10", "Grade 11", "Grade 12"]
const STUDY_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const STUDY_BLOCKS = ["Morning (6AM-12PM)", "Afternoon (12PM-6PM)", "Evening (6PM-9PM)", "Night (9PM-12AM)"]
const STUDY_STYLES = ["Pomodoro", "Deep Work", "Note-taking"]
const LEARNING_GOALS = ["Exam", "Daily homework", "Project", "Competition"]
const GENDERS = ["Male", "Female", "Non-binary"]

export default function MatchingPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMatchPopup, setShowMatchPopup] = useState(false)
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    schools: [] as string[],
    grades: [] as string[],
    subjects: [] as string[],
    studyDays: [] as string[],
    studyBlocks: [] as string[],
    studyStyles: [] as string[],
    learningGoals: [] as string[],
    genders: [] as string[],
    minCompatibility: 0,
  })
  const activeFilterCount =
    filters.schools.length +
    filters.grades.length +
    filters.subjects.length +
    filters.studyDays.length +
    filters.studyBlocks.length +
    filters.studyStyles.length +
    filters.learningGoals.length +
    filters.genders.length +
    (filters.minCompatibility > 0 ? 1 : 0)

  const filteredProfiles = mockProfiles.filter((profile) => {
    if (filters.schools.length > 0 && !filters.schools.includes(profile.school)) {
      return false
    }
    if (filters.grades.length > 0 && !filters.grades.includes(profile.grade)) {
      return false
    }
    if (filters.subjects.length > 0 && !filters.subjects.some((subject) => profile.subjects.includes(subject))) {
      return false
    }
    if (filters.studyDays.length > 0 && !filters.studyDays.some((day) => profile.schedule.includes(day))) {
      return false
    }
    if (filters.studyBlocks.length > 0 && !filters.studyBlocks.some((block) => profile.schedule.includes(block))) {
      return false
    }
    if (filters.studyStyles.length > 0 && !filters.studyStyles.includes(profile.studyStyle)) {
      return false
    }
    if (filters.learningGoals.length > 0 && !filters.learningGoals.some((goal) => profile.goals.includes(goal))) {
      return false
    }
    if (filters.genders.length > 0 && !filters.genders.includes(profile.gender)) {
      return false
    }
    if (profile.compatibility < filters.minCompatibility) {
      return false
    }
    return true
  })

  const currentProfile = filteredProfiles[currentIndex % filteredProfiles.length] || mockProfiles[0]
  const nextProfile = filteredProfiles[(currentIndex + 1) % filteredProfiles.length] || mockProfiles[1]

  const toggleFilter = (filterType: keyof typeof filters, value: string) => {
    const currentFilter = filters[filterType]
    if (Array.isArray(currentFilter)) {
      if (currentFilter.includes(value)) {
        setFilters({
          ...filters,
          [filterType]: currentFilter.filter((item) => item !== value),
        })
      } else {
        setFilters({
          ...filters,
          [filterType]: [...currentFilter, value],
        })
      }
    }
  }

  const clearAllFilters = () => {
    setFilters({
      schools: [],
      grades: [],
      subjects: [],
      studyDays: [],
      studyBlocks: [],
      studyStyles: [],
      learningGoals: [],
      genders: [],
      minCompatibility: 0,
    })
  }

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      setShowMatchPopup(true)
    } else {
      setCurrentIndex((prev) => (prev + 1) % filteredProfiles.length)
    }
    setDragOffset({ x: 0, y: 0 })
  }

  const handleClosePopup = () => {
    setShowMatchPopup(false)
    setCurrentIndex((prev) => (prev + 1) % filteredProfiles.length)
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !dragStart) return
    e.preventDefault()

    const currentX = e.clientX
    const currentY = e.clientY

    setDragOffset({
      x: currentX - dragStart.x,
      y: currentY - dragStart.y,
    })
  }

  const handlePointerUp = () => {
    if (!isDragging) return

    setIsDragging(false)
    setDragStart(null)

    const threshold = 100

    if (dragOffset.x > threshold) {
      handleSwipe("right")
    } else if (dragOffset.x < -threshold) {
      handleSwipe("left")
    } else {
      setDragOffset({ x: 0, y: 0 })
    }
  }

  const rotate = dragOffset.x * 0.05
  const opacityRight = Math.min(Math.max(dragOffset.x / 100, 0), 1)
  const opacityLeft = Math.min(Math.max(-dragOffset.x / 100, 0), 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Find Your Study Buddy
          </h1>
          <p className="text-center text-muted-foreground">Swipe to connect with students who match your goals</p>
        </div>

        {/* Filter Button Row */}
        <div className="flex justify-end mb-4">
          <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Sparkles className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge
                    variant="default"
                    className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Filter Study Buddies</DialogTitle>
                <DialogDescription>Refine your search to find the perfect study partner</DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-6">
                {/* Grade Filter */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Grade Level</Label>
                    {filters.grades.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFilters({ ...filters, grades: [] })}
                        className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {GRADES.map((grade) => (
                      <Badge
                        key={grade}
                        variant={filters.grades.includes(grade) ? "default" : "outline"}
                        className={`cursor-pointer px-4 py-2 text-sm transition-colors flex-1 justify-center ${
                          filters.grades.includes(grade)
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "hover:bg-secondary"
                        }`}
                        onClick={() => toggleFilter("grades", grade)}
                      >
                        {grade.replace("Grade ", "")}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Subjects Filter */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Subjects</Label>
                    {filters.subjects.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFilters({ ...filters, subjects: [] })}
                        className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {SUBJECTS.map((subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox
                          id={`subject-${subject}`}
                          checked={filters.subjects.includes(subject)}
                          onCheckedChange={() => toggleFilter("subjects", subject)}
                        />
                        <label
                          htmlFor={`subject-${subject}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {subject}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Study Days Filter */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Study Days</Label>
                    {filters.studyDays.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFilters({ ...filters, studyDays: [] })}
                        className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Minimum 3 days/week</p>
                  <div className="grid grid-cols-2 gap-2">
                    {STUDY_DAYS.map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          id={`day-${day}`}
                          checked={filters.studyDays.includes(day)}
                          onCheckedChange={() => toggleFilter("studyDays", day)}
                        />
                        <label
                          htmlFor={`day-${day}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {day}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Study Blocks Filter */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Study Time Blocks</Label>
                    {filters.studyBlocks.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFilters({ ...filters, studyBlocks: [] })}
                        className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Minimum 2 blocks</p>
                  <div className="grid grid-cols-2 gap-2">
                    {STUDY_BLOCKS.map((block) => (
                      <div key={block} className="flex items-center space-x-2">
                        <Checkbox
                          id={`block-${block}`}
                          checked={filters.studyBlocks.includes(block)}
                          onCheckedChange={() => toggleFilter("studyBlocks", block)}
                        />
                        <label
                          htmlFor={`block-${block}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {block}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Study Style Filter */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Study Style</Label>
                    {filters.studyStyles.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFilters({ ...filters, studyStyles: [] })}
                        className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {STUDY_STYLES.map((style) => (
                      <div key={style} className="flex items-center space-x-2">
                        <Checkbox
                          id={`style-${style}`}
                          checked={filters.studyStyles.includes(style)}
                          onCheckedChange={() => toggleFilter("studyStyles", style)}
                        />
                        <label
                          htmlFor={`style-${style}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {style}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Goal Filter */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Learning Goal</Label>
                    {filters.learningGoals.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFilters({ ...filters, learningGoals: [] })}
                        className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {LEARNING_GOALS.map((goal) => (
                      <div key={goal} className="flex items-center space-x-2">
                        <Checkbox
                          id={`goal-${goal}`}
                          checked={filters.learningGoals.includes(goal)}
                          onCheckedChange={() => toggleFilter("learningGoals", goal)}
                        />
                        <label
                          htmlFor={`goal-${goal}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {goal}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gender Filter */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Gender</Label>
                    {filters.genders.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFilters({ ...filters, genders: [] })}
                        className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {GENDERS.map((gender) => (
                      <div key={gender} className="flex items-center space-x-2">
                        <Checkbox
                          id={`gender-${gender}`}
                          checked={filters.genders.includes(gender)}
                          onCheckedChange={() => toggleFilter("genders", gender)}
                        />
                        <label
                          htmlFor={`gender-${gender}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {gender}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compatibility Score Filter */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Minimum Compatibility</Label>
                    <span className="text-sm font-medium text-primary">{filters.minCompatibility}%</span>
                  </div>
                  <Slider
                    value={[filters.minCompatibility]}
                    onValueChange={(value) => setFilters({ ...filters, minCompatibility: value[0] })}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={clearAllFilters} className="w-full sm:w-auto bg-transparent">
                  Clear All Filters
                </Button>
                <Button
                  onClick={() => {
                    setFilterOpen(false)
                  }}
                  className="w-full sm:w-auto"
                >
                  Apply Filters ({filteredProfiles.length} matches)
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {activeFilterCount > 0 && (
          <div className="mb-4 text-center">
            <Badge variant="secondary" className="text-sm">
              {filteredProfiles.length} {filteredProfiles.length === 1 ? "match" : "matches"} found
            </Badge>
          </div>
        )}

        {/* Card Stack Container */}
        <div className="relative mb-8 h-[580px] w-full max-w-lg mx-auto flex items-center justify-center">
          {/* Background Card (Next Profile) */}
          <div className="absolute top-0 w-full transform scale-95 opacity-50 translate-y-4 z-0 pointer-events-none">
            <Card className="overflow-hidden border-border bg-card shadow-lg h-[560px]">
              <div className="relative h-3/5 bg-muted">
                <Image src={nextProfile.avatar || "/placeholder.svg"} alt="" fill className="object-cover grayscale" />
              </div>
              <CardContent className="p-6">
                <div className="h-4 w-3/4 bg-muted rounded mb-4"></div>
                <div className="h-4 w-1/2 bg-muted rounded"></div>
              </CardContent>
            </Card>
          </div>

          {/* Foreground Card (Current Profile) */}
          <div
            className={cn(
              "absolute top-0 w-full z-10 touch-none cursor-grab active:cursor-grabbing",
              !isDragging && "transition-transform duration-300 ease-out",
            )}
            style={{
              transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotate}deg)`,
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <Card className="overflow-hidden border-border bg-card shadow-xl h-[560px] flex flex-col">
              <div className="relative h-3/5 shrink-0">
                <Image
                  src={currentProfile.avatar || "/placeholder.svg"}
                  alt={currentProfile.name}
                  fill
                  className="object-cover pointer-events-none"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-10">
                  <h2 className="mb-1 text-xl font-bold text-white">{currentProfile.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-white/90">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{currentProfile.school}</span>
                    <span>•</span>
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{currentProfile.grade}</span>
                  </div>
                </div>

                {/* Match Score Badge */}
                <div className="absolute right-4 top-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg border-2 border-white/20">
                    <div className="text-center">
                      <div className="text-lg font-bold">{currentProfile.compatibility}%</div>
                      <div className="text-[9px] font-medium uppercase">Match</div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute top-8 left-8 border-4 border-green-500 rounded-lg px-4 py-2 transform -rotate-12 opacity-0 font-bold text-green-500 text-3xl tracking-wider uppercase bg-black/20 backdrop-blur-sm"
                  style={{ opacity: opacityRight }}
                >
                  LIKE
                </div>
                <div
                  className="absolute top-8 right-8 border-4 border-red-500 rounded-lg px-4 py-2 transform rotate-12 opacity-0 font-bold text-red-500 text-3xl tracking-wider uppercase bg-black/20 backdrop-blur-sm"
                  style={{ opacity: opacityLeft }}
                >
                  NOPE
                </div>
              </div>

              <CardContent className="flex-1 overflow-y-auto p-5">
                <div className="space-y-4">
                  {/* About Section */}
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <BookOpen className="h-4 w-4" />
                      About
                    </div>
                    <p className="text-sm text-muted-foreground">{currentProfile.bio}</p>
                  </div>

                  {/* Subjects */}
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <GraduationCap className="h-4 w-4" />
                      Subjects
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentProfile.subjects.map((subject) => (
                        <Badge key={subject} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Study Schedule */}
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Clock className="h-4 w-4" />
                      Study Schedule
                    </div>
                    <div className="space-y-1.5">
                      {currentProfile.schedule.map((slot) => (
                        <div key={slot} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {slot}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Study Style & Goals */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-foreground">
                        <Target className="h-3.5 w-3.5" />
                        Style
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {currentProfile.studyStyle}
                      </Badge>
                    </div>
                    <div>
                      <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-foreground">
                        <Trophy className="h-3.5 w-3.5" />
                        Goals
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {currentProfile.goals.map((goal) => (
                          <Badge key={goal} variant="outline" className="text-xs">
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="absolute -bottom-20 left-0 right-0 flex items-center justify-center gap-6 z-20">
            <Button
              size="lg"
              variant="outline"
              className="h-14 w-14 rounded-full border-2 border-red-500 bg-background text-red-500 hover:bg-red-50 hover:text-red-600 shadow-md transition-transform hover:scale-110"
              onClick={() => handleSwipe("left")}
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-12 w-12 rounded-full border-2 border-yellow-500 bg-background text-yellow-500 hover:bg-yellow-50 hover:text-yellow-600 shadow-md transition-transform hover:scale-110"
            >
              <Sparkles className="h-5 w-5" />
            </Button>

            <Button
              size="lg"
              className="h-16 w-16 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-transform hover:scale-110"
              onClick={() => handleSwipe("right")}
            >
              <Heart className="h-8 w-8 fill-current" />
            </Button>
          </div>
        </div>
      </div>

      {/* Match Popup */}
      {showMatchPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-md border-border bg-card p-8 text-center shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="mb-6 flex justify-center relative">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-yellow-600 shadow-xl">
                  <Heart className="h-12 w-12 text-white fill-white animate-pulse" />
                </div>
              </div>
            </div>
            <h2 className="mb-2 text-3xl font-bold text-card-foreground italic">{"It's a Match!"}</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              You and <span className="font-semibold text-primary">{currentProfile.name}</span> can now study together!
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/chat" className="w-full">
                <Button className="w-full h-12 text-lg bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-bold shadow-lg">
                  Start Chatting
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="mt-2 text-muted-foreground hover:text-foreground"
                onClick={handleClosePopup}
              >
                Keep Searching
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
