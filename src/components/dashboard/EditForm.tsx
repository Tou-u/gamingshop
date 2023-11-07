'use client'
import { Key, useEffect, useState } from 'react'
import { Input, Textarea } from '@nextui-org/input'
import { Button, ButtonGroup } from '@nextui-org/button'
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete'
import { Switch } from '@nextui-org/switch'
import NextLink from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { EditProduct } from '@/actions'
import toast, { Toaster } from 'react-hot-toast'

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  image: string
  price: number
  stock: number
  active: boolean
  category: {
    id: string
    name: string
  }
  brand: {
    id: string
    name: string
  }
}

export type Brands = {
  id: string
  name: string
}[]

export type Categories = {
  id: string
  name: string
}[]

export default function EditForm({
  product,
  categories,
  brands
}: {
  product: Product
  categories: Categories
  brands: Brands
}) {
  const [selectedCategory, setSelectedCategory] = useState<Key>(product.category.id)
  const [selectedBrand, setSelectedBrand] = useState<Key>(product.brand.id)
  const [isSelected, setIsSelected] = useState(product.active)

  const [state, formAction] = useFormState(EditProduct, undefined)

  useEffect(() => {
    const checkState = () => {
      if (state?.success) toast.success('Product saved')
      if (state?.error) toast.error(state.error)
    }
    checkState()
  }, [state])

  return (
    <>
      <Toaster position="bottom-center" />
      <form action={formAction}>
        <section className="flex flex-col gap-3">
          <Input type="text" label="Slug" name="slug" defaultValue={product?.slug} />
          <Input type="text" label="Name" name="name" defaultValue={product?.name} />
          <Textarea
            type="text"
            label="Description"
            name="description"
            defaultValue={product?.description}
          />
          <Input type="text" label="Image" name="image" defaultValue={product?.image} />
          <Input
            type="number"
            label="Price"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            name="price"
            defaultValue={product?.price.toString()}
          />
          <Input
            type="number"
            label="Stock"
            name="stock"
            defaultValue={product?.stock.toString()}
          />
          <Autocomplete
            label="Category"
            isRequired
            selectedKey={selectedCategory}
            onSelectionChange={setSelectedCategory}>
            {categories.map((category) => (
              <AutocompleteItem key={category.id} value={category.id}>
                {category.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Autocomplete
            label="Brand"
            isRequired
            selectedKey={selectedBrand}
            onSelectionChange={setSelectedBrand}>
            {brands.map((brand) => (
              <AutocompleteItem key={brand.id} value={brand.id}>
                {brand.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Switch
            name="active"
            isSelected={isSelected}
            onValueChange={setIsSelected}
            value={'active'}>
            Publish product
          </Switch>
          <input
            type="text"
            name="category_id"
            value={selectedCategory as string}
            onChange={() => setSelectedCategory}
            hidden
          />
          <input
            type="text"
            name="brand_id"
            value={selectedBrand as string}
            onChange={() => setSelectedBrand}
            hidden
          />
          <input type="text" defaultValue={product.id} name="id" hidden />
          <ButtonGroup>
            <Button as={NextLink} href="/dashboard">
              Go Back
            </Button>
            <SaveButton />
          </ButtonGroup>
        </section>
      </form>
    </>
  )
}

function SaveButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" isLoading={pending}>
      Save Changes
    </Button>
  )
}
