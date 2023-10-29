import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import logo from '../../public/icons/loginPageLogo.svg'

export default function NewPassword() {
  const [newPassword, setNewPassword] = useState<string>('')
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onPasswordChange = () => {
    setIsLoading(true)
    fetch(`/api/change-password`, {
      method: 'POST',
      body: JSON.stringify({ newPassword }),
    }).then(() => {
      router.push('/signin')
    })
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  return (
    <div className="w-[100vw] h-[100dvh] bg-white flex items-center justify-center flex-col absolute">
      <Image
        src={logo}
        width={240}
        height={58}
        alt="Profile picture"
        className="mb-[50px]"
      />
      <h1 className="leading-[100%] text-[24px] font-bold mb-[32px]">
        Enter new password
      </h1>
      <input
        type="text"
        onKeyDown={e => {
          if (e.key === 'Enter' && `${newPassword}`.length >= 4) {
            onPasswordChange()
          }
        }}
        placeholder="New password"
        value={newPassword}
        onChange={e => {
          setNewPassword(e.target.value)
        }}
        className={`w-[280px] h-[40px] border-[1px] border-[#B8B8B8] flex items-center px-[20px] placeholder:text-[14px]  focus:outline-none focus:border-[#007AFF] rounded-[4px] hover:border-[#007AFF] mb-[32px]`}
        maxLength={20}
      />
      <button
        disabled={newPassword.length < 4 || isLoading}
        className="w-[280px] h-[40px] bg-[#007AFF] text-white cursor-pointer rounded-[4px] font-bold hover:bg-[#046BDC]  focus:border-[#1b31d9] focus:outline-none focus:border-[4px]
				disabled:bg-[#657ec2] disabled:cursor-auto"
        onClick={onPasswordChange}
      >
        {isLoading ? 'Changing...' : 'Change'}
      </button>
    </div>
  )
}
