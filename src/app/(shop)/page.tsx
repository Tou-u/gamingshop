import { Suspense } from 'react'
import Data from './data'
import Loading from '@/components/ui/Loading'

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<Loading title="Loading Products" gap />}>
        <Data />
      </Suspense>
    </>
  )
}
