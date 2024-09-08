import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's postal address. */
      token: string;
    };
  }
}
