'use client'
import { useState } from 'react'
import { Product } from '@/types'
import Select from '@/components/Select'
import Autocomplete from '@/components/Autocomplete'
import ProductCard from '@/components/ProductCard'

type Option = 'default' | 'lower' | 'higher'

export default function CategoryList({ products }: { products: Product[] }) {
  const [orderBy, setOrderBy] = useState<Option>('default')
  const [sortProducts, setSortProducts] = useState(products)

  let filterProducts = sortProducts.slice()

  const brands = products
    .map((item) => item.brand!.name)
    .filter((value, index, self) => self.indexOf(value) === index)

  if (orderBy === 'higher') {
    filterProducts.sort((a, b) => b.price - a.price)
  } else if (orderBy === 'lower') {
    filterProducts.sort((a, b) => a.price - b.price)
  }

  return (
    <>
      <div className="flex items-center gap-2 pb-2">
        <Select setOrderBy={setOrderBy} />
        <Autocomplete brands={brands} setSortProducts={setSortProducts} products={products} />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] place-items-center gap-2">
        {filterProducts.map((product) => (
          <ProductCard product={product} key={product.slug} />
        ))}
      </div>
    </>
  )
}
