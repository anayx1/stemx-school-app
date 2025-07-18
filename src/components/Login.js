"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { signIn } from "next-auth/react"
import Cookies from "js-cookie"

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
                role: 'school',
            })

            if (result?.ok) {
                const { getSession } = await import("next-auth/react")
                const session = await getSession()

                // Store token in cookie
                if (session?.authToken) {
                    Cookies.set('auth-token', session.authToken, { expires: 7 })
                } router.push("/dashboard")
            } else {
                console.error("Login failed:", result?.error || "Invalid credentials")
            }
        } catch (error) {
            console.error("Unexpected error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md space-y-6 bg-[#1c1c1c] p-4 md:p-8 rounded-lg z-40">
            <div className="w-full flex items-center justify-center">
                <Image
                    src="/111.png"
                    width={70}
                    height={700}
                    alt="logo"
                    style={{ width: "auto", height: "80px" }}
                />
            </div>

            <h1 className="text-2xl font-bold text-white text-center">
                Sign in to your account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-gray-300">
                        Email
                    </label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="designer@example.com"
                        required
                        className="bg-[#2a2a2a] border-[#3a3a3a] text-white"
                        autoComplete="email"
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <label htmlFor="password" className="text-sm text-gray-300">
                            Password
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-sm text-gray-300 hover:text-white"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                            required
                            className="bg-[#2a2a2a] border-[#3a3a3a] text-white pr-10"
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOffIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
                <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isLoading}
                >
                    {isLoading ? "Signing in..." : "Sign in"}
                </Button>
            </form>
            <div className="text-center text-sm text-gray-300">
                Not registered?{" "}
                <Link href="/sign-up" className="text-white hover:underline">
                    Join us
                </Link>
            </div>
        </div>
    )
}
