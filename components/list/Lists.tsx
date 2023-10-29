'use client'

import { Dispatch, SetStateAction, useState, memo } from 'react'
import { useTaskLists } from '@/store/store'
import ListItem from './ListItem'

interface Props {
  setIsRenameOverlayOpen: Dispatch<SetStateAction<boolean>>
}

function Lists(props: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [openedId, setOpenedId] = useState<string>()

  const {
    setCurrentListName,
    setRenameListId,
    taskLists,
    setActiveTaskListId,
    activeTaskListId,
  } = useTaskLists()

  const onListClick = (taskListId: string) => {
    setActiveTaskListId(taskListId)
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
      {!taskLists.length && (
        <p
          className="text-[18px] text-[#939393] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
			whitespace-nowrap select-none"
        >
          ↓ Create a new list ↓
        </p>
      )}
      {taskLists.map(taskList => (
        <ListItem
          setCurrentListName={setCurrentListName}
          setIsRenameOverlayOpen={props.setIsRenameOverlayOpen}
          setRenameListId={setRenameListId}
          key={taskList.id}
          activeListId={activeTaskListId!}
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
}

export default memo(Lists)
