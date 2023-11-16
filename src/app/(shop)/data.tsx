import api from '@/lib/data'
import { Link } from '@nextui-org/link'
import Carousel from '@/components/Carousel'

export default async function Data() {
  const products = await api.getMainProducts()

  return (
    <section>
      <Link className="font-bold text-lg p-1">Newly Added</Link>
      {products && <Carousel products={products} />}
    </section>
  )
}
