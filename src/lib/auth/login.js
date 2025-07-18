// lib/auth/login.js
"use server";

export async function loginWithBackend({ email, password }) {
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/login/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, role: 'school' }),
        });

        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data?.detail || "Login failed");
        }

        // Only return token and user.id to session (if not using NextAuth)
        return {
            success: true,
            token: data.token,
            userId: data.user.id,
        };
    } catch (err) {
        return {
            success: false,
            error: err.message,
        };
    }
}
