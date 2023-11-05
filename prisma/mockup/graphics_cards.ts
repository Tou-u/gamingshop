import { Products } from './types'

const mockup_graphics_cards: Products = [
  {
    name: 'MSI NVIDIA GeForce RTX 3090',
    description:
      'Flagship NVIDIA graphics card for extreme gaming and real-time ray tracing performance.',
    image: 'https://www.example.com/image_gpu3.jpg',
    price: 999.99,
    slug: 'rtx3090',
    stock: 2,
    brand_id: 'brand-01'
  },
  {
    name: 'ASUS AMD Radeon RX 6900 XT',
    description:
      'High-end AMD gaming graphics card, built for stunning visuals and competitive gaming.',
    image: 'https://www.example.com/image_gpu4.jpg',
    price: 799.99,
    slug: 'rx6900xt',
    stock: 5,
    brand_id: 'brand-02'
  },
  {
    name: 'Gigabyte NVIDIA GeForce GTX 1660 Super',
    description: 'Mid-range graphics card for smooth 1080p gaming and content creation.',
    image: 'https://www.example.com/image_gpu5.jpg',
    price: 249.99,
    slug: 'gtx1660super',
    stock: 3,
    brand_id: 'brand-03'
  },
  {
    name: 'EVGA AMD Radeon RX 6700 XT',
    description: 'High-performance AMD graphics card for demanding gaming and 1440p resolutions.',
    image: 'https://www.example.com/image_gpu6.jpg',
    price: 499.99,
    slug: 'rx6700xt',
    stock: 7,
    brand_id: 'brand-04'
  },
  {
    name: 'Zotac NVIDIA GeForce RTX 3080',
    description:
      'High-end NVIDIA graphics card with ray tracing capabilities for immersive gaming experiences.',
    image: 'https://www.example.com/image_gpu1.jpg',
    price: 699.99,
    slug: 'rtx3080',
    stock: 1,
    brand_id: 'brand-21'
  },
  {
    name: 'Sapphire AMD Radeon RX 6800 XT',
    description:
      'High-quality AMD gaming graphics card designed for competitive gaming and 1440p gaming.',
    image: 'https://www.example.com/image_gpu2.jpg',
    price: 649.99,
    slug: 'rx6800xt',
    stock: 4,
    brand_id: 'brand-22'
  },
  {
    name: 'MSI NVIDIA GeForce GTX 1650',
    description: 'Entry-level NVIDIA graphics card for budget gaming and multimedia tasks.',
    image: 'https://www.example.com/image_gpu7.jpg',
    price: 169.99,
    slug: 'gtx1650',
    stock: 6,
    brand_id: 'brand-01'
  },
  {
    name: 'ASUS AMD Radeon RX 5700 XT',
    description: 'High-performance AMD gaming graphics card for smooth 1440p gaming experiences.',
    image: 'https://www.example.com/image_gpu8.jpg',
    price: 399.99,
    slug: 'rx5700xt',
    stock: 2,
    brand_id: 'brand-02'
  },
  {
    name: 'Gigabyte NVIDIA GeForce GTX 1660 Ti',
    description: 'Mid-range NVIDIA graphics card for 1080p gaming and content creation.',
    image: 'https://www.example.com/image_gpu9.jpg',
    price: 279.99,
    slug: 'gtx1660ti',
    stock: 3,
    brand_id: 'brand-03'
  },
  {
    name: 'EVGA Radeon RX 5600 XT',
    description: 'Value-oriented AMD gaming graphics card for 1080p gaming and multitasking.',
    image: 'https://www.example.com/image_gpu10.jpg',
    price: 249.99,
    slug: 'rx5600xt',
    stock: 5,
    brand_id: 'brand-04'
  },
  {
    name: 'Zotac NVIDIA GeForce RTX 3070',
    description:
      'High-performance NVIDIA graphics card with ray tracing support for exceptional gaming visuals.',
    image: 'https://www.example.com/image_gpu11.jpg',
    price: 499.99,
    slug: 'rtx3070',
    stock: 4,
    brand_id: 'brand-21'
  },
  {
    name: 'Sapphire AMD Radeon RX 6600 XT',
    description: 'Mid-range AMD gaming graphics card for 1080p gaming and eSports performance.',
    image: 'https://www.example.com/image_gpu12.jpg',
    price: 299.99,
    slug: 'rx6600xt',
    stock: 6,
    brand_id: 'brand-22'
  },
  {
    name: 'Sapphire NVIDIA GeForce GTX 1050 Ti',
    description: 'Entry-level NVIDIA graphics card for budget gaming and multimedia tasks.',
    image: 'https://www.example.com/image_gpu13.jpg',
    price: 149.99,
    slug: 'gtx1050ti',
    stock: 2,
    brand_id: 'brand-22'
  },
  {
    name: 'Zotac AMD Radeon RX 5500 XT',
    description: 'Value-oriented AMD gaming graphics card for 1080p gaming and casual use.',
    image: 'https://www.example.com/image_gpu14.jpg',
    price: 199.99,
    slug: 'rx5500xt',
    stock: 8,
    brand_id: 'brand-21'
  },
  {
    name: 'EVGA NVIDIA GeForce GTX 1660',
    description:
      'NVIDIA graphics card for budget-conscious gamers seeking 1080p gaming performance.',
    image: 'https://www.example.com/image_gpu15.jpg',
    price: 219.99,
    slug: 'gtx1660',
    stock: 5,
    brand_id: 'brand-04'
  },
  {
    name: 'Gigabyte AMD Radeon RX 560',
    description: 'AMD graphics card for basic gaming and multimedia tasks at an affordable price.',
    image: 'https://www.example.com/image_gpu16.jpg',
    price: 99.99,
    slug: 'rx560',
    stock: 10,
    brand_id: 'brand-03'
  },
  {
    name: 'ASUS NVIDIA GeForce GT 1030',
    description: 'Entry-level NVIDIA graphics card for HTPC and low-power gaming applications.',
    image: 'https://www.example.com/image_gpu17.jpg',
    price: 89.99,
    slug: 'gt1030',
    stock: 3,
    brand_id: 'brand-02'
  },
  {
    name: 'MSI AMD Radeon RX 550',
    description:
      'Basic AMD graphics card for display and multimedia purposes with low power consumption.',
    image: 'https://www.example.com/image_gpu18.jpg',
    price: 69.99,
    slug: 'rx550',
    stock: 5,
    brand_id: 'brand-01'
  },
  {
    name: 'MSI NVIDIA GeForce RTX 3050',
    description: 'Budget-friendly NVIDIA graphics card for 1080p gaming and eSports performance.',
    image: 'https://www.example.com/image_gpu19.jpg',
    price: 249.99,
    slug: 'rtx3050',
    stock: 7,
    brand_id: 'brand-01'
  },
  {
    name: 'ASUS AMD Radeon RX 6400',
    description: 'Entry-level AMD graphics card for casual gaming and multimedia entertainment.',
    image: 'https://www.example.com/image_gpu20.jpg',
    price: 129.99,
    slug: 'rx6400',
    stock: 4,
    brand_id: 'brand-02'
  }
]

export default mockup_graphics_cards
