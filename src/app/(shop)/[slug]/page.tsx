import { getPageSession } from '@/auth/lucia'
import { UserCart } from '@/types'
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
import { PUBLIC_URL } from '@/lib/r2'
import { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

let usercart: UserCart[] = []

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await api.getProductBySlug(params.slug)
  if (!product) notFound()

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

export default async function ProductPage({ params }: Props) {
  const session = await getPageSession().catch((session) => (session = null))
  if (session) {
    usercart = await api.getUserCart(session.user.userId)
  }
  const product = await api.getProductBySlug(params.slug)

  return (
    <>
      {product && (
        <section className="py-4">
          <div className="grid grid-cols-2">
            <Image isZoomed width={500} src={`${PUBLIC_URL}/${product.image}`} alt={product.name} />
            <div className="m-auto w-[90%]">
              <h1 className="text-xl sm:text-4xl font-bold pb-2 text-primary-400">
                {product.name}
              </h1>
              <p>{product.description}</p>
              <p className="text-2xl font-bold ">{CurrencyToUSD(product.price)}</p>
              <div className="flex flex-col gap-2">
                <p className="sm:w-1/4">
                  Stock <span className="font-semibold">{product.stock}</span>
                </p>
                {!session ? (
                  <Button
                    fullWidth
                    as={NextLink}
                    variant="shadow"
                    color="primary"
                    startContent={<CartIconPlus />}
                    href={`/login?callbackUrl=${params.slug}`}>
                    Add to cart
                  </Button>
                ) : product.stock === 0 ? (
                  <Button variant="shadow" color="danger" isDisabled startContent={<CartIconX />}>
                    Out of stock
                  </Button>
                ) : (
                  <Form product={product} user={session.user} cart={usercart} />
                )}
              </div>
            </div>
          </div>
          <ul className="list-disc list-inside pt-4">
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Cras vel odio imperdiet, pellentesque neque ac, consequat elit.</li>
            <li>Aenean in mauris gravida, maximus augue ut, dapibus ligula.</li>
            <li>Mauris a massa at purus congue sodales.</li>
            <li>Pellentesque tincidunt ipsum eu mollis tempus.</li>
            <li>Maecenas a nisi non elit cursus consequat eu eget odio.</li>
          </ul>
        </section>
      )}
    </>
  )
}
