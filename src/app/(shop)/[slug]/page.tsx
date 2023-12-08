import { UserCart } from '@/types'
import { getPageSession } from '@/auth/lucia'
import api from '@/lib/data/shop'
import { notFound } from 'next/navigation'
import { Image } from '@nextui-org/image'
import { Divider } from '@nextui-org/divider'
import { Button } from '@nextui-org/button'
import NextLink from 'next/link'
import Form from './form'
import CartIconPlus from '@/components/ui/icons/CartIconPlus'
import CartIconX from '@/components/ui/icons/CartIconX'
import { CurrencyToUSD } from '@/lib/utils'
import { Metadata } from 'next'
import { PUBLIC_URL } from '@/lib/r2'

let usercart: UserCart[] = []

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await api.getProductBySlug(params.slug)

  if (product) {
    return {
      title: `${product.name} | Gaming Shop`,
      description: product.description,
      openGraph: {
        title: `${product.name} | Gaming Shop`,
        description: product.description,
        images: [`${PUBLIC_URL}/${product.image}`]
      }
    }
  }

  return {
    title: 'Gaming Shop'
  }
}

export default async function ProductPage({ params }: Props) {
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
        <Image src={`${PUBLIC_URL}/${product.image}`} alt={product.name} />
        <div>
          <p className="text-lg">{CurrencyToUSD(product.price)}</p>
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
          ) : product.stock === 0 ? (
            <Button color="danger" isDisabled startContent={<CartIconX />}>
              Out of stock
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
