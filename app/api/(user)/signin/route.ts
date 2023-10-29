import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { prisma } from '@/server/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { email, password } = body

    if (!email || !password) {
      return new NextResponse('Missing email or password', { status: 400 })
    }

    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        taskLists: true,
      },
    })

    if (foundUser && !foundUser.password) {
      return new NextResponse('Try another authentication method', {
        status: 404,
      })
    }

    if (!foundUser) {
      return new NextResponse('User was not found', { status: 404 })
    }

    const isMatch = await bcrypt.compare(password, foundUser.password!)

    if (!isMatch) {
      return new NextResponse('Password is incorrect', {
        status: 409,
      })
    }

    const {
      password: userPassword,
      name,
      emailVerified,
      ...userWithoutPassword
    } = foundUser

    return NextResponse.json(userWithoutPassword)
  } catch {
    return new NextResponse('Failed to sign in. Try again', { status: 409 })
  }
}
