import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from '@/components/providers/NextAuthProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TaskFocus - Simple Task App',
  description:
    'TaskFocus is designed to streamline your daily life and boost your productivity',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex items-center`}
        suppressHydrationWarning={true}
      >
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
