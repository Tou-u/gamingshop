'use client'
import { Key, useEffect, useState } from 'react'
import { Input, Textarea } from '@nextui-org/input'
import { Button, ButtonGroup } from '@nextui-org/button'
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete'
import { Switch } from '@nextui-org/switch'
import NextLink from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { NewProduct } from '@/actions'
import toast, { Toaster } from 'react-hot-toast'

type Categories = {
  id: string
  name: string
}[]

type Brands = {
  id: string
  name: string
}[]

export default function EditForm({
  categories,
  brands
}: {
  categories: Categories
  brands: Brands
}) {
  const [selectedCategory, setSelectedCategory] = useState<Key>()
  const [selectedBrand, setSelectedBrand] = useState<Key>()
  const [isSelected, setIsSelected] = useState(false)

  const [state, formAction] = useFormState(NewProduct, undefined)

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
          <Input type="text" label="Slug" name="slug" />
          <Input type="text" label="Name" name="name" />
          <Textarea type="text" label="Description" name="description" />
          <Input type="text" label="Image" name="image" />
          <Input
            type="number"
            label="Price"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            name="price"
          />
          <Input type="number" label="Stock" name="stock" />
          <Autocomplete
            label="Category"
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
          <input type="text" name="id" hidden />
          <ButtonGroup>
            <Button as={NextLink} href="/dashboard">
              Go Back
            </Button>
            {state?.success ? null : <SaveButton />}
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
