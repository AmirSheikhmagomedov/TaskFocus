import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
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

    const { taskListName } = body

    const newTaskList = await prisma.taskList.create({
      data: {
        name: taskListName,
        userId: foundUser.id,
      },
    })

    await prisma.user.update({
      where: {
        id: token?.id,
      },
      data: {
        taskLists: {
          connect: {
            id: newTaskList.id,
          },
        },
      },
      include: {
        taskLists: true,
      },
    })

    return NextResponse.json(newTaskList)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create a list' },
      { status: 409 }
    )
  }
}
