import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { prisma } from '@/server/db'
import { TaskList } from '@/store/store'

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

    const tasksList = await prisma.taskList.findMany({
      where: {
        userId: foundUser.id,
      },
    })

    const tasks = await Promise.all(
      tasksList.map((taskList: TaskList) => {
        return prisma.task.findMany({
          where: {
            taskListId: taskList.id,
          },
        })
      })
    )

    return NextResponse.json(tasks.flat())
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 409 }
    )
  }
}
