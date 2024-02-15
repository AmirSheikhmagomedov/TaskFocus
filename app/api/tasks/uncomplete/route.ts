import { prisma } from '@/server/db'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
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

    const { taskId } = body

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        completed: false,
      },
    })

    if (!updatedTask) {
      return new NextResponse('Task was not found', { status: 404 })
    }

    return NextResponse.json(updatedTask)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to complete a task' },
      { status: 409 }
    )
  }
}
