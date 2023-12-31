import { Suspense } from 'react'
import Header from '@/components/Header'
import { NavBar } from '@/components/NavBar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<NavBar session={undefined} usercart={undefined} />}>
        <Header />
      </Suspense>
      <main className="min-h-[calc(100vh-65px)]">{children}</main>
    </>
  )
}
