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
        async session({session, user, token}) {
            // Handle both database sessions and JWT sessions
            try {
                if (session?.user?.email) {
                    const guest = await getGuest(session.user.email);
                    if (guest) {
                        session.user.guestId = guest.id;
                        // Ensure name is available
                        if (!session.user.name && guest.fullName) {
                            session.user.name = guest.fullName;
                        }
                    }
                }
            } catch (error) {
                console.error("Session callback error:", error);
            }
            return session;
        }
    }
});
