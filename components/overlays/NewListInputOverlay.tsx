'use client'
import { KeyboardEvent, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTaskLists } from '@/store/store'

export default function NewListOverlayInput({
  onClickAway,
}: {
  onClickAway: () => void
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { createTaskList } = useTaskLists()

  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current?.value.length! >= 2) {
      onClickAway()
      createTaskList(inputRef.current?.value!)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  return (
    <div
      className="w-[100vw] h-[100dvh] absolute top-0 left-0 flex items-center justify-center"
      style={{ marginTop: window.scrollY }}
    >
      <motion.div
        className="w-[100vw] h-[100dvh] absolute top-0 left-0 bg-black opacity-[75%] z-0"
        onClick={onClickAway}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.input
        autoFocus
        ref={inputRef}
        onKeyDown={handleSubmit}
        type="text"
        className="max-w-[280px] w-[100%] h-[36px] border-[1px] border-[#B8B8B8] rounded-[4px] focus: outline-none focus:border-[#007aff] hover:border-[#007aff] px-[16px] placeholder:text-[14px] z-[1]"
        placeholder="New list name"
        maxLength={50}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        autoComplete="off"
      />
    </div>
  )
}
