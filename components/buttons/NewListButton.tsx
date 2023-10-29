'use client'

import { memo } from 'react'
import Image from 'next/image'
import cross from '../../public/icons/cross.svg'

function NewListButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="h-[72px] w-[100%] flex gap-[16px] items-center px-[20px] hover:bg-[#eeeeee] transition-colors"
      onClick={onClick}
    >
      <Image
        src={cross}
        width={20}
        height={20}
        alt="Cross"
        className="select-none"
      />
      <p className="text-[16px] font-medium leading-[100%] select-none">
        New list
      </p>
    </button>
  )
}

export default memo(NewListButton)
