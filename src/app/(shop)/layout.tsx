import '../globals.css'
import { Providers } from '../providers'
import { Suspense } from 'react'
import NavBarSkeleton from '@/components/skeletons/NavBarSkeleton'
import Header from '@/components/Header'

export const metadata = {
  title: 'Gaming Shop'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <Suspense fallback={<NavBarSkeleton />}>
            <Header />
          </Suspense>
          <main className="max-w-[1050px] m-auto p-2">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
