'use client'
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import { getFeaturedBlogs } from "@/lib/blogs-data"

export default async function BlogSection() {
    const featuredBlogs = await getFeaturedBlogs(4)

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <section className="py-5 w-full">
            <div className=" mx-auto px-4 bg-white rounded-2xl w-full py-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Blog Posts</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Stay updated with the latest insights, tutorials, and industry trends from our expert team.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {featuredBlogs.map((blog) => (
                        <Card key={blog.id} className="flex flex-col h-full hover:shadow-lg transition-shadow bg-gray-50">
                            <div className="relative">
                                <img
                                    src={blog.image || "/placeholder.svg"}
                                    alt={blog.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <Badge className="absolute top-3 left-3" variant="secondary">
                                    {blog.category}
                                </Badge>
                            </div>

                            <CardHeader className="flex-grow">
                                <CardTitle className="text-lg line-clamp-2 hover:text-blue-600 transition-colors">
                                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                                </CardTitle>
                                <CardDescription className="line-clamp-3">{blog.excerpt}</CardDescription>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <div className="flex items-center text-sm text-gray-500 space-x-4">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        <span>{formatDate(blog.publishedAt)}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        <span>{blog.readTime} min</span>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="pt-0">
                                <Button asChild variant="outline" className="w-full">
                                    <Link href={`/blog/${blog.slug}`}>Read More</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* View All CTA */}
                <div className="text-center">
                    <Button asChild size="lg">
                        <Link href="/blog">View All Blog Posts</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
