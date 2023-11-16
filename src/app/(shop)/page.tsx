import { Suspense } from 'react'
import Loading from '@/components/skeletons/Loading'
import Data from './data'

export default function HomePage() {
  return (
    <>
      <h1 className="capitalize p-1 font-bold text-lg text-center">Our Products</h1>
      <Suspense fallback={<Loading />}>
        <Data />
      </Suspense>
    </>
  )
}
