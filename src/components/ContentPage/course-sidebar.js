"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

export default function CourseSidebar({ course }) {
  const [openSections, setOpenSections] = useState({
    [course.sections[0].id]: true,
  })

  const toggleSection = (sectionId) => {
    setOpenSections({
      ...openSections,
      [sectionId]: !openSections[sectionId],
    })
  }

  return (
    <div className="p-4">
      <div className="mb-4 pb-2 border-b border-gray-200">
        <h2 className="font-semibold">Course content</h2>
      </div>

      {course.sections.map((section, index) => (
        <Collapsible
          key={section.id}
          open={openSections[section.id]}
          onOpenChange={() => toggleSection(section.id)}
          className="mb-6"
        >
          <CollapsibleTrigger className="flex items-start justify-between w-full text-left">
            <div className="flex-1">
              <h3 className="font-medium text-sm">
                Section {index + 1}: {section.title}
              </h3>
              <div className="text-xs text-gray-500 mt-1">
                {section.completedLessons}/{section.lessons.length} • {section.totalDuration}
              </div>
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform ${openSections[section.id] ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-2 pl-1">
            {section.lessons.map((lesson) => (
              <div key={lesson.id} className="flex items-start py-2 group">
                <div className="mr-3 mt-0.5">
                  <Checkbox id={`lesson-${lesson.id}`} checked={lesson.completed} className="mt-1" />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor={`lesson-${lesson.id}`}
                    className={`text-sm cursor-pointer ${lesson.completed ? "text-gray-500" : "text-gray-900"}`}
                  >
                    {lesson.order}. {lesson.title}
                    {lesson.isActive && <span className="ml-2 text-blue-600">•</span>}
                  </label>
                  <div className="flex items-center mt-1">
                    {lesson.type === "video" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400 mr-1"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="10 8 16 12 10 16 10 8" />
                      </svg>
                    )}
                    <span className="text-xs text-gray-400">{lesson.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}
