'use client'

import {
  Dispatch,
  SetStateAction,
  forwardRef,
  useState,
  useEffect,
} from 'react'
import ListItem from './ListItem'
import { TaskList } from '@/store/store'
import DetectableOverflow from 'react-detectable-overflow'

interface Props {
  taskLists: TaskList[]
  setActiveTaskListId: (taskListId: string) => void
  activeTaskListId: string
  setRenameListId: Dispatch<SetStateAction<string>>
  setIsRenameOverlayOpen: Dispatch<SetStateAction<boolean>>
  setCurrentListName: Dispatch<SetStateAction<string>>
  clearSearch: () => void
}

export default forwardRef<HTMLDivElement, Props>(function Lists(props, ref) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [openedId, setOpenedId] = useState<string>()

  const onListClick = (taskListId: string) => {
    props.setActiveTaskListId(taskListId)
  }

  const onMenuCLick = (listId: string) => {
    setOpenedId(listId)
    setIsMenuOpen(true)
    document.body.style.pointerEvents = 'none'
  }

  const onMenuCLickAway = () => {
    setIsMenuOpen(false)
    document.body.style.pointerEvents = 'all'
  }

  return (
    <div className="h-[309px] border-b-[1px] border-[#B8B8B8] flex flex-col overflow-auto relative max-[880px]:h-[220px]">
      {!props.taskLists.length && (
        <p
          className="text-[18px] text-[#939393] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
			whitespace-nowrap select-none"
        >
          ↓ Create a new list ↓
        </p>
      )}
      {props.taskLists.map(taskList => (
        <ListItem
          clearSearch={props.clearSearch}
          setCurrentListName={props.setCurrentListName}
          setIsRenameOverlayOpen={props.setIsRenameOverlayOpen}
          setRenameListId={props.setRenameListId}
          key={taskList.id}
          activeListId={props.activeTaskListId!}
          isMenuOpen={isMenuOpen}
          openedId={openedId!}
          list={taskList}
          onListClick={onListClick}
          onMenuClick={onMenuCLick}
          onMenuClickAway={onMenuCLickAway}
        />
      ))}
    </div>
  )
})
