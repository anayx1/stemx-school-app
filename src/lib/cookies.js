// lib/cookies.js
import { cookies } from 'next/headers';

export const AUTH_COOKIE_NAME = 'auth-token';

export const setAuthCookie = (token) => {
    if (typeof window !== 'undefined') {
        // Client-side cookie setting
        document.cookie = `${AUTH_COOKIE_NAME}=${token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
    }
};

export const getAuthCookie = () => {
    if (typeof window !== 'undefined') {
        const cookies = document.cookie.split(';');
        const authCookie = cookies.find(cookie =>
            cookie.trim().startsWith(`${AUTH_COOKIE_NAME}=`)
        );
        return authCookie ? authCookie.split('=')[1] : null;
    }
    return null;
};

export const removeAuthCookie = () => {
    if (typeof window !== 'undefined') {
        document.cookie = `${AUTH_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
};

// Server-side cookie utilities
export const setServerAuthCookie = (token) => {
    const cookieStore = cookies();
    cookieStore.set({
        name: AUTH_COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/',
    });
};

export const getServerAuthCookie = () => {
    const cookieStore = cookies();
    return cookieStore.get(AUTH_COOKIE_NAME)?.value || null;
};