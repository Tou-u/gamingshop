import { Processors } from './types'
import { getRandomDate } from './utils'

const mockup_processors: Processors = [
  {
    name: 'Intel Core i9-10900K 10-Core Processor',
    description:
      'High-performance 10-core, 20-thread processor from Intel, designed for gamers and content creators.',
    image: 'i910900k.webp',
    price: 499.99,
    slug: 'i910900k',
    stock: 5,
    brand_id: 'brand-08',
    active: true,
    created_at: getRandomDate(),
    id: 'i910900k'
  },
  {
    name: 'AMD Ryzen 9 5900X 12-Core Processor',
    description:
      'Top-tier 12-core, 24-thread processor by AMD, optimized for gaming and productivity tasks.',
    image: 'ryzen5900x.webp',
    price: 549.99,
    slug: 'ryzen5900x',
    stock: 3,
    brand_id: 'brand-06',
    active: true,
    created_at: getRandomDate(),
    id: 'ryzen5900x'
  },
  {
    name: 'Intel Core i7-10700K 8-Core Processor',
    description: '8-core, 16-thread processor for high-performance computing and gaming.',
    image: 'i710700k.webp',
    price: 369.99,
    slug: 'i710700k',
    stock: 6,
    brand_id: 'brand-08',
    active: true,
    created_at: getRandomDate(),
    id: 'i710700k'
  },
  {
    name: 'AMD Ryzen 7 5800X 8-Core Processor',
    description:
      'High-performance 8-core, 16-thread processor by AMD, ideal for gaming and content creation.',
    image: 'ryzen5800x.webp',
    price: 449.99,
    slug: 'ryzen5800x',
    stock: 4,
    brand_id: 'brand-06',
    active: true,
    created_at: getRandomDate(),
    id: 'ryzen5800x'
  },
  {
    name: 'Intel Core i5-10600K 6-Core Processor',
    description: '6-core, 12-thread processor for smooth gaming and multitasking performance.',
    image: 'i510600k.webp',
    price: 259.99,
    slug: 'i510600k',
    stock: 8,
    brand_id: 'brand-08',
    active: true,
    created_at: getRandomDate(),
    id: 'i510600k'
  },
  {
    name: 'AMD Ryzen 5 5600X 6-Core Processor',
    description: '6-core, 12-thread processor for excellent gaming and multitasking performance.',
    image: 'ryzen5600x.webp',
    price: 299.99,
    slug: 'ryzen5600x',
    stock: 10,
    brand_id: 'brand-06',
    active: true,
    created_at: getRandomDate(),
    id: 'ryzen5600x'
  },
  {
    name: 'Intel Core i3-10100 4-Core Processor',
    description:
      'Budget-friendly 4-core, 8-thread processor for everyday computing and light gaming.',
    image: 'i310100.webp',
    price: 129.99,
    slug: 'i310100',
    stock: 6,
    brand_id: 'brand-08',
    active: true,
    created_at: getRandomDate(),
    id: 'i310100'
  },
  {
    name: 'AMD Ryzen 3 3300X 4-Core Processor',
    description:
      'Value-oriented 4-core, 8-thread processor for budget gaming and home office tasks.',
    image: 'ryzen3300x.webp',
    price: 109.99,
    slug: 'ryzen3300x',
    stock: 7,
    brand_id: 'brand-06',
    active: true,
    created_at: getRandomDate(),
    id: 'ryzen3300x'
  },
  {
    name: 'Intel Core i9-11900K 8-Core Processor',
    description:
      'High-end 8-core, 16-thread processor from Intel, perfect for enthusiasts and gamers.',
    image: 'i911900k.webp',
    price: 599.99,
    slug: 'i911900k',
    stock: 4,
    brand_id: 'brand-08',
    active: true,
    created_at: getRandomDate(),
    id: 'i911900k'
  },
  {
    name: 'AMD Ryzen 9 5950X 16-Core Processor',
    description:
      'Top-tier 16-core, 32-thread processor by AMD, offering unparalleled gaming and multitasking performance.',
    image: 'ryzen5950x.webp',
    price: 749.99,
    slug: 'ryzen5950x',
    stock: 2,
    brand_id: 'brand-06',
    active: true,
    created_at: getRandomDate(),
    id: 'ryzen5950x'
  }
]

export default mockup_processors
