// components/Header.js
"use client"

import { Bell, ChevronLeft, Menu } from "lucide-react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useMemo } from "react"
import { useSidebar } from "@/context/SidebarContext"

export default function Header() {
    const pathname = usePathname()
    const router = useRouter()
    const { toggleSidebar } = useSidebar()
    const pageTitle = 'Your School Name'
    // const pageTitle = useMemo(() => {
    //     if (!pathname || pathname === "/") return "Dashboard"
    //     const segments = pathname.split("/").filter(Boolean)
    //     const lastSegment = segments[segments.length - 1]
    //     return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
    // }, [pathname])



    return (
        <header className="bg-white shadow-sm border-b border-gray-200 px-3 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button onClick={toggleSidebar} className="md:hidden lg:hidden p-1 rounded hover:bg-gray-100 transition-colors">
                        <Menu className="w-6 h-6 text-gray-600" />
                    </button>

                    <button onClick={() => router.back()} className="hidden md:block p-1 rounded hover:bg-gray-100">
                        <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-gray-900" />
                    </button>


                    <h2 className="text-2xl font-bold">
                        {pageTitle}
                    </h2>
                </div>

                <div className="flex items-center space-x-4">
                    <Image src="/avatar.png" alt="User Avatar" width={30} height={30} className="w-8 h-8 rounded-full" />
                </div>
            </div>
        </header>
    )
}
