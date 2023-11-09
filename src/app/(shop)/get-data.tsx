import { getMainProducts } from '@/lib/data'
import Error from '@/components/Error'
import Carousel from '@/components/Carousel'
import { Link } from '@nextui-org/link'
import NextLink from 'next/link'

export default async function GetData() {
  const products = await getMainProducts()

  if (products.error) {
    return <Error />
  }

  const graphic_cards = products.data
    ?.filter((x) => x.name === 'graphics cards')
    .flatMap((x) => x.products)

  const processors = products.data
    ?.filter((x) => x.name === 'processors')
    .flatMap((x) => x.products)

  return (
    <>
      {graphic_cards && processors && (
        <section>
          <Link
            as={NextLink}
            showAnchorIcon
            href="/category/graphics_cards"
            className="font-bold text-lg p-1">
            Graphics Cards
          </Link>
          <Carousel products={graphic_cards} />
          <article>
            <Link
              as={NextLink}
              showAnchorIcon
              href="/category/processors"
              className="font-bold text-lg p-1">
              Processors
            </Link>
            <Carousel products={processors} />
          </article>
        </section>
      )}
    </>
  )
}
