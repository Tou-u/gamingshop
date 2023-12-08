import { Products } from './types'
import { getRandomDate } from './utils'

const mockup_graphics_cards: Products = [
  {
    id: 'rtx3090',
    name: 'MSI NVIDIA GeForce RTX 3090',
    description:
      'Flagship NVIDIA graphics card for extreme gaming and real-time ray tracing performance.',
    image: 'rtx3090.webp',
    price: 999.99,
    slug: 'rtx3090',
    stock: 2,
    brand_id: 'brand-01',
    active: true,
    created_at: getRandomDate()
  },
  {
    id: 'rx6900xt',
    name: 'ASUS AMD Radeon RX 6900 XT',
    description:
      'High-end AMD gaming graphics card, built for stunning visuals and competitive gaming.',
    image: 'rx6900xt.webp',
    price: 799.99,
    slug: 'rx6900xt',
    stock: 5,
    brand_id: 'brand-02',
    active: true,
    created_at: getRandomDate()
  },
  {
    id: 'gtx1660super',
    name: 'Gigabyte NVIDIA GeForce GTX 1660 Super',
    description: 'Mid-range graphics card for smooth 1080p gaming and content creation.',
    image: 'gtx1660super.webp',
    price: 249.99,
    slug: 'gtx1660super',
    stock: 3,
    brand_id: 'brand-03',
    active: true,
    created_at: getRandomDate()
  },
  {
    id: 'rx6700xt',
    name: 'EVGA AMD Radeon RX 6700 XT',
    description: 'High-performance AMD graphics card for demanding gaming and 1440p resolutions.',
    image: 'rx6700xt.webp',
    price: 499.99,
    slug: 'rx6700xt',
    stock: 7,
    brand_id: 'brand-04',
    active: true,
    created_at: getRandomDate()
  },
  {
    id: 'rtx3080',
    name: 'Zotac NVIDIA GeForce RTX 3080',
    description:
      'High-end NVIDIA graphics card with ray tracing capabilities for immersive gaming experiences.',
    image: 'rtx3080.webp',
    price: 699.99,
    slug: 'rtx3080',
    stock: 1,
    brand_id: 'brand-21',
    active: true,
    created_at: getRandomDate()
  },
  {
    id: 'rx6800xt',
    name: 'Sapphire AMD Radeon RX 6800 XT',
    description:
      'High-quality AMD gaming graphics card designed for competitive gaming and 1440p gaming.',
    image: 'rx6800xt.webp',
    price: 649.99,
    slug: 'rx6800xt',
    stock: 4,
    brand_id: 'brand-22',
    active: true,
    created_at: getRandomDate()
  },
  {
    id: 'gtx1650',
    name: 'MSI NVIDIA GeForce GTX 1650',
    description: 'Entry-level NVIDIA graphics card for budget gaming and multimedia tasks.',
    image: 'gtx1650.webp',
    price: 169.99,
    slug: 'gtx1650',
    stock: 6,
    brand_id: 'brand-01',
    active: true,
    created_at: getRandomDate()
  },
  {
    id: 'rx5700xt',
    name: 'ASUS AMD Radeon RX 5700 XT',
    description: 'High-performance AMD gaming graphics card for smooth 1440p gaming experiences.',
    image: 'rx5700xt.webp',
    price: 399.99,
    slug: 'rx5700xt',
    stock: 2,
    brand_id: 'brand-02',
    active: true,
    created_at: getRandomDate()
  },
  {
    id: 'gtx1660ti',
    name: 'Gigabyte NVIDIA GeForce GTX 1660 Ti',
    description: 'Mid-range NVIDIA graphics card for 1080p gaming and content creation.',
    image: 'gtx1660ti.webp',
    price: 279.99,
    slug: 'gtx1660ti',
    stock: 3,
    brand_id: 'brand-03',
    active: true,
    created_at: getRandomDate()
  },
  {
    id: 'rx5600xt',
    name: 'EVGA Radeon RX 5600 XT',
    description: 'Value-oriented AMD gaming graphics card for 1080p gaming and multitasking.',
    image: 'rx5600xt.webp',
    price: 249.99,
    slug: 'rx5600xt',
    stock: 5,
    brand_id: 'brand-04',
    active: true,
    created_at: getRandomDate()
  },
  {
    id: 'rtx3070',
    name: 'Zotac NVIDIA GeForce RTX 3070',
    description:
      'High-performance NVIDIA graphics card with ray tracing support for exceptional gaming visuals.',
    image: 'rtx3070.webp',
    price: 499.99,
    slug: 'rtx3070',
    stock: 4,
    brand_id: 'brand-21',
    active: true,
    created_at: getRandomDate()
  },
  {
    id: 'rx6600xt',
    name: 'Sapphire AMD Radeon RX 6600 XT',
    description: 'Mid-range AMD gaming graphics card for 1080p gaming and eSports performance.',
    image: 'rx6600xt.webp',
    price: 299.99,
    slug: 'rx6600xt',
    stock: 6,
    brand_id: 'brand-22',
    active: true,
    created_at: getRandomDate()
  },
  {
    id: 'gtx1050ti',
    name: 'Sapphire NVIDIA GeForce GTX 1050 Ti',
    description: 'Entry-level NVIDIA graphics card for budget gaming and multimedia tasks.',
    image: 'gtx1050ti.webp',
    price: 149.99,
    slug: 'gtx1050ti',
    stock: 2,
    brand_id: 'brand-22',
    active: true,
    created_at: getRandomDate()
  },
  {
    id: 'rx5500xt',
    name: 'Zotac AMD Radeon RX 5500 XT',
    description: 'Value-oriented AMD gaming graphics card for 1080p gaming and casual use.',
    image: 'rx5500xt.webp',
    price: 199.99,
    slug: 'rx5500xt',
    stock: 8,
    brand_id: 'brand-21',
    active: true,
    created_at: getRandomDate()
  },
  {
    id: 'gtx1660',
    name: 'EVGA NVIDIA GeForce GTX 1660',
    description:
      'NVIDIA graphics card for budget-conscious gamers seeking 1080p gaming performance.',
    image: 'gtx1660.webp',
    price: 219.99,
    slug: 'gtx1660',
    stock: 5,
    brand_id: 'brand-04',
    active: true,
    created_at: getRandomDate()
  },
  {
    id: 'rx560',
    name: 'Gigabyte AMD Radeon RX 560',
    description: 'AMD graphics card for basic gaming and multimedia tasks at an affordable price.',
    image: 'rx560.webp',
    price: 99.99,
    slug: 'rx560',
    stock: 10,
    brand_id: 'brand-03',
    active: true,
    created_at: getRandomDate()
  },
  {
    id: 'gt1030',
    name: 'ASUS NVIDIA GeForce GT 1030',
    description: 'Entry-level NVIDIA graphics card for HTPC and low-power gaming applications.',
    image: 'gt1030.webp',
    price: 89.99,
    slug: 'gt1030',
    stock: 3,
    brand_id: 'brand-02',
    active: true,
    created_at: getRandomDate()
  },
  {
    id: 'rx550',
    name: 'MSI AMD Radeon RX 550',
    description:
      'Basic AMD graphics card for display and multimedia purposes with low power consumption.',
    image: 'rx550.webp',
    price: 69.99,
    slug: 'rx550',
    stock: 5,
    brand_id: 'brand-01',
    active: true,
    created_at: getRandomDate()
  },
  {
    id: 'rtx3050',
    name: 'MSI NVIDIA GeForce RTX 3050',
    description: 'Budget-friendly NVIDIA graphics card for 1080p gaming and eSports performance.',
    image: 'rtx3050.webp',
    price: 249.99,
    slug: 'rtx3050',
    stock: 7,
    brand_id: 'brand-01',
    active: true,
    created_at: getRandomDate()
  },
  {
    id: 'rx6400',
    name: 'ASUS AMD Radeon RX 6400',
    description: 'Entry-level AMD graphics card for casual gaming and multimedia entertainment.',
    image: 'rx6400.webp',
    price: 129.99,
    slug: 'rx6400',
    stock: 4,
    brand_id: 'brand-02',
    active: true,
    created_at: getRandomDate()
  }
]

export default mockup_graphics_cards
