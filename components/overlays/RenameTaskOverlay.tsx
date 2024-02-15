'use client'

import { KeyboardEvent, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTasks } from '@/store/store'

export default function RenameTaskOverlay({
  onClickAway,
}: {
  onClickAway: () => void
}) {
  const { updateTask, currentTaskId: taskId, currentTaskName } = useTasks()

  const [value, setValue] = useState<string>(currentTaskName)

  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickAway()
      updateTask(value, taskId)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  return (
    <div className="w-[100vw] h-[100dvh] absolute top-0 left-0 flex items-center justify-center">
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
        value={value}
        onChange={e => {
          setValue(e.target.value)
        }}
        onKeyDown={handleSubmit}
        type="text"
        className="max-w-[280px] w-[100%] h-[36px] border-[1px] border-[#B8B8B8] rounded-[4px] focus: outline-none focus:border-[#007aff] hover:border-[#007aff] px-[16px] placeholder:text-[14px] z-[1]"
        placeholder="New task name name"
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
