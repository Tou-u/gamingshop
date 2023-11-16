import ProductCard from '@/components/ProductCard'
import api from '@/lib/data'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'

type Props = {
  searchParams: { q: string }
}

export default async function PageSearch({ searchParams }: Props) {
  if (!searchParams.q) {
    redirect('/')
  }

  const products = await api.getProductsByName(searchParams.q)

  return (
    <main className="p-2">
      <h1 className="text-center pb-1 font-bold text-lg">{`Products found from search: "${searchParams.q}"`}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-5 place-items-center gap-4">
        {products.map((product) => (
          <Fragment key={product.slug}>
            <ProductCard product={product} />
          </Fragment>
        ))}
      </div>
    </main>
  )
}
