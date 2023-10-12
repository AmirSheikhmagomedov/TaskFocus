import ProfilePage from '@/components/ProfilePage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Profile | TaskFocus',
  description: 'Profile page',
}

export default function Profile() {
  return <ProfilePage />
}
