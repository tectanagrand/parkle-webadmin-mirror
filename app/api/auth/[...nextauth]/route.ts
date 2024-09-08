import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios, { isAxiosError } from "axios";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
        expo_push_token: { type: "text" },
      },
      async authorize(credentials, req) {
        try {
          const { data } = await axios.post(
            `${process.env.APIURL}/api/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
              expo_push_token: "local",
            }
          );
          const user = data.data;
          if (user) {
            return user;
          }
          return;
        } catch (error: any) {
          if (isAxiosError(error)) {
            console.error(error.response);
            if (Array.isArray(error.response?.data.message)) {
              throw new Error(error.response?.data.message.join(" /n"));
            }
            throw new Error(error.response?.data.message);
          } else {
            console.error(error);
            throw new Error(error.message);
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});

export { handler as GET, handler as POST };
