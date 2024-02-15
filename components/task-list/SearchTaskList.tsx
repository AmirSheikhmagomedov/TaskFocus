'use client'
import {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useState,
} from 'react'
import { useTasks } from '@/store/store'
import TaskItem from './TaskListItem'

interface Props {
  setIsRenameTaskOverlayOpen: Dispatch<SetStateAction<boolean>>
}

export default forwardRef<HTMLDivElement, Props>(function TaskList(props, ref) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [openedId, setOpenedId] = useState<number>()
  const { fetchTasks, tasks, search, setCurrentTaskName, setCurrentTaskId } =
    useTasks()

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const onMenuCLick = (listId: number) => {
    setOpenedId(listId)
    setIsMenuOpen(true)
    document.body.style.pointerEvents = 'none'
  }

  const onMenuCLickAway = () => {
    setIsMenuOpen(false)
    document.body.style.pointerEvents = 'all'
  }

  return (
    <div
      ref={ref}
      className="max-w-[550px] w-[100%] h-[480px] px-[24px] overflow-y-scroll overflow-x-hidden relative bg-white pt-[4px] max-[880px]:border-[1px] max-[880px]:border-[#B8B8B8] max-[880px]:rounded-[4px]"
    >
      {!tasks.filter(
        task => task.task.toLowerCase().indexOf(search.toLowerCase()) !== -1
      ).length && (
        <p className="text-[18px] text-[#939393] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] select-none">
          No tasks found
        </p>
      )}
      {tasks
        .filter(
          task => task.task.toLowerCase().indexOf(search.toLowerCase()) !== -1
        )
        .sort((a, b) =>
          a.completed > b.completed ? 1 : b.completed > a.completed ? -1 : 0
        )
        .map((task, index, array) => {
          return (
            <TaskItem
              setIsRenameTaskOverlayOpen={props.setIsRenameTaskOverlayOpen}
              setCurrentTaskId={setCurrentTaskId}
              setCurrentTaskName={setCurrentTaskName}
              moreThanFive={array.length >= 8}
              key={task.id}
              isLast={array.length == index + 1}
              onMenuClick={onMenuCLick}
              onMenuClickAway={onMenuCLickAway}
              isMenuOpen={isMenuOpen}
              openedId={openedId!}
              task={task}
            />
          )
        })}
    </div>
  )
})
