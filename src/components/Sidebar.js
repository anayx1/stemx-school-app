// components/Sidebar.js
"use client"

import {
    BarChart3, BookOpen, Users, GraduationCap, TrendingUp,
    DollarSign, Settings, HelpCircle, ChevronLeft, Rss, UserRound
} from "lucide-react"

import { useSidebar } from "@/context/SidebarContext"
import { usePathname } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"
import Image from "next/image"
import { LogOut } from "./Logout"

const menuItems = [
    { icon: BarChart3, label: "Dashboard", link: "/dashboard" },
    { icon: BookOpen, label: "Classes", link: "/classes" },
    { icon: Users, label: "Students", link: "/students" },
    { icon: UserRound, label: "Teachers", link: "/teachers" },
    { icon: Rss, label: "Blogs", link: "/blogs" },
    { icon: Settings, label: "Settings", link: "/settings" },
    { icon: HelpCircle, label: "Help & Support", link: "/help" },
]

export default function Sidebar() {
    const { isCollapsed, toggleSidebar, isMobileOpen } = useSidebar()
    const pathname = usePathname()

    return (
        <>
            {/* Overlay for mobile */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <aside
                className={clsx(
                    "bg-gradient3 text-white h-full md:h-screen lg:h-screen transition-all duration-300 flex flex-col z-40",
                    {
                        "w-64": !isCollapsed,
                        "w-16": isCollapsed,
                        "fixed top-0 left-0 h-full md:static lg:static ": true,
                        "translate-x-0": isMobileOpen,
                        "-translate-x-full md:translate-x-0 lg:translate-x-0": !isMobileOpen,
                    }
                )}
            >
                {/* Logo + Toggle */}
                <div className="p-4 flex items-center justify-between border-b border-[#427d9d]">
                    {!isCollapsed &&
                        <div className="flex justify-center items-center">
                            <Image
                                src={'/seedling.png'}
                                width={400}
                                height={400}
                                alt="logo"
                                className="w-auto h-10" />
                        </div>
                        // <h1 className="text-xl font-bold">Create2Innovate</h1>
                    }
                    <button
                        onClick={toggleSidebar}
                        className="p-1 hover:bg-[#427d9d] rounded transition-colors"
                    >
                        <ChevronLeft className={`w-5 h-5 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
                    </button>
                </div>

                {/* Menu */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {menuItems.map((item, index) => {
                            const isActive = pathname.startsWith(item.link)
                            return (
                                <li key={index}>
                                    <Link
                                        href={item.link}
                                        className={`flex items-center p-3 md:p-2 lg:p-1 rounded-lg transition-colors ${isActive
                                            ? "bg-[#427d9d] text-white"
                                            : "text-white hover:bg-[#427d9d] hover:text-white"
                                            }`}
                                        onClick={() => {
                                            if (window.innerWidth < 768) toggleSidebar() // Close on mobile nav
                                        }}
                                    >
                                        <item.icon className="w-5 h-5 lg:my-2" />
                                        {!isCollapsed && <span className="ml-3">{item.label}</span>}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                {!isCollapsed && (
                    <div className="p-4 border-t border-[#164863] flex justify-between items-center">
                        <div className="flex items-center">
                            <img src="/avatar.png" alt="Admin User" className="w-10 h-10 rounded-full" />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-white">Admin User</p>
                                <p className="text-xs text-gray-300">Administrator</p>
                            </div>
                        </div>
                        <LogOut />
                    </div>
                )}
            </aside>
        </>
    )
}
