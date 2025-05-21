"use client"

import { Button } from "@/components/ui/button"
import { Maximize2 } from "lucide-react"
import FullscreenButton from "../WindowMax"

export default function CourseHeader({ course, onAiAssistantToggle }) {
  return (
    <header className="bg-white border-b border-gray-200 p-2 flex items-center justify-between flex-wrap">
      <div className="flex items-center justify-center">
        <h3 className="font-bold">{course.title}</h3>
        {/* <span className="text-sm text-gray-500">
          {course.currentSection}/{course.totalSections} • {course.currentLesson.duration}
        </span> */}
      </div>

      <div className="flex items-center">
        <Button variant="ghost" size="sm" className="mr-2" onClick={onAiAssistantToggle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          AI Assistant
        </Button>

        {/* <Button variant="ghost" size="icon"> */}
        {/* <Maximize2 className="h-5 w-5" /> */}
        {/* <FullscreenButton /> */}
        {/* </Button> */}
      </div>
    </header>
  )
}
