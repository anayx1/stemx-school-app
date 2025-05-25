"use client"

// Mock blog data - in a real app, this would come from a database
const blogs = [
    {
        id: "understanding-web-security",
        title: "Understanding Web Security: A Comprehensive Guide",
        slug: "understanding-web-security",
        excerpt:
            "Learn the fundamentals of web security, common vulnerabilities, and how to protect your applications from cyber threats.",
        content: `
      <h2>Introduction to Web Security</h2>
      <p>Web security is a critical aspect of modern web development that every developer should understand. In this comprehensive guide, we'll explore the fundamental concepts, common vulnerabilities, and best practices for securing web applications.</p>
      
      <h3>Common Web Vulnerabilities</h3>
      <p>The OWASP Top 10 provides a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications.</p>
      
      <h4>1. Injection Attacks</h4>
      <p>Injection flaws, such as SQL, NoSQL, OS, and LDAP injection, occur when untrusted data is sent to an interpreter as part of a command or query.</p>
      
      <h4>2. Broken Authentication</h4>
      <p>Application functions related to authentication and session management are often implemented incorrectly, allowing attackers to compromise passwords, keys, or session tokens.</p>
      
      <h3>Best Practices for Web Security</h3>
      <ul>
        <li>Always validate and sanitize user input</li>
        <li>Use HTTPS everywhere</li>
        <li>Implement proper authentication and authorization</li>
        <li>Keep your dependencies up to date</li>
        <li>Use Content Security Policy (CSP)</li>
      </ul>
      
      <h3>Conclusion</h3>
      <p>Web security is an ongoing process that requires constant vigilance and updates. By following these best practices and staying informed about the latest threats, you can significantly improve the security posture of your web applications.</p>
    `,
        author: {
            name: "John Smith",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Senior Security Engineer with 10+ years of experience in cybersecurity",
        },
        category: "Security",
        tags: ["web security", "cybersecurity", "OWASP", "best practices"],
        publishedAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
        readTime: 8,
        featured: true,
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
    },
    {
        id: "react-performance-optimization",
        title: "React Performance Optimization: Tips and Tricks",
        slug: "react-performance-optimization",
        excerpt:
            "Discover advanced techniques to optimize your React applications for better performance and user experience.",
        content: `
      <h2>Optimizing React Performance</h2>
      <p>React applications can become slow as they grow in complexity. This guide covers essential techniques to keep your React apps fast and responsive.</p>
      
      <h3>1. Use React.memo for Component Memoization</h3>
      <p>React.memo is a higher-order component that memoizes the result of a component. It only re-renders if its props have changed.</p>
      
      <h3>2. Optimize Re-renders with useMemo and useCallback</h3>
      <p>These hooks help prevent unnecessary calculations and function recreations on every render.</p>
      
      <h3>3. Code Splitting with React.lazy</h3>
      <p>Split your code into smaller chunks that can be loaded on demand, reducing the initial bundle size.</p>
      
      <h3>4. Virtual Scrolling for Large Lists</h3>
      <p>When dealing with large datasets, virtual scrolling can significantly improve performance by only rendering visible items.</p>
      
      <h3>Conclusion</h3>
      <p>Performance optimization is crucial for providing a great user experience. Implement these techniques gradually and measure their impact on your application.</p>
    `,
        author: {
            name: "Sarah Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Frontend Developer and React enthusiast",
        },
        category: "Development",
        tags: ["react", "performance", "optimization", "javascript"],
        publishedAt: "2024-01-10T14:30:00Z",
        updatedAt: "2024-01-10T14:30:00Z",
        readTime: 6,
        featured: true,
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    },
    {
        id: "modern-css-techniques",
        title: "Modern CSS Techniques for Better Web Design",
        slug: "modern-css-techniques",
        excerpt: "Explore the latest CSS features and techniques that will revolutionize your web design workflow.",
        content: `
      <h2>Modern CSS: Beyond the Basics</h2>
      <p>CSS has evolved significantly in recent years. Let's explore some modern techniques that can enhance your web design capabilities.</p>
      
      <h3>CSS Grid and Flexbox</h3>
      <p>These layout systems provide powerful tools for creating complex, responsive layouts with minimal code.</p>
      
      <h3>CSS Custom Properties (Variables)</h3>
      <p>Custom properties allow you to store values that can be reused throughout your stylesheet, making maintenance easier.</p>
      
      <h3>Container Queries</h3>
      <p>A game-changing feature that allows components to respond to their container's size rather than the viewport.</p>
      
      <h3>CSS Subgrid</h3>
      <p>Subgrid extends CSS Grid to allow nested grids to participate in the sizing of their parent grid.</p>
      
      <h3>Conclusion</h3>
      <p>These modern CSS techniques open up new possibilities for creating beautiful, responsive, and maintainable web designs.</p>
    `,
        author: {
            name: "Mike Chen",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "UI/UX Designer and CSS specialist",
        },
        category: "Design",
        tags: ["css", "web design", "layout", "responsive"],
        publishedAt: "2024-01-08T09:15:00Z",
        updatedAt: "2024-01-08T09:15:00Z",
        readTime: 5,
        featured: false,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    },
    {
        id: "javascript-es2024-features",
        title: "JavaScript ES2024: New Features You Should Know",
        slug: "javascript-es2024-features",
        excerpt:
            "Stay up-to-date with the latest JavaScript features introduced in ES2024 and how they can improve your code.",
        content: `
      <h2>What's New in ES2024</h2>
      <p>JavaScript continues to evolve with new features that make development more efficient and enjoyable. Let's explore the latest additions in ES2024.</p>
      
      <h3>Array Grouping</h3>
      <p>The new Object.groupBy() method allows you to group array elements based on a callback function.</p>
      
      <h3>Promise.withResolvers()</h3>
      <p>This new method provides a more convenient way to create promises with external resolve and reject functions.</p>
      
      <h3>Temporal API</h3>
      <p>A modern date and time API that addresses the shortcomings of the Date object.</p>
      
      <h3>Pattern Matching</h3>
      <p>A powerful feature that allows you to match values against patterns and extract data.</p>
      
      <h3>Conclusion</h3>
      <p>These new features demonstrate JavaScript's continued evolution toward a more powerful and developer-friendly language.</p>
    `,
        author: {
            name: "Alex Rodriguez",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "JavaScript developer and technical writer",
        },
        category: "Development",
        tags: ["javascript", "es2024", "features", "programming"],
        publishedAt: "2024-01-05T16:45:00Z",
        updatedAt: "2024-01-05T16:45:00Z",
        readTime: 7,
        featured: true,
        image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop",
    },
    {
        id: "database-optimization-strategies",
        title: "Database Optimization Strategies for High Performance",
        slug: "database-optimization-strategies",
        excerpt:
            "Learn proven strategies to optimize your database performance and handle large-scale applications efficiently.",
        content: `
      <h2>Database Performance Optimization</h2>
      <p>Database performance is crucial for application success. This guide covers essential optimization strategies for high-performance applications.</p>
      
      <h3>Indexing Strategies</h3>
      <p>Proper indexing is one of the most effective ways to improve query performance. Learn when and how to create indexes.</p>
      
      <h3>Query Optimization</h3>
      <p>Writing efficient queries can dramatically improve performance. Understand query execution plans and optimization techniques.</p>
      
      <h3>Database Normalization vs Denormalization</h3>
      <p>Balance between data integrity and performance by understanding when to normalize and when to denormalize.</p>
      
      <h3>Caching Strategies</h3>
      <p>Implement effective caching at different levels to reduce database load and improve response times.</p>
      
      <h3>Conclusion</h3>
      <p>Database optimization is an ongoing process that requires monitoring, analysis, and continuous improvement.</p>
    `,
        author: {
            name: "David Wilson",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Database Administrator and Performance Specialist",
        },
        category: "Database",
        tags: ["database", "optimization", "performance", "sql"],
        publishedAt: "2024-01-03T11:20:00Z",
        updatedAt: "2024-01-03T11:20:00Z",
        readTime: 9,
        featured: false,
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    },
    {
        id: "mobile-first-design-principles",
        title: "Mobile-First Design Principles for Modern Web",
        slug: "mobile-first-design-principles",
        excerpt: "Master the art of mobile-first design to create exceptional user experiences across all devices.",
        content: `
      <h2>Mobile-First Design Approach</h2>
      <p>With mobile traffic dominating the web, mobile-first design has become essential. Learn how to create designs that work beautifully on all devices.</p>
      
      <h3>Understanding Mobile-First</h3>
      <p>Mobile-first means designing for mobile devices first, then progressively enhancing for larger screens.</p>
      
      <h3>Touch-Friendly Interfaces</h3>
      <p>Design interfaces that work well with touch interactions, considering finger size and gesture patterns.</p>
      
      <h3>Performance Considerations</h3>
      <p>Mobile devices often have limited resources, so performance optimization is crucial for mobile-first design.</p>
      
      <h3>Progressive Enhancement</h3>
      <p>Start with a solid mobile foundation and enhance the experience for larger screens and more capable devices.</p>
      
      <h3>Conclusion</h3>
      <p>Mobile-first design ensures your applications provide excellent experiences across all devices and screen sizes.</p>
    `,
        author: {
            name: "Emma Thompson",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "UX Designer specializing in mobile experiences",
        },
        category: "Design",
        tags: ["mobile", "design", "ux", "responsive"],
        publishedAt: "2024-01-01T08:00:00Z",
        updatedAt: "2024-01-01T08:00:00Z",
        readTime: 6,
        featured: false,
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
    },
]

// Get all unique categories
export const getCategories = () => {
    const categories = [...new Set(blogs.map((blog) => blog.category))]
    return categories.sort()
}

// API functions for server-side data fetching
export async function getAllBlogs({ category = null, search = null, sortBy = "newest", limit = null } = {}) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    let filteredBlogs = [...blogs]

    // Filter by category
    if (category && category !== "all") {
        filteredBlogs = filteredBlogs.filter((blog) => blog.category.toLowerCase() === category.toLowerCase())
    }

    // Filter by search term (title, excerpt, or category)
    if (search) {
        const searchLower = search.toLowerCase()
        filteredBlogs = filteredBlogs.filter(
            (blog) =>
                blog.title.toLowerCase().includes(searchLower) ||
                blog.excerpt.toLowerCase().includes(searchLower) ||
                blog.category.toLowerCase().includes(searchLower) ||
                blog.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
        )
    }

    // Sort blogs
    switch (sortBy) {
        case "newest":
            filteredBlogs.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
            break
        case "oldest":
            filteredBlogs.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt))
            break
        case "title":
            filteredBlogs.sort((a, b) => a.title.localeCompare(b.title))
            break
        default:
            break
    }

    // Limit results if specified
    if (limit) {
        filteredBlogs = filteredBlogs.slice(0, limit)
    }

    return filteredBlogs
}

export async function getFeaturedBlogs(limit = 4) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    return blogs
        .filter((blog) => blog.featured)
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .slice(0, limit)
}

export async function getBlogBySlug(slug) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    return blogs.find((blog) => blog.slug === slug) || null
}

export async function getRelatedBlogs(currentBlogId, limit = 3) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const currentBlog = blogs.find((blog) => blog.id === currentBlogId)
    if (!currentBlog) return []

    // Find blogs with similar categories or tags
    const relatedBlogs = blogs
        .filter((blog) => blog.id !== currentBlogId)
        .filter((blog) => blog.category === currentBlog.category || blog.tags.some((tag) => currentBlog.tags.includes(tag)))
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .slice(0, limit)

    return relatedBlogs
}
