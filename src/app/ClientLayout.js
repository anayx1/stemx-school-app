// app/ClientLayout.js
"use client"

import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import { SidebarProvider } from "@/context/SidebarContext"
import { usePathname } from "next/navigation"

export default function ClientLayout({ children }) {
    const pathname = usePathname()

    // Define paths where layout should be hidden
    const hiddenRoutes = ["/auth", "/login", "/register", '/']

    // Check if the current path matches any hidden route
    const shouldHideLayout = hiddenRoutes.includes(pathname)

    if (shouldHideLayout) {
        return <SidebarProvider>
            <div className="flex h-[97dvh] bg-gray-100">
                <div className="flex-1 flex flex-col">
                    <main className="flex-1 overflow-auto">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    }
    return (
        <SidebarProvider>
            <div className="flex h-[97dvh] bg-gray-100">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 overflow-auto">

                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}
