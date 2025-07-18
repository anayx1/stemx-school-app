// 'use client'
// import Image from 'next/image'
// import Link from 'next/link'
// import { ArrowRight } from 'lucide-react'

// import {
//     Pagination,
//     PaginationContent,
//     PaginationEllipsis,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
// } from "@/components/ui/pagination"

// const blogs = [
//     {
//         id: 1,
//         title: "How AI Is Transforming Classrooms in 2025",
//         excerpt: "From smart grading to personalized learning, AI tools are reshaping how teachers and students interact...",
//         date: "June 10, 2025",
//         image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?q=80&w=996&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // AI in education
//         categories: ["Educational", "Technology"],
//         bgColor: "bg-blue-100",
//         href: "/blogs/ai-in-education"
//     },
//     {
//         id: 2,
//         title: "Top 10 Study Apps Every Student Should Use",
//         excerpt: "Maximize your learning potential with these must-have apps for productivity, note-taking, and focus...",
//         date: "June 12, 2025",
//         image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // study apps concept
//         categories: ["Educational", "Students"],
//         bgColor: "bg-green-100",
//         href: "/blogs/study-apps"
//     },
//     {
//         id: 3,
//         title: "Is Online Learning Still Effective in 2025?",
//         excerpt: "Post-pandemic education has evolved. Let's explore how hybrid and online platforms are serving students today...",
//         date: "June 15, 2025",
//         image: "https://images.unsplash.com/photo-1597933471507-1ca5765185d8?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // online learning
//         categories: ["Educational", "Tech"],
//         bgColor: "bg-yellow-100",
//         href: "/blogs/online-learning"
//     },
//     {
//         id: 4,
//         title: "Why Coding Should Be Taught in Every School",
//         excerpt: "As we enter a more tech-driven world, early coding education gives students a competitive edge...",
//         date: "June 17, 2025",
//         image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // coding education
//         categories: ["Educational", "Technology"],
//         bgColor: "bg-indigo-100",
//         href: "/blogs/coding-in-schools"
//     },
//     {
//         id: 5,
//         title: "Digital Wellbeing for Students in the Age of Screens",
//         excerpt: "With more screen time than ever, here's how students can stay mentally and physically balanced...",
//         date: "June 18, 2025",
//         image: "https://plus.unsplash.com/premium_photo-1682310173726-98697f7e2414?q=80&w=1212&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // digital wellbeing
//         categories: ["Students", "Tech"],
//         bgColor: "bg-pink-100",
//         href: "/blogs/digital-wellbeing"
//     },
//     {
//         id: 6,
//         title: "How EdTech Startups Are Revolutionizing Homework",
//         excerpt: "No more late-night cramming. These platforms are changing how students learn outside the classroom...",
//         date: "June 20, 2025",
//         image: "https://images.unsplash.com/photo-1669023414162-5bb06bbff0ec?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // edtech
//         categories: ["Technology", "Educational"],
//         bgColor: "bg-purple-100",
//         href: "/blogs/edtech-homework"
//     }
// ];



// const categoryColors = {
//     Educational: "bg-rose-400",
//     "Healthy Food": "bg-rose-400",
//     Lifestyles: "bg-rose-400",
//     News: "bg-rose-400",
//     Nutrition: "bg-rose-400",
//     "Tip & Tricks": "bg-rose-400"
// }


// export default function BlogSection() {
//     return (<>
//         <section className=" mx-auto px-4 flex justify-center ">
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-[95%]">
//                 {blogs.map((blog) => (
//                     <Link
//                         key={blog.id}
//                         href={blog.href}
//                         className="group block overflow-hidden rounded-2xl transition-transform "
//                     >
//                         <article className={`h-full border border-1 rounded-2xl bg-white`}>
//                             {/* Image */}
//                             <div className="relative aspect-[16/10] overflow-hidden ">
//                                 <img
//                                     src={blog.image}
//                                     alt={blog.title}
//                                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                                 />

//                                 {/* Categories */}
//                                 <div className="absolute left-4 top-4 flex flex-wrap gap-2">
//                                     {blog.categories.map((category) => (
//                                         <span
//                                             key={category}
//                                             className={`rounded-full bg-gradient2 px-3 py-1 text-xs font-medium text-white`}
//                                         >
//                                             {/* <span
//                                             key={category}
//                                             className={`rounded-full
//                                                  ${categoryColors[category]} px-3 py-1 text-xs font-medium text-white`}
//                                         > */}
//                                             {category}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Content */}
//                             <div className="space-y-2 p-3">
//                                 <time className="text-sm text-gray-600">{blog.date}</time>
//                                 <h3 className="text-lg font-semibold text-gray-900">
//                                     {blog.title}
//                                 </h3>

//                                 <p className="text-gray-600 text-sm">
//                                     {blog.excerpt}
//                                 </p>

//                                 <div className="inline-flex items-center gap-2 font-bold text-primary">
//                                     Read More
//                                     <ArrowRight className="h-4 w-4" />
//                                 </div>
//                             </div>
//                         </article>
//                     </Link>
//                 ))}
//             </div>
//         </section>
//         <section className='py-10'>
//             <Pagination>
//                 <PaginationContent>
//                     <PaginationItem>
//                         <PaginationPrevious href="/blogs/blog" />
//                     </PaginationItem>
//                     <PaginationItem>
//                         <PaginationLink href="/blogs/blog" isActive>1</PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                         <PaginationLink href="/blogs/blog" >
//                             2
//                         </PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                         <PaginationLink href="/blogs/blog">3</PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                         <PaginationEllipsis />
//                     </PaginationItem>
//                     <PaginationItem>
//                         <PaginationNext href="/blogs/blog" />
//                     </PaginationItem>
//                 </PaginationContent>
//             </Pagination>
//         </section>
//     </>
//     )
// }


import React from 'react'
import BlogSection from './BlogsSection'

const page = () => {
    return (
        <>
            <BlogSection />
        </>
    )
}

export default page