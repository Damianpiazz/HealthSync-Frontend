import type { NextAuthConfig } from "next-auth";

export const authCallbacks: NextAuthConfig["callbacks"] = {
  async jwt({ token, account }) {
    if (account?.provider === "google") {
      token.provider = "google";
      token.accessToken = account.access_token;
    }

    return token;
  },

  async session({ session, token }) {
    session.accessToken = token.accessToken as string;
    return session;
  },
};