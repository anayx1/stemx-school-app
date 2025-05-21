"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star } from "lucide-react"

export default function CourseTabs({ course }) {
  return (
    <section className="w-full mx-auto">
      <div className="w-[95%] md-[w-90%] lg-[w-90%] justify-center items-center">

        <Tabs defaultValue="overview" className="w-full pl-2 md:pl-5 lg:pl-5">
          <div className="overflow-x-auto">
            <TabsList className="h-auto p-0 bg-transparent border-b rounded-none w-full justify-start">
              <TabsTrigger
                value="overview"
                className="px-4 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none"
              >
                Overview
              </TabsTrigger>
              {/* <TabsTrigger
            value="qa"
            className="px-4 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none"
          >
            Q&A
          </TabsTrigger> */}
              <TabsTrigger
                value="notes"
                className="px-4 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none"
              >
                Notes
              </TabsTrigger>
              {/* <TabsTrigger
            value="announcements"
            className="px-4 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none"
          >
            Announcements
          </TabsTrigger> */}
              {/* <TabsTrigger
            value="reviews"
            className="px-4 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none"
          >
            Reviews
          </TabsTrigger> */}
              <TabsTrigger
                value="tools"
                className="px-4 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none"
              >
                Learning tools
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-4 mt-0">
            <h3 className="text-xl font-bold mb-4">{course.title}</h3>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                <span className="font-medium">{course.rating}</span>
                <span className="text-gray-500 ml-1">({course.ratingCount} ratings)</span>
              </div>
              <div className="text-gray-500">{course.studentCount.toLocaleString()} students</div>
              <div className="ml-4 text-gray-500">{course.totalDuration} total</div>
            </div>
            <p className="text-gray-700">{course.description}</p>
          </TabsContent>

          <TabsContent value="qa" className="p-4 mt-0">
            <div className="text-center py-8 text-gray-500">No questions yet. Be the first to ask a question!</div>
          </TabsContent>

          <TabsContent value="notes" className="p-4 mt-0">
            <div className="text-center py-8 text-gray-500">You haven't taken any notes yet.</div>
          </TabsContent>

          <TabsContent value="announcements" className="p-4 mt-0">
            <div className="text-center py-8 text-gray-500">No announcements yet.</div>
          </TabsContent>

          <TabsContent value="reviews" className="p-4 mt-0">
            <div className="flex items-center mb-6">
              <Star className="h-8 w-8 text-yellow-400 mr-2 fill-yellow-400" />
              <div>
                <div className="text-2xl font-bold">{course.rating}</div>
                <div className="text-sm text-gray-500">{course.ratingCount} ratings</div>
              </div>
            </div>
            <div className="text-center py-4 text-gray-500">No reviews to display yet.</div>
          </TabsContent>

          <TabsContent value="tools" className="p-4 mt-0">
            <div className="text-center py-8 text-gray-500">No learning tools available for this course.</div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
