'use client'
import { Pagination, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styles from './carousel.module.css'
import ProductCard from '@/components/ProductCard'

type Product = {
  image: string
  slug: string
  name: string
  price: number
}

export default function Carousel({ products }: { products: Product[] }) {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      slidesPerView="auto"
      pagination={{
        clickable: true,
        horizontalClass: styles.pagination,
        bulletClass: styles.bullet,
        bulletActiveClass: styles.active
      }}
      grabCursor
      autoplay>
      {products.map((product) => (
        <SwiperSlide key={product.slug} className={styles.slide}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
