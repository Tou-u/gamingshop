'use client'
import { Product, UserCart } from '@/types'
import { User } from 'lucia'
import { AddToCart, RemoveFromCart } from '@/actions'
import { useFormStatus } from 'react-dom'
import { Button } from '@nextui-org/button'
import CartIconPlus from '@/components/ui/icons/CartIconPlus'
import CartIconX from '@/components/ui/icons/CartIconX'

export default function Form({
  product,
  user,
  cart
}: {
  product: Product
  user: User
  cart: UserCart
}) {
  const AlreadyInCart = cart.map((x) => x.slug).includes(product.slug)

  function AddToCartForm() {
    const data = new FormData()
    data.append('user_id', user.userId)
    data.append('product_slug', product.slug)
    return data
  }

  function RemoveFromCartForm() {
    const data = new FormData()
    data.append('user_id', user.userId)
    data.append('product_slug', product.slug)
    return data
  }

  return (
    <>
      {!AlreadyInCart ? (
        <form action={AddToCart.bind(null, AddToCartForm())}>
          <AddToCartButton />
        </form>
      ) : (
        <form action={RemoveFromCart.bind(null, RemoveFromCartForm())}>
          <RemoveFromCartButton />
        </form>
      )}
    </>
  )
}

function AddToCartButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      color="primary"
      isLoading={pending}
      startContent={!pending && <CartIconPlus />}>
      Add to cart
    </Button>
  )
}

function RemoveFromCartButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      color="danger"
      isLoading={pending}
      startContent={!pending && <CartIconX />}>
      Remove product
    </Button>
  )
}
