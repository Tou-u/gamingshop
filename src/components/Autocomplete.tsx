// @ts-nocheck
import { Dispatch, SetStateAction } from 'react'
import { Autocomplete as AutocompleteUI, AutocompleteItem } from '@nextui-org/autocomplete'

type Product = {
  image: string
  brand: {
    name: string
  }
  slug: string
  name: string
  price: number
}

export default function Autocomplete({
  brands,
  setSortProducts,
  products
}: {
  brands: string[]
  setSortProducts: Dispatch<SetStateAction<Product[]>>
  products: Product[]
}) {
  function handleChangeBrand(selectedBrand: string) {
    if (selectedBrand) {
      setSortProducts(products.filter((x) => x.brand!.name === selectedBrand))
    } else {
      setSortProducts(products)
    }
  }

  return (
    <AutocompleteUI
      label="Filter by brand"
      color="primary"
      size="sm"
      className="w-[150px]"
      onSelectionChange={(e) => handleChangeBrand(e as string)}>
      {brands.map((brand) => (
        <AutocompleteItem key={brand} value={brand}>
          {brand}
        </AutocompleteItem>
      ))}
    </AutocompleteUI>
  )
}
