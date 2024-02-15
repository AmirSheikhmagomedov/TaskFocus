'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="w-[100vw] h-[100dvh] bg-[#007aff] flex items-center justify-center flex-col">
      <h1 className="text-[32px] text-white font-bold mb-[24px] text-center px-[20px]">
        Something went wrong!
      </h1>
      <button
        className="border-[1px] border-white p-[12px] text-white rounded-[4px] hover:bg-[#006aff] focus:bg-[#006aff] focus:outline-none"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
}
