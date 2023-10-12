import { prisma } from '@/server/db'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req })

    const foundUser = await prisma.user.delete({
      where: {
        id: token?.id,
      },
    })

    if (!foundUser) {
      return new NextResponse('User was not found', { status: 404 })
    }

    return new NextResponse('Account was deleted')
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create a list' },
      { status: 409 }
    )
  }
}
