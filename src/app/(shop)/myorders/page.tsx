import { getPageSession } from '@/auth/lucia'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Loading from '@/components/ui/Loading'
import Data from './data'

export default async function MyOrdersPage() {
  const session = await getPageSession().catch((session) => (session = null))

  if (!session) {
    notFound()
  }

  return (
    <div>
      <h1 className="p-1 font-bold text-lg text-center">My Orders</h1>
      <Suspense fallback={<Loading title="Loading Orders" size="200px" />}>
        <Data user={session.user} />
      </Suspense>
    </div>
  )
}
