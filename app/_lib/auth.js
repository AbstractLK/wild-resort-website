import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import authConfig from "./auth.config";
import { createGuest, getGuest } from "./data-service";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user }) {
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest) {
          await createGuest({ fullName: user.name, email: user.email });
        }
        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const guest = await getGuest(session.user.email);
      if (guest) {
        session.user.guestId = guest.id;
      }
      return session;
    },
  },
});
