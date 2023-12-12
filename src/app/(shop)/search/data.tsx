import { Fragment } from 'react'
import ProductCard from '@/components/ProductCard'
import api from '@/lib/data/shop'

type Props = {
  searchParams: { q: string }
}

export default async function Data({ searchParams }: Props) {
  const products = await api.getProductsByName(searchParams.q)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 place-items-center gap-4">
      {products.map((product) => (
        <Fragment key={product.slug}>
          <ProductCard product={product} />
        </Fragment>
      ))}
    </div>
  )
}
