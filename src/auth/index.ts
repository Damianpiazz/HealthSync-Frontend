import NextAuth from "next-auth";
import { authProviders } from "./providers";
import { authCallbacks } from "./callbacks";
import { authConfig } from "./config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: authProviders,
  callbacks: authCallbacks,
});