import { prisma } from '@/server/db'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

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

    const { taskListId } = body

    const deletedTaskList = await prisma.taskList.delete({
      where: {
        id: taskListId,
      },
    })

    if (!deletedTaskList) {
      return new NextResponse('List was not found', { status: 404 })
    }

    return NextResponse.json(deletedTaskList)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete a list' },
      { status: 409 }
    )
  }
}
