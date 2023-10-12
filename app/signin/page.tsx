import SignInPage from '@/components/SIgninPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | TaskFocus',
  description: 'Sign in page',
}

export default function page() {
  return <SignInPage />
}
