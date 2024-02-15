import { KeyboardEvent, useRef } from 'react'
import { useTasks, useTaskLists } from '@/store/store'

export default function AddTaskInput({
  disableAnimation,
  enableAnimation,
}: {
  disableAnimation: () => void
  enableAnimation: () => void
}) {
  const { createTask } = useTasks()
  const { activeTaskListId, taskLists } = useTaskLists()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current?.value) {
      createTask(
        inputRef.current?.value!,
        activeTaskListId!,
        disableAnimation,
        enableAnimation
      )
      inputRef.current.value = ''
    }
  }

  return (
    <div className="h-[72px] flex items-center justify-center px-[24px]">
      <input
        ref={inputRef}
        onKeyDown={handleSubmit}
        disabled={!activeTaskListId || !taskLists.length}
        type="text"
        className="max-w-[500px] w-[100%] h-[36px] border-[1px] border-[#B8B8B8] rounded-[4px] focus: outline-none focus:border-[#007aff] hover:border-[#007aff] px-[16px] placeholder:text-[14px] placeholder:select-none disabled:hover:border-[#B8B8B8]"
        placeholder="Add a task"
        maxLength={150}
      />
    </div>
  )
}
