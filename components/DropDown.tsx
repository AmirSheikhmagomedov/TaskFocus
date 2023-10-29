'use client'

import { Dispatch, MouseEvent, SetStateAction, forwardRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import pencil from '../public/icons/pencil.svg'
import trashCan from '../public/icons/trash-can.svg'
import { useTaskLists, useTasks } from '@/store/store'

interface Props {
  biggerTop?: boolean
  taskListId?: string
  setRenameListId?: (renameListId: string) => void
  setIsRenameOverlayOpen?: Dispatch<SetStateAction<boolean>>
  setCurrentListName?: (currentListName: string) => void
  currentListName?: string
  setCurrentTaskName?: (currentTaskName: string) => void
  setCurrentTaskId?: (currentTaskId: string) => void
  setIsRenameTaskOverlayOpen?: Dispatch<SetStateAction<boolean>>
  currentTaskName?: string
  taskId?: string
}

export default forwardRef<HTMLDivElement, Props>(function Lists(props, ref) {
  const { deleteTask } = useTasks()
  const { deleteTaskList } = useTaskLists()

  const onRename = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (
      props.setIsRenameOverlayOpen &&
      props.setRenameListId &&
      props.setCurrentListName
    ) {
      props.setIsRenameOverlayOpen(true)
      props.setCurrentListName(props.currentListName!)
      props.setRenameListId(props.taskListId!)
    }

    if (
      props.setCurrentTaskId &&
      props.setCurrentTaskName &&
      props.setIsRenameTaskOverlayOpen
    ) {
      props.setIsRenameTaskOverlayOpen(true)
      props.setCurrentTaskName(props.currentTaskName!)
      props.setCurrentTaskId(props.taskId!)
    }
  }
  const onDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (props.taskId) deleteTask(props.taskId!)

    if (props.taskListId) deleteTaskList(props.taskListId!)
  }

  return (
    <motion.div
      className={`absolute flex top-1/2 right-[40px] transform -translate-y-1/2 bg-white w-[200px] h-[40px] rounded-[4px] text-[14px] transition-colors shadow-md z-[1000]`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      style={{
        pointerEvents: 'all',
      }}
    >
      <button
        className="flex h-[40px] w-[100%] items-center pl-[14px] gap-[8px] text-black hover:bg-[#F0F0F0] rounded-l-[4px] border-[1px] border-[#d9d9d9] border-r-[0px]"
        onClick={onRename}
      >
        <Image src={pencil} width={12} height={12} alt="Pencil" />
        Rename
      </button>
      <button
        className="flex h-[40px] w-[100%] bg-[#E92828] items-center justify-center text-white gap-[8px] hover:bg-[#c90d0d] transition-colors rounded-r-[4px]"
        onClick={onDelete}
      >
        <Image src={trashCan} width={14} height={15} alt="Pencil" />
        Delete
      </button>
    </motion.div>
  )
})
