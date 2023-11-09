import { Suspense } from 'react'
import Loading from '@/components/skeletons/Loading'
import GetData from './get-data'

export default function HomePage() {
  return (
    <>
      <h1 className="capitalize p-1 font-bold text-lg">Our Products</h1>
      <Suspense fallback={<Loading />}>
        <GetData />
      </Suspense>
    </>
  )
}
