'use client'
import Flicking, { ViewportSlot } from '@egjs/react-flicking'
import '@egjs/react-flicking/dist/flicking.css'
import { Arrow, Pagination } from '@egjs/flicking-plugins'
import '@egjs/flicking-plugins/dist/pagination.css'
import '@egjs/flicking-plugins/dist/arrow.css'
import ProductCard from '@/components/ProductCard'

type Products = {
  slug: string
  name: string
  image: string
  price: number
}[]

export default function CarouselComponent({ products }: { products: Products }) {
  const plugins = [new Pagination({ type: 'bullet' }), new Arrow()]
  return (
    <Flicking useFindDOMNode align={'prev'} circular plugins={plugins}>
      {products.map((p) => (
        <div key={p.slug} className="px-2">
          <ProductCard product={p} />
        </div>
      ))}
      <ViewportSlot>
        <div className="flicking-pagination"></div>
        <span className="flicking-arrow-prev is-circle"></span>
        <span className="flicking-arrow-next is-circle"></span>
      </ViewportSlot>
    </Flicking>
  )
}
