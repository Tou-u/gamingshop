'use client'
import ProductCard from './ProductCard'
import { useFilterStore } from '@/store/zustand'
import SelectComponent from './ui/Select'
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete'
import { useState } from 'react'
import { Products } from '@/types'

export default function FilterCategory({ products }: { products: Products }) {
  const { option } = useFilterStore()

  const [sortProducts, setSortProducts] = useState(products)

  let filterProducts = sortProducts.slice()

  const brands = products
    .map((item) => item.brand!.name)
    .filter((value, index, self) => self.indexOf(value) === index)

  if (option === 'higher') {
    filterProducts.sort((a, b) => b.price - a.price)
  } else if (option === 'lower') {
    filterProducts.sort((a, b) => a.price - b.price)
  }

  function handleChangeBrand(value: any) {
    if (value) {
      setSortProducts(products.filter((x) => x.brand!.name === value))
    } else {
      setSortProducts(products)
    }
  }

  return (
    <>
      <div className="pl-3 flex pb-2 gap-2">
        <SelectComponent />
        <Autocomplete
          label="Filter by brand"
          color="primary"
          size="sm"
          className="w-[150px]"
          onSelectionChange={(e) => handleChangeBrand(e)}>
          {brands.map((brand) => (
            <AutocompleteItem key={brand} value={brand}>
              {brand}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 place-items-center gap-4">
        {filterProducts.map((product) => (
          <ProductCard product={product} key={product.slug} />
        ))}
      </div>
    </>
  )
}
