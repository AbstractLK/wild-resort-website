
import NextAuth from "next-auth";
import authConfig from "./auth-config";
import { createGuest, getGuest } from "./data-service";

// Full NextAuth config for API routes and server logic
const fullAuthConfig = {
  ...authConfig,
  callbacks: {
    async signIn({ user }) {
      try {
        const existingGuest = await getGuest(user.email); // DB call OK here
        if (!existingGuest) {
          await createGuest({ fullName: user.name, email: user.email });
        }
        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const guest = await getGuest(session.user.email); // DB call OK here
      session.user.guestId = guest?.id;
      return session;
    },
    // If using authorized callback for SSR/API
    ...(authConfig.callbacks || {})
  },
  pages: authConfig.pages,
  providers: authConfig.providers
};

// Export for use in app/api/auth/route.js
export const { auth, signIn, signOut, handlers } = NextAuth(fullAuthConfig);
