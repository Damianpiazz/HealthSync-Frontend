export const authConfig = {
  basePath: "/auth",
  session: {
    strategy: "jwt" as const,
  },
};