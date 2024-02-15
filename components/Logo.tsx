import Image from 'next/image'
import logo from '../public/icons/logo.svg'

export default function Logo() {
  return (
    <Image
      src={logo}
      width={200}
      height={48}
      alt="TaskFocus Logo"
      className="max-[360px]:w-[160px]"
    />
  )
}
