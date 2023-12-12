import api from '@/lib/data/shop'
import Carousel from './carousel'
import LandingCategories from '@/components/LandingCategories'

export default async function Data() {
  const products = await api.getMainProducts()

  return (
    <section className="pt-1">
      <h2 className="font-bold text-lg text-primary-400">Newly Added</h2>
      <Carousel products={products} />
      <h1 className="font-bold text-lg text-center text-primary-400 pt-2">Our Products</h1>
      <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-1">
        <LandingCategories />
      </div>
    </section>
  )
}
