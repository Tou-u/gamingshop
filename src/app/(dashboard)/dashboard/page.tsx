import { Suspense } from 'react'
import Loading from '@/components/ui/Loading'
import Data from './data'

export default async function Dashboard() {
  return (
    <div>
      <h1 className="p-1 font-bold text-lg text-center">Dashboard</h1>
      <Suspense fallback={<Loading title="Loading Table" gap />}>
        <Data />
      </Suspense>
    </div>
  )
}
