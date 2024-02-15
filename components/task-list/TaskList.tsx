'use client'
import {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useState,
  memo,
} from 'react'
import { useTaskLists, useTasks } from '@/store/store'
import TaskItem from './TaskListItem'

interface Props {
  setIsRenameTaskOverlayOpen: Dispatch<SetStateAction<boolean>>
}

export default memo(
  forwardRef<HTMLDivElement, Props>(function TaskList(props, ref) {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [openedId, setOpenedId] = useState<number>()
    const { activeTaskListId } = useTaskLists()
    const { fetchTasks, tasks, setCurrentTaskId, setCurrentTaskName } =
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
        className="h-[308px] border-b-[1px] border-[#B8B8B8] px-[24px] overflow-y-scroll overflow-x-hidden relative"
      >
        {!tasks.filter(task => task.taskListId === activeTaskListId).length && (
          <p className="text-[18px] text-[#939393] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] select-none">
            No tasks
          </p>
        )}
        {activeTaskListId &&
          tasks
            .filter(task => task.taskListId === activeTaskListId)
            .sort((a, b) =>
              a.completed > b.completed ? 1 : b.completed > a.completed ? -1 : 0
            )
            .map((task, index, array) => {
              return (
                <TaskItem
                  setIsRenameTaskOverlayOpen={props.setIsRenameTaskOverlayOpen}
                  setCurrentTaskId={setCurrentTaskId}
                  setCurrentTaskName={setCurrentTaskName}
                  moreThanFive={array.length >= 5}
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
)
