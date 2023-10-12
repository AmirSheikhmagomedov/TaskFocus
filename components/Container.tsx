export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto  max-w-[890px] w-[100%] px-[20px] max-[880px]:max-w-[550px] max-[880px]:py-[40px]">{children}</div>
  )
}
