'use client'
import { RemoveFromCart } from '@/actions'
import { Product } from '@/types'
import { Button } from '@nextui-org/button'
import { User } from 'lucia'
import { FormEvent } from 'react'

export default function Form({ user, product }: { user: User; product: Product }) {
  async function handleRemoveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData()
    data.append('user_id', user.userId)
    data.append('product_slug', product.slug)
    await RemoveFromCart(null, data)
  }

  return (
    <form onSubmit={handleRemoveProduct}>
      <Button size="sm" color="danger" className="w-fit" type="submit">
        Remove product
      </Button>
    </form>
  )
}
