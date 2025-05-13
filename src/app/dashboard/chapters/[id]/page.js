import { Suspense } from "react"
import ChaptersAccordion from "./chapters-accordion"
import { ChevronLeft } from 'lucide-react'
import Link from "next/link"

// This would be replaced with your actual data fetching function
async function getSubjectData(subjectId) {
    // Simulate server request delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock data structure with chapters and topics
    const subject = {
        id: subjectId,
        subject: "Physics",
        description: "Learn the fundamentals of physics",
    }

    const chapters = [
        {
            id: "1",
            title: "Mechanics",
            description: "Study of motion and forces",
            progress: 75,
            status: "in-progress",
            topics: [
                {
                    id: "1-1",
                    title: "Understanding Kinematics",
                    type: "Interactive Simulation",
                    grade: "Grade 8",
                    subject: "Physics",
                    tags: ["Simulation", "Animated Video", "+2"],
                    image:
                        "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    progress: 80,
                    status: "in-progress",
                },
                {
                    id: "1-2",
                    title: "Exploring the Laws of Motion",
                    type: "Virtual Lab",
                    grade: "Grade 8",
                    subject: "Physics",
                    tags: ["Quiz", "Animated Video", "+2"],
                    image:
                        "https://images.pexels.com/photos/2085832/pexels-photo-2085832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    progress: 60,
                    status: "in-progress",
                },
            ],
        },
        {
            id: "2",
            title: "Optics",
            description: "Study of light and its properties",
            progress: 30,
            status: "in-progress",
            topics: [
                {
                    id: "2-1",
                    title: "Understanding Light: Reflection & Refraction",
                    type: "Interactive Simulation",
                    grade: "Grade 8",
                    subject: "Physics",
                    tags: ["Simulation", "Animated Video", "+2"],
                    image:
                        "https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    progress: 30,
                    status: "in-progress",
                },
            ],
        },
        {
            id: "3",
            title: "Electricity",
            description: "Study of electric charges and currents",
            progress: 0,
            status: "not-started",
            topics: [
                {
                    id: "3-1",
                    title: "Electric Circuits",
                    type: "Virtual Lab",
                    grade: "Grade 8",
                    subject: "Physics",
                    tags: ["Simulation", "Quiz", "+2"],
                    image:
                        "https://images.pexels.com/photos/577514/pexels-photo-577514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    progress: 0,
                    status: "not-started",
                },
            ],
        },
    ]

    return { subject, chapters }
}

export default async function SubjectPage({ params }) {
    const { subject, chapters } = await getSubjectData(params.id)

    if (!subject) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Subject not found</h2>
                    <Link href="/" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                        Go Back to Dashboard
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <section className="flex justify-center items-center w-full bg-gray-50">
            <div className="w-[95%] md:w-[90%] lg:w-[90%] mt-5">
                <div className=" min-h-screen ">
                    <div className="mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex items-center gap-4 mb-4">
                                <Link
                                    href="/dashboard/"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Link>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{subject.subject}</h1>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                    <span>Completed</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                    <span>In Progress</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="w-3 h-3 rounded-full bg-gray-300"></span>
                                    <span>Not Started</span>
                                </div>
                            </div>
                        </div>

                        {/* Chapters Accordion */}
                        <Suspense fallback={<div className="text-center py-10">Loading chapters...</div>}>
                            <ChaptersAccordion chapters={chapters} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </section>
    )
}
