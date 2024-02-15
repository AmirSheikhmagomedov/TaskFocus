import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { prisma } from '@/server/db'

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

    const { newName, taskListId } = body

    const updatedTaskList = await prisma.taskList.update({
      where: {
        id: taskListId,
      },
      data: {
        name: newName,
      },
    })

    if (!updatedTaskList) {
      return new NextResponse('List was not found', { status: 404 })
    }

    return NextResponse.json(updatedTaskList)
  } catch {
    return NextResponse.json(
      { error: 'Failed to update a list' },
      { status: 409 }
    )
  }
}
