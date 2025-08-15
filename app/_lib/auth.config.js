import Google from "next-auth/providers/google";

const authConfig = {
    basePath: '/api/auth',
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        })
    ],
    callbacks: {
        authorized({auth, request}) {
            return !!auth?.user;
        }
    },
    pages: {
        signIn: "/login",
    }
    // Remove session: { strategy: "jwt" } since you're using database adapter
};

export default authConfig;
