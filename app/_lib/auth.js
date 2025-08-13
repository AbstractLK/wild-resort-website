import NextAuth from "next-auth";
import PostgresAdapter from "@auth/pg-adapter";
import { pool } from "./database";
import authConfig from "./auth.config";
import { createGuest, getGuest } from "./data-service";

export const {auth, signIn, signOut, handlers: {GET, POST}} = NextAuth({
    ...authConfig,
    adapter: PostgresAdapter(pool),
    callbacks: {
        ...authConfig.callbacks,
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
    }
});
