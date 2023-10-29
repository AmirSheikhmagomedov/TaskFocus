import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { prisma } from '@/server/db'

export async function DELETE(req: NextRequest) {
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

    const deletedTask = await prisma.task.delete({
      where: {
        id: taskId,
      },
    })

    if (!deletedTask) {
      return new NextResponse('Task was not found', { status: 404 })
    }

    return NextResponse.json(deletedTask)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete a task' },
      { status: 409 }
    )
  }
}
