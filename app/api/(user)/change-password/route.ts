import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import bcrypt from 'bcrypt'
import { prisma } from '@/server/db'

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })

    const foundUser = await prisma.user.findUnique({
      where: {
        id: token?.id,
      },
    })

    if (!foundUser) {
      return new NextResponse('User was not found', { status: 404 })
    }

    const body = await req.json()

    const { newPassword } = body

    const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))

    const updatedUser = await prisma.user.update({
      where: {
        id: foundUser.id,
      },
      data: {
        password: hashedPassword,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to change the password' },
      { status: 409 }
    )
  }
}
