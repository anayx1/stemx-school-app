'use client';

import { useRouter } from 'next/navigation';
import { subjectsData } from '@/app/lib/data'; // Adjust path as needed

const Chapters = ({ params }) => {
    const { id: subjectId } = params;
    const router = useRouter();
    const subject = subjectsData.find(s => s.id === subjectId);

    const chapters = [
        {
            id: 1,
            title: "Understanding Light: Reflection & Refraction",
            type: "Interactive Simulation",
            grade: "Grade 8",
            subject: "Physics",
            tags: ["Simulation", "ImmVRLab"],
            image: "https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 2,
            title: "Periodic Table of Elements",
            type: "Animated Simulation",
            grade: "Grade 8",
            subject: "Chemistry",
            tags: ["Animated Video", "Virtual Lab"],
            image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 3,
            title: "Introduction to Kinematics",
            type: "Animated Video",
            grade: "Grade 8",
            subject: "Physics",
            tags: ["Simulation", "Virtual Lab"],
            image: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 4,
            title: "Cell Structure & Function",
            type: "Interactive Simulation",
            grade: "Grade 8",
            subject: "Biology",
            tags: ["Simulation", "Cell"],
            image: "https://images.pexels.com/photos/3825379/pexels-photo-3825379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 5,
            title: "Exploring the Laws of Motion",
            type: "Virtual Lab",
            grade: "Grade 8",
            subject: "Physics",
            tags: ["Simulation", "Lab"],
            image: "https://images.pexels.com/photos/2085832/pexels-photo-2085832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 6,
            title: "Electric Circuits",
            type: "Virtual Lab",
            grade: "Grade 8",
            subject: "Physics",
            tags: ["Virtual Lab", "Interactive"],
            image: "https://images.pexels.com/photos/577514/pexels-photo-577514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
    ];

    if (!subject) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Subject not found</h2>
                    <button
                        onClick={() => router.push('/')}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        Go Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        {/* <button
                            onClick={() => navigate('/')}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button> */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{subject.subject}</h1>
                            <p className="text-gray-600">Select a chapter to continue learning</p>
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

                {/* Chapters Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {chapters.map((chapter) => (
                        <div
                            key={chapter.id}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group cursor-pointer"
                        >
                            <div className="relative h-48">
                                <img
                                    src={chapter.image}
                                    alt={chapter.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium transform scale-95 group-hover:scale-100 transition-transform">
                                        Start Learning
                                    </button>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {chapter.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{chapter.title}</h3>

                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                    <span>{chapter.type}</span>
                                    <span>•</span>
                                    <span>{chapter.grade}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                        <span className="text-sm text-gray-600">In Progress</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">45%</span>
                                </div>

                                <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-yellow-500 rounded-full w-[45%]"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Chapters;