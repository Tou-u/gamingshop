'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { Select, SelectItem } from '@nextui-org/select'
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete'
import ProductCard from '@/components/ProductCard'

type Product = {
  image: string
  brand: {
    name: string
  }
  slug: string
  name: string
  price: number
}

type Brand = {
  brand: {
    name: string
  }
}

export default function CategoryList({
  products,
  brands
}: {
  products: Product[]
  brands: Brand[]
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const params = new URLSearchParams(searchParams)

  const currentOrder = searchParams.get('order')
  const currentBrand = searchParams.get('brand') || undefined

  const handleOrderBy = (order: string) => {
    if (order) {
      params.set('order', order)
    } else {
      params.delete('order')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  const handleBrand = (brand: string) => {
    if (brand) {
      params.set('brand', brand)
    } else {
      params.delete('brand')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      <div className="flex gap-4 pb-2 justify-center md:justify-normal">
        <Select
          color="primary"
          className="w-[150px]"
          label="Order by"
          size="sm"
          labelPlacement="inside"
          defaultSelectedKeys={currentOrder ? [currentOrder] : []}
          onChange={(e) => handleOrderBy(e.target.value)}>
          <SelectItem key="asc">Lower Price</SelectItem>
          <SelectItem key="desc">Higher Price</SelectItem>
        </Select>
        <Autocomplete
          label="Filter by brand"
          color="primary"
          size="sm"
          className="w-[150px]"
          defaultSelectedKey={currentBrand}
          onSelectionChange={(e) => handleBrand(e as string)}>
          {brands.map((b) => (
            <AutocompleteItem key={b.brand.name} value={b.brand.name}>
              {b.brand.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] place-items-center gap-2">
          {products.map((product) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      )}
    </>
  )
}
