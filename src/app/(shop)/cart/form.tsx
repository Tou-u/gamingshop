'use client'
import CartIconX from '@/components/ui/icons/CartIconX'
import { removeFromCart } from '@/lib/actions/shop'
import { UserCart } from '@/types'
import { Button } from '@nextui-org/button'
import { User } from 'lucia'
import { useFormStatus } from 'react-dom'

export default function Form({ user, product }: { user: User; product: UserCart }) {
  function CartData() {
    const data = new FormData()
    data.append('user_id', user.userId)
    data.append('product_id', product.id)
    return data
  }

  return (
    <form action={removeFromCart.bind(null, CartData())}>
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
