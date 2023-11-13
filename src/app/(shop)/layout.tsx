import '../globals.css'
import { Providers } from '../providers'
import { Suspense } from 'react'
import Header from '@/components/Header'
import { NavBar } from '@/components/NavBar'

export const metadata = {
  title: 'Gaming Shop'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <Suspense fallback={<NavBar session={undefined} usercart={undefined} />}>
            <Header />
          </Suspense>
          <main className="max-w-[1050px] m-auto p-2">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
