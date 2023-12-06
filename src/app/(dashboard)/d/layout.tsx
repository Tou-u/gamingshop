import { getPageSession } from '@/auth/lucia'
import NavBar from './navbar'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getPageSession().catch((session) => (session = null))
  return (
    <>
      <NavBar user={session?.user} />
      {children}
    </>
  )
}
