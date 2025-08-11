import Google from "next-auth/providers/google";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Edge/runtime-safe: only checks session existence, no DB calls!
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
};

export default authConfig;
