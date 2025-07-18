"use client"

import { LogOutIcon } from "lucide-react"
import { signOut } from "next-auth/react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export const LogOut = () => {
    const router = useRouter()

    const handleLogout = async () => {
        // Clear client-side cookies
        Cookies.remove("auth_token")
        Cookies.remove("user_role")

        await signOut({
            redirect: false, // disable default redirect
        })

        router.push("/") // or use your custom route
    }

    return (
        <Button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-destructive hover:bg-destructive/80"
        >
            <LogOutIcon className="w-4 h-4" />
            {/* Log out */}
        </Button>
    )
}
