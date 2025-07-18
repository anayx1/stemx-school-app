// context/SidebarContext.js
"use client"

import { createContext, useContext, useState, useCallback } from "react"

const SidebarContext = createContext()

export const SidebarProvider = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    const toggleSidebar = useCallback(() => {
        if (typeof window !== "undefined" && window.innerWidth < 768) {
            setIsMobileOpen((prev) => !prev)
        } else {
            setIsCollapsed((prev) => !prev)
        }
    }, [])

    return (
        <SidebarContext.Provider value={{ isCollapsed, toggleSidebar, isMobileOpen }}>
            {children}
        </SidebarContext.Provider>
    )
}

export const useSidebar = () => {
    const context = useContext(SidebarContext)
    if (!context) throw new Error("useSidebar must be used within SidebarProvider")
    return context
}
