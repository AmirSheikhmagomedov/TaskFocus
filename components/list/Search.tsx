'use client'

import Image from 'next/image'
import { ChangeEvent, useEffect } from 'react'
import { useTasks, useTaskLists } from '@/store/store'
import { useDebounce } from '@/hooks/useDebounce'
import searchIcon from '../../public/icons/search-grey.svg'

export default function Search({
  searchValue,
  setSearchValue,
}: {
  searchValue: string
  setSearchValue: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  const { setSearch } = useTasks()
  const { taskLists } = useTaskLists()

  const debouncedValue = useDebounce(searchValue)

  useEffect(() => {
    setSearch(debouncedValue)
  }, [debouncedValue, setSearch])

  return (
    <div className="py-[18px] px-[20px] h-[100px] border-b-[1px] border-[#B8B8B8] ">
      <p className="text-[24px] font-medium leading-[100%] mb-[12px]">Lists</p>
      <div className="relative">
        <input
          type="text"
          maxLength={50}
          value={searchValue}
          onChange={setSearchValue}
          disabled={!taskLists.length}
          placeholder="Search"
          className="w-[160px] h-[28px] border-[1px] rounded-[4px] border-[#B8B8B8] pl-[28px] placeholder:font-medium focus:outline-[0px] focus:border-[#007AFF] hover:border-[#007AFF] placeholder:text-[14px] placeholder:select-none disabled:hover:border-[#B8B8B8]"
        />
        <Image
          src={searchIcon}
          width={10}
          height={12}
          alt="Search icon"
          className="absolute top-[8px] left-[12px] select-none pointer-events-none"
        />
      </div>
    </div>
  )
}
