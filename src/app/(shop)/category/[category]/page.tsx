import { Suspense } from 'react'
import Data from './data'
import Loading from '@/components/ui/Loading'

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { category: string }
  searchParams?: { order?: 'asc' | 'desc'; brand?: string }
}) {
  const category = params.category.replace('_', ' ')

  return (
    <>
      <h1 className="capitalize text-center pb-1 font-bold text-lg">{category}</h1>
      <Suspense fallback={<Loading title={`Loading ${category}`} gap />}>
        <Data category={category} searchParams={searchParams} />
      </Suspense>
    </>
  )
}
