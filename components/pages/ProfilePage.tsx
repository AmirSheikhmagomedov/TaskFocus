'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import EmailVerification from '@/components/pages/Verification'
import profile from '../../public/images/no-profile-image.jpg'

export default function ProfilePage() {
  const { data: session } = useSession()

  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onDelete = async () => {
    setIsLoading(true)

    const response = await fetch(`/api/delete-user`, {
      method: 'POST',
    })

    if (!response.ok) {
      setIsLoading(false)
    }

    signOut()
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  return (
    <>
      {!isChangingPassword && (
        <div className="max-w-[100vw] w-[100%] h-[100dvh] bg-white flex items-center justify-center">
          <div className="max-w-[380px] w-[100%] max-[420px]:max-w-[280px]">
            <Link
              href={'/'}
              className="inline-flex gap-[8px] items-center font-medium mb-[32px] border-[1px] border-[#ffffff] p-[8px] ml-[-8px] rounded-[4px] focus:outline-none focus:border-[#007aff] "
            >
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.76366 1.26204L1.92792 5.99322L6.76366 10.7505C7.41714 11.3779 6.34544 12.4496 5.69196 11.7961L0.176604 6.43758C-0.0586485 6.20233 -0.0586485 5.81024 0.176604 5.60113L5.69196 0.190331C6.34544 -0.437008 7.41714 0.634696 6.76366 1.26204Z"
                  fill="black"
                />
              </svg>
              Go to app
            </Link>
            <div className="flex gap-[16px] items-center justify-center mb-[32px] max-[480px]:flex-col">
              <Image
                src={session?.user.image ? session.user.image : profile}
                width={64}
                height={64}
                alt="Profile picture"
                className={`rounded-[50%] self-start max-[480px]:self-center ${
                  session?.user.image ? 'border-[1px] border-[#bcbcbc]' : ''
                }`}
                crossOrigin="anonymous"
              />
              <div className="flex flex-col gap-[4px]">
                <p className="text-[18px] font-medium max-[380px]:text-[16px] max-[380px]:px-[8px]">
                  {session?.user.email ? session?.user.email : 'Loading...'}
                </p>
                <p className="text-[12px] text-[#b0b0b0] max-[480px]:text-center">
                  Joined at{' '}
                  {new Date(session?.user.createdAt!).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              {session?.user.provider === 'credentials' && (
                <button
                  onClick={() => {
                    setIsChangingPassword(true)
                  }}
                  className="w-[280px] h-[40px] bg-[#007AFF] text-white cursor-pointer rounded-[4px] font-bold hover:bg-[#046BDC] mb-[16px]
				focus:mb-[16px] focus:border-[#1b31d9] focus:outline-none focus:border-[4px]
				disabled:bg-[#657ec2]"
                >
                  Change password
                </button>
              )}
              <button
                className="w-[280px] h-[40px] bg-[#E92828] text-white cursor-pointer rounded-[4px] font-bold hover:bg-[#c90d0d] mb-[16px]
				focus:mb-[16px] focus:border-[#8b0000] focus:outline-none focus:border-[4px]
				disabled:bg-[#657ec2]"
                onClick={() => {
                  setIsDeleting(true)
                }}
              >
                Delete account
              </button>
              <button
                className="w-[280px] h-[40px] border-[1px] border-[#000000] text-black cursor-pointer rounded-[4px] font-bold hover:bg-[#eeeeee] mb-[16px]
				focus:mb-[16px] focus:border-[#ababab] focus:outline-none focus:border-[4px]"
                onClick={() => {
                  signOut()
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
      {isChangingPassword && (
        <EmailVerification
          email={session?.user.email!}
          isPasswordProcedure={true}
        />
      )}
      <AnimatePresence>
        {isDeleting && (
          <div className="w-[100vw] h-[100dvh] absolute top-0 left-0 flex items-center justify-center">
            <motion.div
              className="w-[100vw] h-[100dvh] absolute top-0 left-0 bg-black z-[0]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.88 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              className="z-[1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-[24px] text-white font-bold mb-[32px] text-center px-[16px]">
                Do you really want to delete an account?
              </h2>
              <div className="flex gap-[24px] justify-center items-center max-[400px]:flex-col max-[400px]:gap-[8px]">
                <button
                  onClick={() => {
                    setIsDeleting(false)
                  }}
                  className="w-[140px] h-[40px] bg-[#007AFF] text-white cursor-pointer rounded-[4px] font-bold hover:bg-[#046BDC] mb-[16px]
				focus:mb-[16px] focus:border-[#1b31d9] focus:outline-none focus:border-[4px]
				disabled:bg-[#657ec2]"
                >
                  Keep account
                </button>
                <button
                  onClick={onDelete}
                  disabled={isLoading}
                  className="w-[156px] h-[40px] bg-[#E92828] text-white cursor-pointer rounded-[4px] font-bold hover:bg-[#c90d0d] mb-[16px]
				focus:mb-[16px] focus:border-[#8b0000] focus:outline-none focus:border-[4px]
				disabled:bg-[#902828] disabled:cursor-default"
                >
                  {isLoading ? 'Deleting...' : 'Delete account'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
