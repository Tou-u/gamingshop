import { Fragment } from 'react'
import ProductCard from '@/components/ProductCard'
import api from '@/lib/data/shop'

type Props = {
  searchParams: { q: string }
}

export default async function Data({ searchParams }: Props) {
  const products = await api.getProductsByName(searchParams.q)

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] place-items-center gap-2">
      {products.map((product) => (
        <Fragment key={product.slug}>
          <ProductCard product={product} />
        </Fragment>
      ))}
    </div>
  )
}
