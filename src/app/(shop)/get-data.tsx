import { getMainProducts } from '@/lib/data'
import Error from '@/components/Error'
import Carousel from '@/components/Carousel'
import { Link } from '@nextui-org/link'

export default async function GetData() {
  const products = await getMainProducts()

  if (products.error) {
    return <Error />
  }

  // const graphic_cards = products.data
  //   ?.filter((x) => x.name === 'graphics cards')
  //   .flatMap((x) => x.products)

  return (
    <section>
      <Link className="font-bold text-lg p-1">Newly Added</Link>
      {products.data && <Carousel products={products.data} />}
    </section>
  )
}
