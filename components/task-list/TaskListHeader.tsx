'use client'

import { memo } from 'react'
import { useTaskLists, useTasks } from '@/store/store'

function TaskListHeader() {
  const { taskLists, activeTaskListId } = useTaskLists()
  const { tasks } = useTasks()
  const taskListName = taskLists.find(
    taskList => taskList.id === activeTaskListId
  )?.name

  return (
    <div className="h-[100px] border-b-[1px] border-[#B8B8B8] px-[24px] pt-[30px]">
      {taskListName && (
        <>
          <h2 className="font-bold text-[24px] leading-[100%] mb-[8px] text-ellipsis h-[26px] overflow-hidden whitespace-nowrap">
            {taskListName}
          </h2>
          <div className="flex gap-[16px] text-[#939393] text-[12px]">
            <p>
              <b>
                {
                  tasks.filter(task => task.taskListId === activeTaskListId)
                    .length
                }
              </b>{' '}
              tasks
            </p>
            <p>
              <b>
                {
                  tasks.filter(
                    task =>
                      task.taskListId === activeTaskListId &&
                      task.completed === true
                  ).length
                }
              </b>{' '}
              completed
            </p>
            <p>
              <b>
                {
                  tasks.filter(
                    task =>
                      task.taskListId === activeTaskListId &&
                      task.completed === false
                  ).length
                }
              </b>{' '}
              left
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default memo(TaskListHeader)
