import { Metadata } from 'next'
import SignUpPage from '@/components/pages/SignUpPage'

export const metadata: Metadata = {
  title: 'Sign Up | TaskFocus',
  description: 'Sign up page',
}

export default function SignUp() {
  return <SignUpPage />
}
