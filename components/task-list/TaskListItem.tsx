'use client'
import {
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { isMobile } from 'react-device-detect'
import ClickAwayListener from 'react-click-away-listener'
import Image from 'next/image'
import { AnimatePresence } from 'framer-motion'
import { useTasks } from '@/store/store'
import darkDots from '../../public/icons/darkDots.svg'
import DropDown from '../DropDown'

export default function TaskListItem({
  isMenuOpen,
  openedId,
  moreThanFive,
  onMenuClick,
  onMenuClickAway,
  isLast,
  task,
  setCurrentTaskId,
  setCurrentTaskName,
  setIsRenameTaskOverlayOpen,
}: {
  onMenuClick: (listId: number) => void
  onMenuClickAway: () => void
  task: any
  moreThanFive: boolean
  isLast: boolean
  isMenuOpen: boolean
  openedId: number
  setCurrentTaskName: (currentTaskName: string) => void
  setCurrentTaskId: (currentTaskId: string) => void
  setIsRenameTaskOverlayOpen: Dispatch<SetStateAction<boolean>>
}) {
  const { completeTask, uncompleteTask } = useTasks()

  const [height, setHeight] = useState<number>(62)

  const label = useRef<HTMLLabelElement | null>(null)

  useLayoutEffect(() => {
    if (label.current) {
      const numberOfLines = Math.floor(
        label.current.scrollHeight /
          parseFloat(getComputedStyle(label.current).fontSize)
      )

      switch (numberOfLines) {
        case 2:
          setHeight(72)
          break
        case 4:
          setHeight(96)
          break
        case 5:
          setHeight(120)
          break
        case 7:
          setHeight(120)
          break
        case 8:
          setHeight(140)
          break
        case 9:
          setHeight(200)
          break
        case 11:
          setHeight(180)
          break
      }
    }
  }, [label])

  return (
    <div
      className={`group h-[100%] max-w-[500px] flex relative items-center gap-[16px] border-b-[${
        isLast && moreThanFive ? '0' : '1'
      }px] border-[#B8B8B8] cursor-pointer`}
      style={{
        maxHeight: height,
      }}
      onClick={() => {
        task.completed ? uncompleteTask(task.id) : completeTask(task.id)
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => {}}
        className="cursor-pointer relative peer shrink-0 appearance-none w-[20px] h-[20px] rounded-[50%] border-2 border-[#B8B8B8] bg-white checked:bg-[#efefef]"
      />
      <label
        ref={label}
        className={`text-[16px] leading-[140%] group-hover:text-[#007AFF] cursor-pointer max-w-[420px] break-words max-[880px]:max-w-[340px] max-[520px]:max-w-[300px] max-[480px]:max-w-[240px] max-[480px]:text-[14px] max-[420px]:max-w-[180px] max-[360px]:max-w-[140px] ${
          task.completed
            ? 'text-[#939393] group-hover:text-[#656565] line-through'
            : ''
        }`}
      >
        {task.task}
      </label>
      <svg
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="
      absolute 
      ml-[4px]
      hidden peer-checked:block pointer-events-none"
      >
        <path
          d="M11.7127 1.63294L5.45857 7.72014C5.07344 8.09329 4.45373 8.09329 4.06911 7.72014L0.288846 4.01517C-0.0962821 3.64103 -0.0962821 3.03611 0.288846 2.66146C0.671974 2.28932 1.29368 2.28932 1.67831 2.66146L4.76434 5.69158L10.3232 0.280233C10.7063 -0.093411 11.33 -0.093411 11.7127 0.280233C12.0958 0.652878 12.0958 1.2583 11.7127 1.63294Z"
          fill="black"
        />
      </svg>
      <button
        className={`opacity-0 pointer-events-none group-hover:opacity-[100%] group-hover:pointer-events-auto transition-opacity ml-auto ${
          isMobile ? 'opacity-[100%] pointer-events-auto' : ''
        }`}
        onClick={e => {
          e.stopPropagation()
          onMenuClick(task.id)
        }}
      >
        <Image src={darkDots} width={20} height={62} alt="Dots" />
      </button>
      {openedId === task.id && (
        <AnimatePresence>
          {isMenuOpen && (
            <ClickAwayListener onClickAway={onMenuClickAway}>
              <DropDown
                taskId={task.id}
                currentTaskName={task.task}
                setIsRenameTaskOverlayOpen={setIsRenameTaskOverlayOpen}
                setCurrentTaskName={setCurrentTaskName}
                setCurrentTaskId={setCurrentTaskId}
                biggerTop={height > 62}
              />
            </ClickAwayListener>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
