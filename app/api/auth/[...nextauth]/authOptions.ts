import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { Adapter } from 'next-auth/adapters'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/server/db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Enter your email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        })

        if (!res.ok) {
          throw new Error(`${await res.text()}`)
        }

        const user = await res.json()

        if (res.ok && user) {
          return user
        } else return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.createdAt = user.createdAt
        token.id = user.id
        token.provider = account?.provider
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.createdAt = token.createdAt
        session.user.provider = token.provider as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
  },
}
