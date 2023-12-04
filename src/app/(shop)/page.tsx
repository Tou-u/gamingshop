import { Suspense } from 'react'
import Data from './data'
import Loading from '@/components/ui/Loading'

export default function HomePage() {
  return (
    <>
      <h1 className="capitalize p-1 font-bold text-lg text-center">Our Products</h1>
      <Suspense fallback={<Loading title="Loading Products" gap />}>
        <Data />
      </Suspense>
    </>
  )
}
