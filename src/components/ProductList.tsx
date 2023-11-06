import { getMainProducts } from '@/lib/data'
import Carousel from './ui/Carousel'
import { Link } from '@nextui-org/link'
import NextLink from 'next/link'
import Error from './Error'

export default async function ProductList() {
  const products = await getMainProducts()

  const graphic_cards = products.data
    ?.filter((x) => x.name === 'graphics cards')
    .flatMap((x) => x.products)

  const processors = products.data
    ?.filter((x) => x.name === 'processors')
    .flatMap((x) => x.products)

  return (
    <section>
      {products.error && <Error />}
      {products.data && (
        <>
          <Link
            as={NextLink}
            showAnchorIcon
            href="/category/graphics_cards"
            className="font-bold text-lg p-1">
            Graphics Cards
          </Link>
          <Carousel products={graphic_cards!} />
          <article>
            <Link
              as={NextLink}
              showAnchorIcon
              href="/category/processors"
              className="font-bold text-lg p-1">
              Processors
            </Link>
            <Carousel products={processors!} />
          </article>
        </>
      )}
    </section>
  )
}
