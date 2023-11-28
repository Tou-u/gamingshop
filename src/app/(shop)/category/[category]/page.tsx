import { Suspense } from 'react'
import GetData from './get-data'
import Loading from '@/components/ui/Loading'

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category.replace('_', ' ')

  return (
    <>
      <h1 className="capitalize text-center pb-1 font-bold text-lg">{category}</h1>
      <Suspense
        fallback={
          <div className="h-[150px] flex flex-col items-center justify-center">
            <Loading title={`Loading ${category}`} />
          </div>
        }>
        <GetData category={category} />
      </Suspense>
    </>
  )
}
