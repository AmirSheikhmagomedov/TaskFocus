import SignUpPage from '@/components/SignUpPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up | TaskFocus',
  description: 'Sign up page',
}

export default function SignUp() {
  return <SignUpPage />
}
