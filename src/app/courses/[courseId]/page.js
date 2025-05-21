import { getCourse } from "@/lib/api"
import CourseClientPage from "./CourseClientPage"

export async function generateMetadata({ params }) {
  const courseData = await getCourse(params.courseId)

  if (!courseData) {
    return {
      title: "Course Not Found",
    }
  }

  return {
    title: courseData.title,
    description: courseData.description,
  }
}

export default async function CoursePage({ params }) {
  // Server-side data fetching
  const courseData = await getCourse(params.courseId)

  if (!courseData) {
    return <div className="container mx-auto p-4">Course not found</div>
  }

  return <CourseClientPage course={courseData} />
}
