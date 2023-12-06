import { Suspense } from 'react'
import Loading from '@/components/ui/Loading'
import Data from './data'
import { getPageSession } from '@/auth/lucia'
import { notFound } from 'next/navigation'

export default async function Dashboard() {
  const session = await getPageSession().catch((session) => (session = null))
  if (!session || session.user.role !== 'admin') notFound()

  return (
    <div>
      <h1 className="p-1 font-bold text-lg text-center">Manage Products</h1>
      <Suspense fallback={<Loading title="Loading Products" gap />}>
        <Data />
      </Suspense>
    </div>
  )
}
