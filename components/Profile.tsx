'use client'

import Image from 'next/image'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import profile from '../public/images/no-profile-image.jpg'

export default function Profile() {
  const { data: session } = useSession()

  return (
    <Link
      href={'/profile'}
      className="flex color-white text-white gap-[8px] max-h-[24px] hover:text-[#DADADA]"
    >
      <Image
        src={session?.user.image ? session.user.image : profile}
        width={24}
        height={24}
        alt="Profile picture"
        className="rounded-[50%] self-start"
        crossOrigin="anonymous"
      />
      <span className="max-[880px]:hidden">{session?.user.email}</span>
      <span className="hidden max-[880px]:inline-block">Profile</span>
    </Link>
  )
}
