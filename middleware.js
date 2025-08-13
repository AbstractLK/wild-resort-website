import NextAuth from "next-auth";
import authConfig from "./app/_lib/auth.config";

export const { auth: middleware } = NextAuth(authConfig);

export default middleware;

export const config = {
    matcher: ["/account/:path*"]
};
