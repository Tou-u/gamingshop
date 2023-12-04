'use client'
import { Key, useEffect, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Input, Textarea } from '@nextui-org/input'
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete'
import { Switch } from '@nextui-org/switch'
import { Button, ButtonGroup } from '@nextui-org/button'
import { useFormState, useFormStatus } from 'react-dom'
import { Brand, Category, FullProduct } from '@/types'
import NextLink from 'next/link'
import { createOrEditProduct } from '@/lib/actions/dashboard'
import { toast } from '@/lib/utils'
import SaveIcon from '@/components/ui/icons/SaveIcon'
import ArrowLeftIcon from '@/components/ui/icons/ArrowLeftIcon'

export default function Form({
  product,
  categories,
  brands
}: {
  product: FullProduct | null
  categories: Category[]
  brands: Brand[]
}) {
  const [selectedCategory, setSelectedCategory] = useState<Key>(product?.category.id || 0)
  const [selectedBrand, setSelectedBrand] = useState<Key>(product?.brand.id || 0)
  const [isPublished, setIsPublished] = useState(product?.active || false)

  const formRef = useRef<HTMLFormElement>(null)

  const [state, formAction] = useFormState(
    createOrEditProduct.bind(null, {
      category_id: selectedCategory,
      brand_id: selectedBrand,
      active: isPublished,
      productId: product?.id
    }),
    undefined
  )
  useEffect(() => {
    const checkState = () => {
      if (state?.success) {
        formRef.current?.reset()
        toast.success('Product saved')
      }
      if (state?.error) toast.error(state.error)
    }
    checkState()
  }, [state])

  return (
    <div autoFocus={false}>
      <h1 className="text-center font-bold text-lg pb-2">
        {product ? `Details of ${product.name}` : 'New Product'}
      </h1>
      <Toaster position="bottom-center" />
      <form action={formAction} ref={formRef}>
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
            inputMode="numeric"
            type="text"
            label="Price"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            name="price"
            placeholder="0"
            defaultValue={product?.price.toString()}
            autoComplete="off"
          />
          <Input
            inputMode="numeric"
            type="text"
            label="Stock"
            name="stock"
            placeholder="0"
            defaultValue={product?.stock.toString()}
            autoComplete="off"
          />
          <Autocomplete
            disableAnimation={true}
            label="Category"
            defaultItems={categories}
            selectedKey={selectedCategory}
            onSelectionChange={setSelectedCategory}>
            {(item) => <AutocompleteItem key={item.id!}>{item.name}</AutocompleteItem>}
          </Autocomplete>
          <Autocomplete
            disableAnimation={true}
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
            <Button as={NextLink} href="/dashboard" startContent={<ArrowLeftIcon />}>
              Go Back
            </Button>
            <SaveButton />
          </ButtonGroup>
        </section>
      </form>
    </div>
  )
}

function SaveButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      color="primary"
      isLoading={pending}
      startContent={!pending && <SaveIcon />}>
      Save Changes
    </Button>
  )
}
