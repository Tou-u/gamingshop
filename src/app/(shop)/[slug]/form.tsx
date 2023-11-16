'use client'
import { Product, UserCart } from '@/types'
import { User } from 'lucia'
import { AddToCart, RemoveFromCart } from '@/actions'
import { useFormState } from 'react-dom'
import { FormEvent } from 'react'
import { Button } from '@nextui-org/button'

export default function Form({
  product,
  user,
  cart
}: {
  product: Product
  user: User
  cart: UserCart
}) {
  const [addState, addAction] = useFormState(AddToCart, undefined)
  const [removeState, removeAction] = useFormState(RemoveFromCart, undefined)

  const AlreadyInCart = cart.map((x) => x.slug).includes(product.slug)

  async function handleAddToCart(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    data.append('user_id', user.userId)
    data.append('product_slug', product.slug)
    await addAction(data)
  }

  async function handleRemoveFromCart(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    data.append('user_id', user.userId)
    data.append('product_slug', product.slug)
    await removeAction(data)
  }

  return (
    <>
      {!AlreadyInCart ? (
        <form onSubmit={handleAddToCart}>
          <Button type="submit" color="primary">
            Add to cart
          </Button>
        </form>
      ) : (
        <form onSubmit={handleRemoveFromCart}>
          <Button type="submit" color="danger">
            Remove from cart
          </Button>
        </form>
      )}
    </>
  )
}
