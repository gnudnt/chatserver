import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Upload, FileText, Download, Eye, Search } from "lucide-react"

export default function ResourcePage() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">Resource Library</h1>
            <p className="text-muted-foreground">Access and share study materials with your study group</p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              className="border-border bg-input pl-10 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Linear Algebra Notes", subject: "Mathematics", size: "2.5 MB", type: "PDF" },
            { title: "Quantum Physics Summary", subject: "Physics", size: "1.8 MB", type: "PDF" },
            { title: "Data Structures Cheat Sheet", subject: "Computer Science", size: "892 KB", type: "PDF" },
            { title: "Organic Chemistry Lab Manual", subject: "Chemistry", size: "4.2 MB", type: "PDF" },
            { title: "English Literature Essay Guide", subject: "English", size: "1.1 MB", type: "PDF" },
            { title: "Biology Cell Structure Diagrams", subject: "Biology", size: "3.7 MB", type: "PDF" },
          ].map((doc, index) => (
            <Card key={index} className="border-border bg-card">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-card-foreground">{doc.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {doc.subject} • {doc.size}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-border bg-secondary text-foreground hover:bg-secondary/80"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
