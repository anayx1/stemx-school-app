import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CourseContent({ course }) {
  const currentLesson = course.currentLesson

  return (
    <div className="p-4">
      {/* <h2 className="text-2xl font-bold mb-6">{course.title}</h2> */}

      <Card className="mb-6">
        <CardContent className="p-0">
          {currentLesson.type === "video" && (
            <div className="relative pt-[56.25%] bg-black rounded-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={currentLesson.videoUrl}
                title={currentLesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {currentLesson.type === "article" && (
            <div className="prose max-w-none p-6">
              <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-8">
        {course.prevLesson ? (
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous Lesson
          </Button>
        ) : (
          <div></div>
        )}

        <div>
          <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
            Quiz
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          {course.nextLesson && (
            <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
              Next Lesson
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
