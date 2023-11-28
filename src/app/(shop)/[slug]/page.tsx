import { UserCart } from '@/types'
import { getPageSession } from '@/auth/lucia'
import api from '@/lib/data'
import { notFound } from 'next/navigation'
import { Image } from '@nextui-org/image'
import { Divider } from '@nextui-org/divider'
import { Button } from '@nextui-org/button'
import { currencyToUSD } from '@/utils/scripts'
import NextLink from 'next/link'
import Form from './form'
import CartIconPlus from '@/components/ui/icons/CartIconPlus'

let usercart: UserCart[] = []

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const session = await getPageSession().catch((session) => (session = null))
  const product = await api.getProductBySlug(params.slug)

  if (!product) notFound()

  if (session) {
    usercart = await api.getUserCart(session.user.userId)
  }

  return (
    <main className="p-2">
      <h1 className="text-lg font-bold text-center pb-2">{product.name}</h1>
      <div className="grid grid-cols-2 place-items-center">
        <Image src="/placeholder.jpeg" alt={product.name} />
        <div>
          <p className="text-lg">{currencyToUSD(product.price)}</p>
          <Divider />
          <p>Stock: {product.stock}</p>
          {!session ? (
            <Button
              as={NextLink}
              color="primary"
              startContent={<CartIconPlus />}
              href={`/login?callbackUrl=${params.slug}`}>
              Add to cart
            </Button>
          ) : (
            <Form product={product} user={session.user} cart={usercart} />
          )}
        </div>
      </div>
      <p className="text-center">{product.description}</p>
    </main>
  )
}
