
import NextAuth from "next-auth";
import authConfig from "./app/_lib/auth-config";

// Initialize NextAuth on Edge (NO db calls here)
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/account"], // Paths you want to protect
};
