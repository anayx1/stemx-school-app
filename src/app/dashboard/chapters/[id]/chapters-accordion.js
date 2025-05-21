"use client"

import { useState } from "react"
import { Bookmark, ChevronDown } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

export default function ChaptersAccordion({ chapters }) {
    const [expandedChapters, setExpandedChapters] = useState([chapters[0]?.id || ""])

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-500"
            case "in-progress":
                return "bg-yellow-500"
            default:
                return "bg-gray-300"
        }
    }

    return (
        <Accordion type="multiple" value={expandedChapters} onValueChange={setExpandedChapters} className="space-y-4 ">
            {chapters.map((chapter) => (
                <AccordionItem
                    key={chapter.id}
                    value={chapter.id}
                    className="border rounded-xl bg-gradient-to-r from-blue-50 to-blue-200 shadow-sm overflow-hidden"
                >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex flex-1 items-center justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`w-2 h-2 rounded-full ${getStatusColor(chapter.status)}`}></span>
                                        <h3 className="text-xl font-semibold text-gray-900">{chapter.title}</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">{chapter.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block">
                                    <span className="text-sm font-medium text-gray-900">{chapter.progress}%</span>
                                    <div className="mt-1 w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${getStatusColor(chapter.status)} rounded-full`}
                                            style={{ width: `${chapter.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                                {/* <ChevronDown className="h-5 w-5 transition-transform duration-200" /> */}
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-2">
                        <Link href={'/courses/photosynthesis-basics'}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {chapter.topics.map((topic) => (
                                <div
                                    key={topic.id}
                                    className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow overflow-hidden group cursor-pointer"
                                >
                                    <div className="relative h-48">
                                        <img
                                            src={topic.image || "/placeholder.svg"}
                                            alt={topic.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium transform scale-95 group-hover:scale-100 transition-transform">
                                                Start Learning
                                            </button>
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                                                <Bookmark className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {topic.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h3>

                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                            <span>{topic.type}</span>
                                            <span>•</span>
                                            <span>{topic.grade}</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${getStatusColor(topic.status)}`}></span>
                                                <span className="text-sm text-gray-600">
                                                    {topic.status === "completed"
                                                        ? "Completed"
                                                        : topic.status === "in-progress"
                                                            ? "In Progress"
                                                            : "Not Started"}
                                                </span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{topic.progress}%</span>
                                        </div>

                                        <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${getStatusColor(topic.status)} rounded-full`}
                                                style={{ width: `${topic.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        </Link>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
