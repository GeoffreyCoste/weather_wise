import NextAuth from "next-auth/next"
import { NextAuthOptions  } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
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

                // If no error and we have user data, return it
                if (response.ok && user) {
                  return user;
                }
                // Return null if user data could not be retrieved
                return null;
            },
        }),
    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({token, user, session, trigger}) {

            if (trigger === "update" && session?.favourites) {
                token.favourites = session.favourites;
            }

            if (trigger === "update" && session?.firstName && session?.lastName && session.location) {
                token.firstName = session.firstName;
                token.lastName = session.lastName;
                token.location = session.location;
            }

            if (trigger === "update" && session?.image) {
                token.picture = session.image;
            }

            // Pass some user data to token
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    picture: user.image,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    mobile: user.mobile,
                    preference: user.preference,
                    location: user.location,
                }
            }

            return token;
        },
        async session({session, token, user}) {
            // Pass user data from token to session
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    image: token.picture,
                    firstName: token.firstName,
                    lastName: token.lastName,
                    email: token.email,
                    mobile: token.mobile,
                    preference: token.preference,
                    location: token.location,
                }
            };
        },
    },
    session: {
        strategy: "jwt"
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }