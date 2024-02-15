import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/server/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { email } = body

    const foundUser = await prisma.user.findFirst({
      where: {
        email,
        name: null,
      },
    })

    if (!foundUser) {
      return new NextResponse('User was not found', { status: 404 })
    }

    return NextResponse.json({ message: 'User found' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to find user' }, { status: 409 })
  }
}
