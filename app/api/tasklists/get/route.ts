import { prisma } from '@/server/db'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
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

    const taskLists = await prisma.taskList.findMany({
      where: {
        userId: foundUser.id,
      },
    })

    return NextResponse.json(taskLists)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch task lists' },
      { status: 409 }
    )
  }
}
