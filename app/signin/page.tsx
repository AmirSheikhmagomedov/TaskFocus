import { Metadata } from 'next'
import SignInPage from '@/components/pages/SignInPage'

export const metadata: Metadata = {
  title: 'Sign In | TaskFocus',
  description: 'Sign in page',
}

export default function SignIn() {
  return <SignInPage />
}
