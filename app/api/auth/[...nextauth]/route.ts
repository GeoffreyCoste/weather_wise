import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email address"},
                password: { label: "Password", type: "password", placeholder: "Password"},
            },
            async authorize(credentials, request) {
                const response = await fetch("http://localhost:3000/api/login", {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                });

                const user = await response.json();

                return user || null;
            },
        }),
    ],
    pages: {
        signIn: "/login"
    },
});

export { handler as GET, handler as POST }