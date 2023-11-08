import { Suspense } from 'react'
import Loading from '@/components/skeletons/Loading'
import GetData from './get-data'

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category.replace('_', ' ')

  return (
    <>
      <h1 className="capitalize text-center pb-1 font-bold text-lg">{category}</h1>
      <Suspense fallback={<Loading />}>
        <GetData category={category} />
      </Suspense>
    </>
  )
}
