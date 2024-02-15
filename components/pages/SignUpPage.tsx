'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import Link from 'next/link'
import { signUp } from '@/lib/user/signUp'
import GoogleButton from '@/components/buttons/GoogleButton'
import GitHubButton from '@/components/buttons/GitHubButton'
import EmailVerification from '@/components/pages/Verification'
import LoginPageLogo from '../../public/icons/loginPageLogo.svg'

interface Inputs {
  email: string
  password: string
}

export default function SignUpPage() {
  const { status } = useSession()

  const router = useRouter()

  if (status === 'authenticated') router.replace('/')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<Inputs>({ mode: 'onSubmit' })

  const [isVerification, setIsVerification] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const searchParams = useSearchParams()

  const error = searchParams.get('error')

  const onSubmit: SubmitHandler<Inputs> = async data => {
    setIsLoading(true)

    const response = await signUp(data.email, data.password, true)

    if (response === 'User already exists. You can try another method') {
      setIsLoading(false)
      setError('email', { type: 'custom', message: 'User already exists' })
      return
    }

    setIsVerification(true)

    setIsLoading(false)
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  return (
    <>
      {status === 'unauthenticated' && (
        <>
          {isVerification && (
            <EmailVerification
              email={getValues('email')}
              password={getValues('password')}
              isPasswordProcedure={false}
            />
          )}
          -
          {!isVerification && (
            <div className="w-[100vw] h-[100dvh] bg-white flex items-center justify-center flex-col absolute">
              <Image
                src={LoginPageLogo}
                width={240}
                height={58}
                alt="Logo"
                className="mb-[50px]"
              />
              {error === 'OAuthAccountNotLinked' && (
                <div className="max-w-[280px] w-[100%] bg-[#FFDCE0] rounded-[4px] mb-[16px] py-[12px] px-[12px]">
                  <p className="text-center text-[12px] text-[#94181D]">
                    You tried signing in with a different authentication method
                    than the one you used during signup. Please try again using
                    your original authentication method
                  </p>
                </div>
              )}
              <GoogleButton
                className="mb-[16px]"
                onClick={() => {
                  setIsLoading(true)
                }}
              />
              <GitHubButton
                className="mb-[24px]"
                onClick={() => {
                  setIsLoading(true)
                }}
              />
              <div className="flex w-[280px] items-center mb-[24px] select-none">
                <div className="bg-[#D9D9D9] h-[1px] w-[100%]" />
                <p className="text-[#939393] mx-[12px]">or</p>
                <div className="bg-[#D9D9D9] h-[1px] w-[100%]" />
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-[16px]">
                  <input
                    className={`w-[280px] h-[40px] border-[1px] border-[#B8B8B8] flex items-center px-[20px] placeholder:text-[14px]  focus:outline-none focus:border-[#007AFF] rounded-[4px] ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500 '
                        : 'hover:border-[#007AFF]'
                    }`}
                    {...register('email', {
                      required: { value: true, message: 'Enter email' },
                      maxLength: 50,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    placeholder="Your email"
                    maxLength={50}
                    type="email"
                  />
                  {errors.email?.type === 'required' && (
                    <p className="text-[12px] text-red-500 mt-[8px]">
                      {errors.email.message}
                    </p>
                  )}
                  {errors.email?.type === 'pattern' && (
                    <p className="text-[12px] text-red-500 mt-[8px]">
                      {errors.email.message}
                    </p>
                  )}
                  {errors.email?.type === 'custom' && (
                    <p className="text-[12px] text-red-500 mt-[8px]">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="relative mb-[24px]">
                  <input
                    className={`w-[280px] h-[40px] border-[1px] border-[#B8B8B8] flex items-center pl-[20px] pr-[80px] placeholder:text-[14px] focus:outline-none focus:border-[#007AFF] rounded-[4px] ${
                      errors.password
                        ? 'border-red-500 focus:border-red-500'
                        : 'hover:border-[#007AFF]'
                    }`}
                    {...register('password', {
                      required: { value: true, message: 'Enter password' },
                      maxLength: 50,
                      minLength: {
                        value: 4,
                        message: 'Minimum length of password is 4',
                      },
                    })}
                    placeholder="Your password"
                    type="password"
                    maxLength={50}
                    autoComplete="on"
                  />
                  {errors.password?.type === 'required' && (
                    <p className="text-[12px] text-red-500 mt-[8px]">
                      {errors.password.message}
                    </p>
                  )}
                  {errors.password?.type === 'custom' && (
                    <p className="text-[12px] text-red-500 mt-[8px]">
                      {errors.password.message}
                    </p>
                  )}
                  {errors.password?.type === 'minLength' && (
                    <p className="text-[12px] text-red-500 mt-[8px]">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <input
                  type="submit"
                  className="w-[280px] h-[40px] bg-[#007AFF] text-white cursor-pointer rounded-[4px] font-bold hover:bg-[#046BDC] mb-[16px]
				focus:mb-[16px] focus:border-[#1b31d9] focus:outline-none focus:border-[4px]
				disabled:bg-[#657ec2]"
                  value={isLoading ? 'Signing up...' : 'Sign Up'}
                  disabled={isLoading}
                />
                <div className="flex justify-center items-center gap-[16px] text-[14px] w-[280px]">
                  <p>{`Already have an account?`}</p>
                  <Link
                    className="text-[#007AFF] focus:border-b-[1px] focus:border-[#007AFF] focus:outline-none"
                    href={'/signin'}
                  >
                    Sign In
                  </Link>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </>
  )
}
