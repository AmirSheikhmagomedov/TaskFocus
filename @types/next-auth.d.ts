import { Image } from 'next/image'
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'

import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      createdAt: Date
      email: string
      image?: string
      provider: string
    } & DefaultSession
  }

  interface User extends DefaultUser {
    id: string
    email: string
    image: string
    createdAt: Date
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
    createdAt: Date
  }
}
