import Logo from './Logo'
import Profile from './Profile'

export default function Header() {
  return (
    <header className="mb-[32px] flex justify-between items-center">
      <Logo />
      <Profile />
    </header>
  )
}
