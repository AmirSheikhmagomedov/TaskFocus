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

    const { task, taskListId } = body

    const foundTaskList = await prisma.taskList.findUnique({
      where: {
        id: taskListId,
      },
    })

    if (!foundTaskList) {
      return new NextResponse('List was not found', { status: 404 })
    }

    const newTask = await prisma.task.create({
      data: {
        task,
        taskListId: foundTaskList?.id,
      },
    })

    await prisma.taskList.update({
      where: {
        id: taskListId,
      },

      data: {
        tasks: {
          connect: {
            id: newTask.id,
          },
        },
      },

      include: {
        tasks: true,
      },
    })

    return NextResponse.json(newTask)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create a task' },
      { status: 409 }
    )
  }
}
