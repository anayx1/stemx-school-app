
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.BASE_URL}/auth/login/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(credentials),
                });

                const data = await res.json();

                if (res.ok && data?.token) {
                    return {
                        id: data.user.id,
                        token: data.token,
                    };
                }
                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.authToken = user.token;
                token.userId = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.authToken = token.authToken;
            session.userId = token.userId;
            return session;
        },
    },
});

export { handler as GET, handler as POST };
