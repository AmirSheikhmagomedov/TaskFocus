'use client'

import { useCallback, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { AnimatePresence } from 'framer-motion'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useTaskLists, useTasks } from '@/store/store'
import AddTaskInput from './AddTaskInput'
import Lists from './list/Lists'
import NewListButton from './buttons/NewListButton'
import Search from './list/Search'
import TaskList from './task-list/TaskList'
import TaskListHeader from './task-list/TaskListHeader'
import OverlayInput from './overlays/NewListInputOverlay'
import RenameTaskListOverlay from './overlays/RenameTaskListOverlay'
import RenameTaskOverlay from './overlays/RenameTaskOverlay'
import SearchTaskList from './task-list/SearchTaskList'

export default function TaskFocusApp() {
  const { isLoading, fetchTaskLists, activeTaskListId } = useTaskLists()

  const { fetchTasks, search } = useTasks()

  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false)
  const [isRenameOverlayOpen, setIsRenameOverlayOpen] = useState<boolean>(false)
  const [isRenameTaskOverlayOpen, setIsRenameTaskOverlayOpen] =
    useState<boolean>(false)

  const [taskAnimation, enableTaskAnimation] = useAutoAnimate()

  const disableTask = () => {
    enableTaskAnimation(false)
  }
  const enableTask = () => {
    enableTaskAnimation(true)
  }

  const onOverlayOpen = useCallback(() => {
    setIsOverlayOpen(true)
  }, [])

  const onRenameOverlayOpen = useCallback(() => {
    setIsRenameOverlayOpen(true)
  }, [])

  const onRenameTaskOverlayOpen = useCallback(() => {
    setIsRenameTaskOverlayOpen(true)
  }, [])

  useEffect(() => {
    fetchTaskLists()
    fetchTasks()
  }, [fetchTaskLists, isLoading, fetchTasks])

  useEffect(() => {
    if (isOverlayOpen || isRenameOverlayOpen || isRenameTaskOverlayOpen) {
      document.body.style.overflow = 'hidden'
    }
    if (!isOverlayOpen && !isRenameOverlayOpen && !isRenameTaskOverlayOpen) {
      document.body.style.overflow = 'auto'
    }
  }, [isOverlayOpen, isRenameOverlayOpen, isRenameTaskOverlayOpen])

  return (
    <>
      {isLoading && (
        <div className="bg-white w-[100%] h-[480px] rounded-[4px] shadow-md flex items-center justify-center">
          <BeatLoader color="#007aff" />
        </div>
      )}
      {!isLoading && (
        <div className="rounded-[4px] shadow-md flex max-[880px]:flex-col max-[880px]:items-center max-[880px]:gap-[40px] max-[880px]:shadow-none">
          <div className="max-w-[300px] max-h-[480px] w-[100%] h-[480px] bg-white border-r-[1px] border-[#B8B8B8] rounded-l-[4px] z-[0] max-[880px]:max-w-[100%] max-[880px]:h-[392px] max-[880px]:rounded-[4px] max-[880px]:border-r-[0px]">
            <Search />
            <Lists setIsRenameOverlayOpen={onRenameOverlayOpen} />
            <NewListButton onClick={onOverlayOpen} />
          </div>
          {activeTaskListId && !search && (
            <div className="max-w-[550px] w-[100%] bg-white max-h-[480px] h-[480px] rounded-r-[4px] max-[880px]:border-[1px] max-[880px]:border-[#B8B8B8] max-[880px]:rounded-[4px]">
              <TaskListHeader />
              <TaskList
                ref={taskAnimation}
                setIsRenameTaskOverlayOpen={onRenameTaskOverlayOpen}
              />
              <AddTaskInput
                disableAnimation={disableTask}
                enableAnimation={enableTask}
              />
            </div>
          )}
          {search && (
            <SearchTaskList
              ref={taskAnimation}
              setIsRenameTaskOverlayOpen={onRenameTaskOverlayOpen}
            />
          )}
          {!activeTaskListId && !search && (
            <div
              className="max-w-[550px] w-[100%] bg-white max-h-[480px] h-[480px] rounded-r-[4px]
						 flex items-center justify-center max-[880px]:border-[1px] max-[880px]:border-[#B8B8B8] max-[880px]:rounded-[4px]"
            >
              <p className="text-[18px] text-[#939393] select-none">
                No task list selected
              </p>
            </div>
          )}
        </div>
      )}
      <AnimatePresence>
        {isOverlayOpen && (
          <OverlayInput
            onClickAway={() => {
              setIsOverlayOpen(false)
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isRenameOverlayOpen && (
          <RenameTaskListOverlay
            onClickAway={() => {
              setIsRenameOverlayOpen(false)
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isRenameTaskOverlayOpen && (
          <RenameTaskOverlay
            onClickAway={() => {
              setIsRenameTaskOverlayOpen(false)
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
