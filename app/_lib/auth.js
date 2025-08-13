// app/_lib/auth.js
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import PostgresAdapter from "@auth/pg-adapter";
import { pool } from "./database";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
    adapter: PostgresAdapter(pool),
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        })
    ],
    callbacks: {
        authorized({auth, request}) {
            return !!auth?.user;
        },
        async signIn({user}) {
            try {
                const existingGuest = await getGuest(user.email);
                if (!existingGuest){
                    await createGuest({fullName: user.name, email: user.email});
                }
                return true;
            } catch {
                return false;
            }
        },
        async session({session}){
            const guest = await getGuest(session.user.email);
            session.user.guestId = guest.id;
            return session;
        }
    },
    pages: {
        signIn: "/login",
    }
};

export const {auth, signIn, signOut, handlers: {GET, POST}} = NextAuth(authConfig);
