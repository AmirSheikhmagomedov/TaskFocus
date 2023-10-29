'use client'

import { MouseEvent } from 'react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import GitHubIcon from '../../public/icons/github.svg'

export default function GitHubButton({
  className,
  onClick,
}: {
  className?: string
  onClick: () => void
}) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick ? onClick() : null
    signIn('github', { callbackUrl: '/' })
  }

  return (
    <button
      className={`flex items-center justify-center gap-[12px] w-[280px] h-[48px] rounded-[4px] bg-[#25282D] text-white hover:bg-[#000000] focus:outline-none focus:border-[1px] focus:border-[#007AFF] ${className}`}
      onClick={handleClick}
    >
      <Image src={GitHubIcon} width={20} height={20} alt="Github icon" />
      Continue with GitHub
    </button>
  )
}
