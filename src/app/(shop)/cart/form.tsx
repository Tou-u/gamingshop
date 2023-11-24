'use client'
import { RemoveFromCart } from '@/actions'
import CartIconX from '@/components/ui/icons/CartIconX'
import { Product } from '@/types'
import { Button } from '@nextui-org/button'
import { User } from 'lucia'
import { useFormStatus } from 'react-dom'

export default function Form({ user, product }: { user: User; product: Product }) {
  function RemoveProductForm() {
    const data = new FormData()
    data.append('user_id', user.userId)
    data.append('product_slug', product.slug)
    return data
  }

  return (
    <form action={RemoveFromCart.bind(null, RemoveProductForm())}>
      <RemoveFromCartButton />
    </form>
  )
}

function RemoveFromCartButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      size="sm"
      color="danger"
      className="w-fit"
      isLoading={pending}
      startContent={!pending && <CartIconX />}>
      Remove product
    </Button>
  )
}
