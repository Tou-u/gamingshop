import { redirect } from 'next/navigation'
import Data from './data'
import { Suspense } from 'react'
import Loading from '@/components/ui/Loading'

type Props = {
  searchParams: { q: string }
}

export default function PageSearch({ searchParams }: Props) {
  if (!searchParams.q) {
    redirect('/')
  }

  return (
    <main className="pb-2">
      <h1 className="text-center pb-1 font-bold text-lg">{`Products found from search: "${searchParams.q}"`}</h1>
      <Suspense key={searchParams.q} fallback={<Loading title="Searching Product..." gap />}>
        <Data searchParams={searchParams} />
      </Suspense>
    </main>
  )
}
