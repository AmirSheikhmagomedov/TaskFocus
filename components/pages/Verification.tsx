'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import AES from 'crypto-js/aes'
import encUTF8 from 'crypto-js/enc-utf8'
import { signUp } from '@/lib/user/signUp'
import NewPassword from './NewPassword'
import Logo from '../../public/icons/loginPageLogo.svg'

export default function EmailVerification({
  email,
  password,
  isPasswordProcedure,
}: {
  email: string
  password?: string
  isPasswordProcedure: boolean
}) {
  const [inputCode, setInputCode] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [code, setCode] = useState<any>('')
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false)

  const onSignUp = async () => {
    if (
      AES.decrypt(
        code,
        process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY as string
      ).toString(encUTF8) !== inputCode
    ) {
      setIsError(true)
      return
    }

    if (!isPasswordProcedure) {
      setIsLoading(true)

      await signUp(email, password!, false)

      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/',
      })
    } else {
      setIsChangePassword(true)
    }
  }

  useEffect(() => {
    setCode(
      AES.encrypt(
        `${Math.floor(100000 + Math.random() * 900000)}`,
        process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY as string
      ).toString()
    )
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  useEffect(() => {
    if (!code || !email) {
      return
    } else {
      fetch(`/api/send-email`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          code,
          isReset: isPasswordProcedure,
        }),
      })
    }
  }, [code, email, isPasswordProcedure])

  return (
    <>
      {isChangePassword && <NewPassword />}
      {!isChangePassword && (
        <div className="w-[100vw] h-[100dvh] bg-white flex items-center justify-center flex-col absolute">
          <Image
            src={Logo}
            width={240}
            height={58}
            alt="Logo"
            className="mb-[50px]"
          />
          <h1 className="leading-[100%] text-[24px] font-bold mb-[16px]">
            Verify your email address
          </h1>
          <p className="max-w-[480px] text-[#939393] text-center text-[14px] max-[480px]:max-w-[280px] mb-[32px]">
            We emailed you six-digit code to{' '}
            <span className="text-black">{email}</span>. <br /> Enter the code
            below {''}
            {isPasswordProcedure
              ? 'to change your password'
              : 'to confirm your email'}
          </p>
          <div className={`mb-[${isError ? '24px' : '32px'}]`}>
            <input
              type="tel"
              placeholder="Verification code"
              value={inputCode}
              onFocus={() => {
                setIsError(false)
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' && `${inputCode}`.length === 6) {
                  onSignUp()
                }
              }}
              className={`w-[280px] h-[40px] border-[1px] border-[#B8B8B8] flex items-center px-[20px] placeholder:text-[14px]  focus:outline-none focus:border-[#007AFF] rounded-[4px] hover:border-[#007AFF] ${
                isError
                  ? 'border-red-500 focus:border-red-500 hover:border-red-500'
                  : 'hover:border-[#007AFF]'
              }`}
              onChange={e => {
                if (isError) setIsError(false)
                setInputCode(e.target.value)
              }}
              maxLength={6}
            />
            {isError && (
              <p className="text-[12px] text-red-500 mt-[8px]">
                Code is incorrect
              </p>
            )}
          </div>
          <button
            disabled={inputCode.length < 6 || isError || isLoading}
            className="w-[280px] h-[40px] bg-[#007AFF] text-white cursor-pointer rounded-[4px] font-bold hover:bg-[#046BDC]  focus:border-[#1b31d9] focus:outline-none focus:border-[4px]
				disabled:bg-[#657ec2] disabled:cursor-auto"
            onClick={onSignUp}
          >
            {isLoading ? 'Confirming...' : 'Confirm'}
          </button>
        </div>
      )}
    </>
  )
}
