'use client'

import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import GoogleButton from '@/components/buttons/GoogleButton'
import GitHubButton from '@/components/buttons/GitHubButton'
import LoginPageLogo from '../../public/icons/loginPageLogo.svg'

interface Inputs {
  email: string
  password: string
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>({ mode: 'onSubmit' })

  const { status } = useSession()

  const router = useRouter()

  if (status === 'authenticated') router.replace('/')

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const searchParams = useSearchParams()

  const error = searchParams.get('error')

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true)
    const login = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (!login?.error) router.replace('/')

    if (login?.error === 'User was not found') {
      setIsLoading(false)
      setError('email', { type: 'custom', message: login.error })
    }

    if (login?.error === 'Try another authentication method') {
      setIsLoading(false)
      setError('email', {
        type: 'custom',
        message: 'Use authentication method used during sign up',
      })
    }

    if (login?.error === 'Password is incorrect') {
      setIsLoading(false)
      setError('password', { type: 'custom', message: 'Password is incorrect' })
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  return (
    <>
      {status === 'unauthenticated' && (
        <div className="w-[100vw] h-[100dvh] bg-white flex items-center justify-center flex-col">
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
                You tried signing in with a different authentication method than
                the one you used during signup. Please try again using your
                original authentication method
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
              <Link
                className={`absolute top-[9px] right-[12px] text-[14px] text-[#007AFF] focus:outline-none focus:border-[#007AFF] focus:border-[1px] focus:top-[6px] focus:right-[6px] focus:py-[2px] focus:pl-[8px] focus:pr-[5px] rounded-[4px]`}
                href={'/password-reset'}
              >
                Forgot?
              </Link>
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
					disabled:bg-[#1b31d9]"
              value={isLoading ? 'Signing in...' : 'Sign In'}
              disabled={
                isLoading ||
                !!errors.email?.message ||
                !!errors.password?.message
              }
            />
            <div className="flex justify-center items-center gap-[16px] text-[14px] w-[280px]">
              <p>{`Don't have an account?`}</p>
              <Link
                className="text-[#007AFF] focus:border-b-[1px] focus:border-[#007AFF] focus:outline-none"
                href={'/signup'}
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
