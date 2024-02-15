'use client'

import { MouseEvent } from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import GoogleIcon from '../../public/icons/google.svg'

export default function GoogleButton({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick ? onClick() : null
    signIn('google', { callbackUrl: '/' })
  }

  return (
    <button
      className={`flex items-center justify-center gap-[12px] w-[280px] h-[48px] border-[1px] border-[#B8B8B8] rounded-[4px] hover:bg-[#FAFAFA] focus:outline-none focus:border-[#007AFF] ${className}`}
      onClick={handleClick}
    >
      <Image src={GoogleIcon} width={20} height={20} alt="Google icon" />
      Continue with Google
    </button>
  )
}
