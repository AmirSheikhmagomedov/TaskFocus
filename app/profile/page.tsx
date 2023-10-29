import { Metadata } from 'next'
import ProfilePage from '@/components/pages/ProfilePage'

export const metadata: Metadata = {
  title: 'Your Profile | TaskFocus',
  description: 'Profile page',
}

export default function Profile() {
  return <ProfilePage />
}
