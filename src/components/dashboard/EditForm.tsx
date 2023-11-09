'use client'
import { FormEvent, Key, useEffect, useState } from 'react'
import { Input, Textarea } from '@nextui-org/input'
import { Button, ButtonGroup } from '@nextui-org/button'
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete'
import { Switch } from '@nextui-org/switch'
import NextLink from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { EditProduct } from '@/actions'
import toast, { Toaster } from 'react-hot-toast'
import { Brand, Category, FullProduct } from '@/types'

export default function EditForm({
  product,
  categories,
  brands
}: {
  product: FullProduct
  categories: Category[]
  brands: Brand[]
}) {
  const [selectedCategory, setSelectedCategory] = useState<Key>(product.category.id!)
  const [selectedBrand, setSelectedBrand] = useState<Key>(product.brand.id!)
  const [isPublished, setIsPublished] = useState(product.active)

  const [state, formAction] = useFormState(EditProduct, undefined)

  useEffect(() => {
    const checkState = () => {
      if (state?.success) toast.success('Product saved')
      if (state?.error) toast.error(state.error)
    }
    checkState()
  }, [state])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const additionalInfo = [
      { name: 'category_id', value: selectedCategory as string },
      { name: 'brand_id', value: selectedBrand as string },
      { name: 'active', value: isPublished ? 'true' : 'false' },
      { name: 'id', value: product.id }
    ]
    additionalInfo.map((info) => data.append(info.name, info.value || ''))
    await formAction(data)
  }

  return (
    <>
      <Toaster position="bottom-center" />
      <form onSubmit={handleSubmit}>
        <section className="flex flex-col gap-3">
          <Input
            type="text"
            label="Slug"
            name="slug"
            defaultValue={product?.slug}
            autoComplete="off"
          />
          <Input
            type="text"
            label="Name"
            name="name"
            defaultValue={product?.name}
            autoComplete="off"
          />
          <Textarea
            type="text"
            label="Description"
            name="description"
            placeholder="0"
            defaultValue={product?.description}
            autoComplete="off"
          />
          <Input
            type="text"
            label="Image"
            name="image"
            defaultValue={product?.image}
            autoComplete="off"
          />
          <Input
            type="number"
            label="Price"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            name="price"
            placeholder="0"
            defaultValue={product?.price.toString()}
          />
          <Input
            type="number"
            label="Stock"
            name="stock"
            defaultValue={product?.stock.toString()}
          />
          <Autocomplete
            onFocusChange={() => {}}
            label="Category"
            defaultItems={categories}
            selectedKey={selectedCategory}
            onSelectionChange={setSelectedCategory}>
            {(item) => <AutocompleteItem key={item.id!}>{item.name}</AutocompleteItem>}
          </Autocomplete>
          <Autocomplete
            onFocusChange={() => {}}
            label="Brand"
            defaultItems={brands}
            selectedKey={selectedBrand}
            onSelectionChange={setSelectedBrand}>
            {(item) => <AutocompleteItem key={item.id!}>{item.name}</AutocompleteItem>}
          </Autocomplete>
          <Switch isSelected={isPublished} onValueChange={setIsPublished}>
            Publish product
          </Switch>
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
