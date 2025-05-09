import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const body = await request.json()
        const { email, password } = body

        // Here you would typically validate credentials against your database
        // This is a simplified example

        // Mock successful authentication response
        const authResponse = {
            user: {
                id: "user_123",
                email,
                name: "User Name",
            },
            token: "mock_jwt_token_" + Math.random().toString(36).substring(2),
        }

        // Set cookies with the authentication response
        const cookieStore = cookies()

        // Store the auth token in a cookie
        cookieStore.set("auth-token", authResponse.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        })

        // Store user info in a cookie (non-sensitive info only)
        cookieStore.set(
            "user-info",
            JSON.stringify({
                id: authResponse.user.id,
                email: authResponse.user.email,
                name: authResponse.user.name,
            }),
            {
                httpOnly: false, // Allow JavaScript access
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: "/",
            },
        )

        return NextResponse.json({ success: true, user: authResponse.user })
    } catch (error) {
        console.error("Sign-in error:", error)
        return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 500 })
    }
}
