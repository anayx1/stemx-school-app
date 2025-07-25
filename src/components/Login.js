"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { EyeIcon, EyeOffIcon, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { signIn } from "next-auth/react"
import Cookies from "js-cookie"

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})
    const router = useRouter()

    // Clear errors when user starts typing
    const clearErrors = () => {
        setError("")
        setFieldErrors({})
    }

    // Validate form fields
    const validateForm = () => {
        const errors = {}

        if (!email.trim()) {
            errors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "Please enter a valid email address"
        }

        if (!password.trim()) {
            errors.password = "Password is required"
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters"
        }

        setFieldErrors(errors)
        return Object.keys(errors).length === 0
    }

    // Map NextAuth error codes to user-friendly messages
    const getErrorMessage = (error) => {
        switch (error) {
            case "CredentialsSignin":
                return "Invalid email or password. Please check your credentials and try again."
            case "EmailNotVerified":
                return "Please verify your email address before signing in."
            case "AccountNotFound":
                return "No account found with this email address."
            case "TooManyRequests":
                return "Too many login attempts. Please try again later."
            case "Configuration":
                return "Authentication service is temporarily unavailable. Please try again later."
            case "AccessDenied":
                return "Access denied. Please contact support if this persists."
            case "Verification":
                return "Verification failed. Please try again."
            default:
                return error || "An unexpected error occurred. Please try again."
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        clearErrors()

        // Validate form before submission
        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: email.trim(),
                password,
                role: 'school',
            })

            if (result?.ok) {
                try {
                    const { getSession } = await import("next-auth/react")
                    const session = await getSession()

                    // Store token in cookie with error handling
                    if (session?.authToken) {
                        try {
                            Cookies.set('auth-token', session.authToken, {
                                expires: 7,
                                secure: process.env.NODE_ENV === 'production',
                                sameSite: 'strict'
                            })
                        } catch (cookieError) {
                            console.error("Failed to set auth cookie:", cookieError)
                            // Continue anyway as this might not be critical
                        }
                    }

                    // Successful login - redirect to dashboard
                    router.push("/dashboard")
                } catch (sessionError) {
                    console.error("Session error:", sessionError)
                    setError("Login successful but failed to retrieve session. Please try refreshing the page.")
                }
            } else {
                // Handle authentication errors
                const errorMessage = getErrorMessage(result?.error)
                setError(errorMessage)

                // Log detailed error for debugging (remove in production)
                console.error("Login failed:", {
                    error: result?.error,
                    status: result?.status,
                    ok: result?.ok
                })
            }
        } catch (error) {
            console.error("Unexpected error during login:", error)

            // Handle different types of errors
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                setError("Network error. Please check your internet connection and try again.")
            } else if (error.name === 'AbortError') {
                setError("Request timed out. Please try again.")
            } else {
                setError("An unexpected error occurred. Please try again later.")
            }
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

            {/* Error Alert */}
            {error && (
                <Alert variant="destructive" className="bg-red-900/20 border-red-900/50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-red-200">
                        {error}
                    </AlertDescription>
                </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-gray-300">
                        Email
                    </label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            clearErrors()
                        }}
                        placeholder="designer@example.com"
                        required
                        className={`bg-[#2a2a2a] border-[#3a3a3a] text-white ${fieldErrors.email ? 'border-red-500 focus:border-red-500' : ''
                            }`}
                        autoComplete="email"
                        disabled={isLoading}
                    />
                    {fieldErrors.email && (
                        <p className="text-sm text-red-400 mt-1">{fieldErrors.email}</p>
                    )}
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
                            onChange={(e) => {
                                setPassword(e.target.value)
                                clearErrors()
                            }}
                            placeholder="password"
                            required
                            className={`bg-[#2a2a2a] border-[#3a3a3a] text-white pr-10 ${fieldErrors.password ? 'border-red-500 focus:border-red-500' : ''
                                }`}
                            autoComplete="current-password"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            disabled={isLoading}
                        >
                            {showPassword ? (
                                <EyeOffIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    {fieldErrors.password && (
                        <p className="text-sm text-red-400 mt-1">{fieldErrors.password}</p>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Signing in...
                        </div>
                    ) : (
                        "Sign in"
                    )}
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
