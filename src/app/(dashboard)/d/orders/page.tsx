import { getPageSession } from '@/auth/lucia'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Data from './data'
import Loading from '@/components/ui/Loading'

export default async function Orders({
  searchParams
}: {
  searchParams?: { client?: string; page?: string; stage?: string }
}) {
  const session = await getPageSession().catch((session) => (session = null))
  if (!session || session.user.role !== 'admin') notFound()

  return (
    <div>
      <h1 className="p-1 font-bold text-lg text-center">Manage Orders</h1>
      <Suspense fallback={<Loading title="Loading Orders" gap />}>
        <Data searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
