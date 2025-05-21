"use client"

import { useState } from "react"
import CourseHeader from "@/components/ContentPage/course-header"
import CourseSidebar from "@/components/ContentPage/course-sidebar"
import CourseContent from "@/components/ContentPage/course-content"
import CourseTabs from "@/components/ContentPage/course-tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import AiAssistant from "@/components/ContentPage/AiAssistant"

export default function CourseClientPage({ course }) {
  const [open, setOpen] = useState(false)
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Course Header */}
      <CourseHeader course={course} onAiAssistantToggle={() => setAiAssistantOpen(!aiAssistantOpen)} />

      <div className="flex flex-col md:flex-row lg:flex-row flex-1 relative">
        {/* Main Content Area */}
        <div className="flex-1 w-auto md:w-3/4 lg:w-3/4 overflow-y-auto">
          <CourseContent course={course} />

          {/* Course Tabs */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200">
            <CourseTabs course={course} />
          </div>
        </div>
        <div className=" w-auto lg:w-1/4 ">
          {/* Sidebar - hidden on mobile, shown on larger screens - NOW ON RIGHT SIDE */}
          <div className="sm:hidden lg:block md:block md:w-80 lg:w-80 border-l border-gray-200 overflow-y-auto">
            <CourseSidebar course={course} />
          </div>
        </div>

        {/* Mobile sidebar toggle button */}
        <div className="md:hidden lg:hidden sticky top-0 z-10 bg-white p-2 border-b border-gray-200">
          <Sheet open={open} onOpenChange={setOpen} side="right">
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span>Course Content</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-down"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <CourseSidebar course={course} />
            </SheetContent>
          </Sheet>
        </div>


      </div>

      {/* AI Assistant Chat Window */}
      <AiAssistant isOpen={aiAssistantOpen} onClose={() => setAiAssistantOpen(false)} />
    </div>
  )
}
