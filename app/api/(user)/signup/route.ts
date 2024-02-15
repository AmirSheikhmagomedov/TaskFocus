import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { prisma } from '@/server/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { email, password, isCheck } = body

    if (!email || !password) {
      return new NextResponse('Missing email or password', { status: 400 })
    }

    const isUsed = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (isUsed) {
      return new NextResponse(
        'User already exists. You can try another method',
        { status: 404 }
      )
    }

    if (!isCheck) {
      const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      })

      const {
        password: userPassword,
        emailVerified,
        name,
        ...newUserWithoutPassword
      } = newUser

      return NextResponse.json(newUserWithoutPassword, { status: 201 })
    } else {
      return NextResponse.json({ status: 'ok' }, { status: 200 })
    }
  } catch (error) {
    console.error(error)
    return new NextResponse('Failed to sign up. Try again', { status: 409 })
  }
}
