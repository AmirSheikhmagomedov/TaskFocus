import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools, persist } from 'zustand/middleware'
import { getTasks } from '@/lib/tasks/getTasks'
import { createTask } from '@/lib/tasks/createTask'
import { updateTask } from '@/lib/tasks/updateTask'
import { deleteTask } from '@/lib/tasks/deleteTask'
import { completeTask } from '@/lib/tasks/completeTask'
import { uncompleteTask } from '@/lib/tasks/uncompleteTask'
import { createTaskList } from '@/lib/taskLists/createTaskList'
import { getTaskLists } from '@/lib/taskLists/getTaskLists'
import { updateTaskList } from '@/lib/taskLists/updateTaskList'
import { deleteTaskList } from '@/lib/taskLists/deleteTaskList'

interface Task {
  id: string
  task: string
  completed: boolean
  taskListId: string
  createdAt: Date | string
  updatedAt: Date | string
}

export interface TaskList {
  id: string
  name: string
  userId: string
  createdAt: Date | string
  updatedAt: Date | string
}

interface TasksState {
  search: string
  tasks: Task[]
  currentTaskId: string
  currentTaskName: string
  setCurrentTaskId: (currentTaskId: string) => void
  setCurrentTaskName: (currentTaskName: string) => void
  setSearch: (value: string) => void
  fetchTasks: () => void
  createTask: (
    task: string,
    taskListId: string,
    disableAnimation: () => void,
    enableAnimation: () => void
  ) => void
  updateTask: (task: string, taskId: string) => void
  deleteTask: (taskId: string) => void
  completeTask: (taskId: string) => void
  uncompleteTask: (taskId: string) => void
  onTaskListDelete: (taskListId: string) => void
  emptySearch: (setSearch: () => void) => void
}

interface TaskListsState {
  taskLists: TaskList[]
  isLoading: boolean
  activeTaskListId: string | null
  renameListId: string
  currentListName: string
  setRenameListId: (renameListId: string) => void
  setCurrentListName: (currentListName: string) => void
  setActiveTaskListId: (taskListId: string) => void
  fetchTaskLists: () => void
  createTaskList: (taskListName: string) => void
  updateTaskList: (newName: string, taskListId: string) => void
  deleteTaskList: (taskListId: string) => void
}

export const useTasks = create<TasksState>()(
  immer(
    devtools((set, get) => ({
      tasks: [],
      search: '',
      currentTaskId: '',
      currentTaskName: '',

      setCurrentTaskId: (currentTaskId: string) => {
        set({ currentTaskId })
      },

      setCurrentTaskName: (currentTaskName: string) => {
        set({ currentTaskName })
      },

      emptySearch: (setSearch: () => void) => {
        set({ search: '' })
        setSearch()
      },

      setSearch: value => {
        set({ search: value })
      },

      fetchTasks: async () => {
        const tasks = await getTasks()

        set({ tasks: tasks.reverse() })
      },
      createTask: async (
        task: string,
        taskListId: string,
        disableAnimation: () => void,
        enableAnimation: () => void
      ) => {
        const tmpTaks = {
          id: `${Math.random()}`,
          task: task,
          completed: false,
          taskListId: taskListId,
          createdAt: '',
          updatedAt: '',
        }

        set({ tasks: [tmpTaks, ...get().tasks] })

        const createdTask = await createTask(task, taskListId)

        disableAnimation()

        set({
          tasks: get().tasks.map(task => {
            if (task.id === tmpTaks.id) {
              return { ...task, id: createdTask.id }
            }

            return task
          }),
        })

        setTimeout(() => {
          enableAnimation()
        }, 0)
      },
      updateTask: async (newTaskName: string, taskId: string) => {
        set({
          tasks: get().tasks.map(task => {
            if (taskId === task.id) {
              return { ...task, task: newTaskName }
            }

            return task
          }),
        })
        await updateTask(newTaskName, taskId)
      },
      deleteTask: async (taskId: string) => {
        set({ tasks: get().tasks.filter(task => taskId !== task.id) })

        await deleteTask(taskId)
      },
      completeTask: async (taskId: string) => {
        set({
          tasks: get().tasks.map(task => {
            if (taskId === task.id) {
              return { ...task, completed: true }
            }

            return task
          }),
        })
        await completeTask(taskId)
      },
      uncompleteTask: async (taskId: string) => {
        set({
          tasks: get().tasks.map(task => {
            if (taskId === task.id) return { ...task, completed: false }

            return task
          }),
        })
        await uncompleteTask(taskId)
      },
      onTaskListDelete: (taskListId: string) => {
        set({
          tasks: get().tasks.filter(task => task.taskListId !== taskListId),
        })
      },
    }))
  )
)

export const useTaskLists = create<TaskListsState>()(
  devtools(
    persist(
      (set, get) => ({
        isLoading: true,
        taskLists: [],
        activeTaskListId: '',
        renameListId: '',
        currentListName: '',
        setRenameListId: (renameListId: string) => {
          set({ renameListId })
        },
        setCurrentListName: currentListName => {
          set({ currentListName })
        },
        setActiveTaskListId: taskListId => {
          set({ activeTaskListId: taskListId })
        },
        fetchTaskLists: async () => {
          const taskLists = await getTaskLists()

          set({ taskLists: taskLists.reverse(), isLoading: false })
        },
        createTaskList: async taskListName => {
          const task: TaskList = {
            id: `${Math.random()}`,
            name: taskListName,
            userId: '',
            createdAt: '',
            updatedAt: '',
          }

          set({
            taskLists: [task, ...get().taskLists],
            activeTaskListId: task.id,
          })

          const createdTaskList = await createTaskList(taskListName)

          set({
            taskLists: get().taskLists.map(taskList => {
              if (task.id === taskList.id) {
                return createdTaskList
              }

              return taskList
            }),
            activeTaskListId: createdTaskList.id,
          })
        },
        updateTaskList: async (newName, taskListId) => {
          set({
            taskLists: get().taskLists.map(taskList => {
              if (taskListId === taskList.id) {
                return { ...taskList, name: newName }
              }

              return taskList
            }),
          })

          await updateTaskList(newName, taskListId)
        },
        deleteTaskList: async taskListId => {
          if (taskListId === get().activeTaskListId) {
            set({ activeTaskListId: '' })
          }

          useTasks.getState().onTaskListDelete(taskListId)

          set({
            taskLists: get().taskLists.filter(
              taskList => taskList.id !== taskListId
            ),
          })
          await deleteTaskList(taskListId)
        },
      }),
      {
        name: 'activeTaskListId',
        partialize(state) {
          return { activeTaskListId: state.activeTaskListId }
        },
      }
    )
  )
)
