import CredentialsProvider from "next-auth/providers/credentials"

export const authConfig2 = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
                role: {},
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.BACKEND_URL}/login/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                        role: credentials.role,
                    }),
                })

                const data = await res.json()

                if (!res.ok) throw new Error(data?.detail || "Login failed")

                return {
                    id: data.user.id,
                    role: credentials.role,
                    token: data.token,
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
                token.token = user.token
            }
            return token
        },
        async session({ session, token }) {
            session.profile = {
                id: token.id,
                role: token.role,
            }
            session.token = token.token
            return session
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}
