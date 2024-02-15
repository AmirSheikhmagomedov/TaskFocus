'use client'
import {
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import Image from 'next/image'
import { isMobile } from 'react-device-detect'
import ClickAwayListener from 'react-click-away-listener'
import { AnimatePresence } from 'framer-motion'
import { useTasks } from '@/store/store'
import whiteDots from '../../public/icons/whiteDots.svg'
import darkDots from '../../public/icons/darkDots.svg'
import DropDown from '../DropDown'

export default function ListItem({
  isMenuOpen,
  openedId,
  onListClick,
  onMenuClick,
  onMenuClickAway,
  activeListId,
  list,
  setCurrentListName,
  setRenameListId,
  setIsRenameOverlayOpen,
}: {
  onListClick: (listId: string) => void
  onMenuClick: (listId: string) => void
  onMenuClickAway: () => void
  list: any
  activeListId: string
  isMenuOpen: boolean
  openedId: string
  setRenameListId: (renameListId: string) => void
  setCurrentListName: (currentListName: string) => void
  setIsRenameOverlayOpen: Dispatch<SetStateAction<boolean>>
}) {
  const label = useRef<HTMLLabelElement | null>(null)

  const [height, setHeight] = useState<number>(44)

  const { emptySearch, setSearch, search } = useTasks()

  useLayoutEffect(() => {
    if (label.current) {
      const numberOfLines = Math.floor(
        label.current.scrollHeight /
          parseFloat(getComputedStyle(label.current).fontSize)
      )

      if (numberOfLines === 1) return
      if (numberOfLines === 2) setHeight(56)
    }
  }, [label])

  return (
    <>
      {activeListId === list.id && (
        <button
          className="group min-h-[44px] w-[100%] text-start px-[20px] relative flex items-center justify-between bg-[#3992F3] text-white leading-[100%] text-[14px] hover:bg-[#007AFF] transition-colors"
          onClick={e => {
            e.stopPropagation()
            onListClick(list.id)
            emptySearch(() => {
              if (search) setSearch('')
            })
          }}
          key={list.id}
          style={{ minHeight: height }}
        >
          <label
            ref={label}
            className="leading-[140%] max-w-[200px] cursor-pointer"
          >
            {list.name}
          </label>
          <div
            className={`opacity-0 pointer-events-none group-hover:opacity-[100%] group-hover:pointer-events-auto transition-opacity ${
              isMobile ? 'opacity-[100%] pointer-events-auto' : ''
            }`}
            onClick={() => {
              onMenuClick(list.id)
            }}
          >
            <Image src={whiteDots} width={20} height={36} alt="Dots" />
          </div>
          {openedId === list.id && (
            <AnimatePresence>
              {isMenuOpen && (
                <ClickAwayListener onClickAway={onMenuClickAway}>
                  <DropDown
                    currentListName={list.name}
                    setCurrentListName={setCurrentListName}
                    taskListId={list.id}
                    setRenameListId={setRenameListId}
                    setIsRenameOverlayOpen={setIsRenameOverlayOpen}
                  />
                </ClickAwayListener>
              )}
            </AnimatePresence>
          )}
        </button>
      )}
      {activeListId !== list.id && (
        <button
          className="relative group min-h-[44px] w-[100%] text-start px-[20px] flex items-center justify-between leading-[100%] text-[14px] hover:bg-[#eeeeee] transition-colors"
          key={list.id}
          onClick={e => {
            e.stopPropagation()
            onListClick(list.id)
            emptySearch(() => {
              if (search) setSearch('')
            })
          }}
          style={{ minHeight: height }}
        >
          <label
            ref={label}
            className="leading-[140%] max-w-[220px] cursor-pointer"
          >
            {list.name}
          </label>
          <div
            className={`opacity-0 pointer-events-none group-hover:opacity-[100%] group-hover:pointer-events-auto transition-opacity ${
              isMobile ? 'opacity-[100%] pointer-events-auto' : ''
            }`}
            onClick={e => {
              e.stopPropagation()
              onMenuClick(list.id)
            }}
          >
            <Image src={darkDots} width={20} height={36} alt="Dots" />
          </div>
          {openedId === list.id && (
            <AnimatePresence>
              {isMenuOpen && (
                <ClickAwayListener onClickAway={onMenuClickAway}>
                  <DropDown
                    currentListName={list.name}
                    setCurrentListName={setCurrentListName}
                    taskListId={list.id}
                    setRenameListId={setRenameListId}
                    setIsRenameOverlayOpen={setIsRenameOverlayOpen}
                  />
                </ClickAwayListener>
              )}
            </AnimatePresence>
          )}
        </button>
      )}
    </>
  )
}
