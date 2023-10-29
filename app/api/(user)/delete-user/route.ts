import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { prisma } from '@/server/db'

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
      { error: 'Failed to delete a user' },
      { status: 409 }
    )
  }
}
