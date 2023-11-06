import { Suspense } from 'react'
import Loading from '@/components/skeletons/Loading'
import GetData from './get-data'

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category.replace('_', ' ')

  return (
    <main className="p-2 max-w-screen-lg m-auto">
      <h1 className="capitalize text-center pb-1 font-bold text-lg">{category}</h1>
      <Suspense fallback={<Loading />}>
        <GetData category={category} />
      </Suspense>
    </main>
  )
}
