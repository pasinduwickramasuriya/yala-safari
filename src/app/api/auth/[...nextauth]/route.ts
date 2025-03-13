// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import prisma from '@/prisma'
// import bcrypt from "bcrypt"

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null
//         const user = await prisma.user.findUnique({ where: { email: credentials.email } })
//         if (!user) return null
//         const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
//         if (!isPasswordValid) return null
//         return { id: user.id.toString(), email: user.email, role: user.role }
//       }
//     })
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       if (token?.role) session.user.role = token.role
//       return session
//     },
//     async jwt({ token, user }) {
//       if (user) token.role = user.role
//       return token
//     }
//   },
//   pages: { signIn: "/admin/login" }
// }

// const handler = NextAuth(authOptions)
// export { handler as GET, handler as POST }



import NextAuth, { NextAuthOptions, Session, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from '@/lib/prisma'
import bcrypt from "bcrypt"
import { JWT } from "next-auth/jwt"

// Extend User type to include role
declare module "next-auth" {
  interface User {
    role: string
  }

  interface Session {
    user: {
      id: string
      email: string
      role: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        if (!user) return null
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
        if (!isPasswordValid) return null
        return { id: user.id.toString(), email: user.email, role: user.role } as User
      }
    })
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.role) session.user.role = token.role
      return session
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) token.role = user.role
      return token
    }
  },
  pages: { signIn: "/login" }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
