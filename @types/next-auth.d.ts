import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface User {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        mobile: string;
        preference: string;
        location: string;
    }

    interface Session extends DefaultSession {
        user?: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        mobile: string;
        preference: string;
        location: string;
    }
}