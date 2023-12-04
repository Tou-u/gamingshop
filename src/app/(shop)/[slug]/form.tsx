'use client'
import { Product, UserCart } from '@/types'
import { User } from 'lucia'
import { useFormStatus } from 'react-dom'
import { Button } from '@nextui-org/button'
import CartIconPlus from '@/components/ui/icons/CartIconPlus'
import CartIconX from '@/components/ui/icons/CartIconX'
import { addToCart, removeFromCart } from '@/lib/actions/shop'

export default function Form({
  product,
  user,
  cart
}: {
  product: Product
  user: User
  cart: UserCart[]
}) {
  const AlreadyInCart = cart.map((cart) => cart.id).includes(product.id)

  function CartData() {
    const data = new FormData()
    data.append('user_id', user.userId)
    data.append('product_id', product.id)
    return data
  }

  return (
    <>
      {!AlreadyInCart ? (
        <form action={addToCart.bind(null, CartData())}>
          <AddToCartButton />
        </form>
      ) : (
        <form action={removeFromCart.bind(null, CartData())}>
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
