"use client"
import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const blogs = [
    {
        id: 1,
        title: "How AI Is Transforming Classrooms in 2025",
        excerpt:
            "From smart grading to personalized learning, AI tools are reshaping how teachers and students interact with educational content.",
        date: "June 10, 2025",
        readTime: "5 min read",
        image:
            "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?q=80&w=996&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categories: ["Educational", "Technology"],
        author: "Dr. Sarah Johnson",
        href: "/blogs/ai-in-education",
    },
    {
        id: 2,
        title: "Top 10 Study Apps Every Student Should Use",
        excerpt:
            "Maximize your learning potential with these must-have apps for productivity, note-taking, and focus enhancement.",
        date: "June 12, 2025",
        readTime: "7 min read",
        image:
            "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categories: ["Educational", "Students"],
        author: "Mike Chen",
        href: "/blogs/study-apps",
    },
    {
        id: 3,
        title: "Is Online Learning Still Effective in 2025?",
        excerpt:
            "Post-pandemic education has evolved. Let's explore how hybrid and online platforms are serving students today.",
        date: "June 15, 2025",
        readTime: "6 min read",
        image:
            "https://images.unsplash.com/photo-1597933471507-1ca5765185d8?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categories: ["Educational", "Tech"],
        author: "Emma Rodriguez",
        href: "/blogs/online-learning",
    },
    {
        id: 4,
        title: "Why Coding Should Be Taught in Every School",
        excerpt:
            "As we enter a more tech-driven world, early coding education gives students a competitive edge in their future careers.",
        date: "June 17, 2025",
        readTime: "8 min read",
        image:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categories: ["Educational", "Technology"],
        author: "Alex Thompson",
        href: "/blogs/coding-in-schools",
    },
    {
        id: 5,
        title: "Digital Wellbeing for Students in the Age of Screens",
        excerpt:
            "With more screen time than ever, here's how students can stay mentally and physically balanced in the digital age.",
        date: "June 18, 2025",
        readTime: "4 min read",
        image:
            "https://plus.unsplash.com/premium_photo-1682310173726-98697f7e2414?q=80&w=1212&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categories: ["Students", "Wellness"],
        author: "Dr. Lisa Park",
        href: "/blogs/digital-wellbeing",
    },
    {
        id: 6,
        title: "How EdTech Startups Are Revolutionizing Homework",
        excerpt:
            "No more late-night cramming. These platforms are changing how students learn outside the classroom environment.",
        date: "June 20, 2025",
        readTime: "6 min read",
        image:
            "https://images.unsplash.com/photo-1669023414162-5bb06bbff0ec?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categories: ["Technology", "Educational"],
        author: "James Wilson",
        href: "/blogs/edtech-homework",
    },
]

const categoryColors = {
    Educational: "bg-gradient-to-r from-blue-500 to-blue-600",
    Technology: "bg-gradient-to-r from-purple-500 to-purple-600",
    Students: "bg-gradient-to-r from-green-500 to-green-600",
    Tech: "bg-gradient-to-r from-indigo-500 to-indigo-600",
    Wellness: "bg-gradient-to-r from-pink-500 to-pink-600",
}

export default function BlogSection() {
    return (
        <>
            <section className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-2xl font-bold text-gray-900 mb-4">Latest Educational Insights</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Stay updated with the latest trends, tips, and innovations in education and technology
                        </p>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {blogs.map((blog) => (
                            <Link key={blog.id} href={blog.href} className="group block">
                                <article className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full group-hover:-translate-y-2">
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={blog.image || "/placeholder.svg"}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Categories */}
                                        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                                            {blog.categories.map((category) => (
                                                <span
                                                    key={category}
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm ${categoryColors[category] || "bg-gradient-to-r from-gray-500 to-gray-600"}`}
                                                >
                                                    {category}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Read Time Badge */}
                                        <div className="absolute right-4 top-4">
                                            <span className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {blog.readTime}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 space-y-4">
                                        {/* Date and Author */}
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <time>{blog.date}</time>
                                            </div>
                                            <span className="font-medium">{blog.author}</span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                                            {blog.title}
                                        </h3>

                                        {/* Excerpt */}
                                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{blog.excerpt}</p>

                                        {/* Read More */}
                                        <div className="pt-2">
                                            <div className="inline-flex items-center gap-2 font-semibold text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
                                                Read More
                                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pagination Section */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Pagination className="justify-center">
                        <PaginationContent className="gap-2">
                            <PaginationItem>
                                <PaginationPrevious
                                    href="/blogs/blog"
                                    className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="/blogs/blog" isActive className="bg-blue-600 text-white hover:bg-blue-700">
                                    1
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink
                                    href="/blogs/blog"
                                    className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                >
                                    2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink
                                    href="/blogs/blog"
                                    className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                >
                                    3
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis className="text-gray-400" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext
                                    href="/blogs/blog"
                                    className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </section>
        </>
    )
}
