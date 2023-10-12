'use client'

import { prisma } from '@/server/db'
import { useSession } from 'next-auth/react'

export default function Session() {
  const { data, status } = useSession()

  return <pre>{JSON.stringify({ data }, null, 2)}</pre>
}
