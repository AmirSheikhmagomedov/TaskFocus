'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import EmailVerification from '@/components/pages/Verification'
import Logo from '../../public/icons/loginPageLogo.svg'

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEmailVerification, setIsEmailVerification] = useState<boolean>(false)

  const router = useRouter()

  const { status } = useSession()

  if (status === 'authenticated') router.replace('/')

  const onSubmit = async () => {
    setIsLoading(true)
    const response = await fetch(`/api/check-user`, {
      method: 'POST',
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      setIsLoading(false)
      setIsError(true)
    } else {
      setIsEmailVerification(true)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  return (
    <>
      {status === 'unauthenticated' && (
        <>
          {isEmailVerification && (
            <EmailVerification email={email} isPasswordProcedure={true} />
          )}
          {!isEmailVerification && (
            <div className="w-[100vw] min-h-[100vh] bg-white flex items-center justify-center flex-col absolute">
              <Image
                src={Logo}
                width={240}
                height={58}
                alt="Logo"
                className="mb-[50px]"
              />
              <h1 className="leading-[100%] text-[24px] font-bold mb-[16px]">
                Forgot password?
              </h1>
              <p className="max-w-[480px] text-[#939393] text-center text-[14px] max-[480px]:max-w-[280px] mb-[32px]">
                Enter email to find your account
              </p>
              <div className={`mb-[${isError ? '24px' : '32px'}]`}>
                <input
                  type="text"
                  placeholder="Account email"
                  value={email}
                  onFocus={() => {
                    setIsError(false)
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      onSubmit()
                    }
                  }}
                  className={`w-[280px] h-[40px] border-[1px] border-[#B8B8B8] flex items-center px-[20px] placeholder:text-[14px]  focus:outline-none focus:border-[#007AFF] rounded-[4px] hover:border-[#007AFF] ${
                    isError
                      ? 'border-red-500 focus:border-red-500 hover:border-red-500'
                      : 'hover:border-[#007AFF]'
                  }`}
                  onChange={e => {
                    if (isError) setIsError(false)
                    setEmail(e.target.value)
                  }}
                  maxLength={30}
                />
                {isError && (
                  <p className="text-[12px] text-red-500 mt-[8px]">
                    User was not found
                  </p>
                )}
              </div>
              <button
                disabled={
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) ||
                  isLoading ||
                  isError
                }
                className="w-[280px] h-[40px] bg-[#007AFF] text-white cursor-pointer rounded-[4px] font-bold hover:bg-[#046BDC]  focus:border-[#1b31d9] focus:outline-none focus:border-[4px]
				disabled:bg-[#657ec2] disabled:cursor-auto"
                onClick={onSubmit}
              >
                {isLoading ? 'Confirming...' : 'Confirm'}
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}
