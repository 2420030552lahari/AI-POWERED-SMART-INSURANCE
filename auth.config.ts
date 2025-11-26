// Authentication configuration for the Smart Insurance application
export const authConfig = {
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/signup",
    error: "/auth/error",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard =
        nextUrl.pathname.startsWith("/customer") ||
        nextUrl.pathname.startsWith("/agent") ||
        nextUrl.pathname.startsWith("/admin")

      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // Redirect authenticated users from auth pages to their respective dashboard
        if (nextUrl.pathname.startsWith("/auth")) {
          return Response.redirect(new URL("/customer/dashboard", nextUrl))
        }
      }

      return true
    },
  },
  providers: [], // Add providers in auth.ts
} satisfies any

export default authConfig
