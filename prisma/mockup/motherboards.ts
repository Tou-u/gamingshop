import { Products } from './types'
import { getRandomDate } from './utils'

const mockup_motherboards: Products = [
  {
    name: 'ASUS ROG Strix B450-F Gaming Motherboard',
    description:
      'Highly-rated gaming motherboard with RGB lighting and support for AMD processors.',
    image: 'asusstrixb450f.webp',
    price: 129.99,
    slug: 'asusstrixb450f',
    stock: 10,
    brand_id: 'brand-02',
    active: true,
    created_at: getRandomDate(),
    id: 'asusstrixb450f'
  },
  {
    name: 'MSI MAG Z590 Tomahawk Motherboard',
    description:
      "Premium motherboard with support for Intel's latest processors and advanced features.",
    image: 'msiz590tomahawk.webp',
    price: 249.99,
    slug: 'msiz590tomahawk',
    stock: 5,
    brand_id: 'brand-01',
    active: true,
    created_at: getRandomDate(),
    id: 'msiz590tomahawk'
  },
  {
    name: 'Gigabyte B450 AORUS PRO WIFI Motherboard',
    description:
      'Feature-rich motherboard with Wi-Fi support and compatibility with AMD processors.',
    image: 'gigabyteb450aorus.webp',
    price: 139.99,
    slug: 'gigabyteb450aorus',
    stock: 7,
    brand_id: 'brand-03',
    active: true,
    created_at: getRandomDate(),
    id: 'gigabyteb450aorus'
  },
  {
    name: 'ASRock B550M Steel Legend Motherboard',
    description:
      'Compact micro-ATX motherboard with a robust steel design and support for AMD processors.',
    image: 'asrockb550m.webp',
    price: 109.99,
    slug: 'asrockb550m',
    stock: 8,
    brand_id: 'brand-31',
    active: true,
    created_at: getRandomDate(),
    id: 'asrockb550m'
  },
  {
    name: 'ASUS TUF Gaming B460-Plus Motherboard',
    description:
      'TUF series motherboard with military-grade components and support for Intel processors.',
    image: 'asustufb460plus.webp',
    price: 119.99,
    slug: 'asustufb460plus',
    stock: 6,
    brand_id: 'brand-02',
    active: true,
    created_at: getRandomDate(),
    id: 'asustufb460plus'
  },
  {
    name: 'MSI MPG Z590 Gaming Edge WiFi Motherboard',
    description:
      'Gaming-oriented motherboard with Wi-Fi support and compatibility with Intel processors.',
    image: 'msiz590gamingedge.webp',
    price: 189.99,
    slug: 'msiz590gamingedge',
    stock: 4,
    brand_id: 'brand-01',
    active: true,
    created_at: getRandomDate(),
    id: 'msiz590gamingedge'
  },
  {
    name: 'Gigabyte X570 AORUS Master Motherboard',
    description:
      'High-end motherboard with extensive features and support for AMD Ryzen processors.',
    image: 'gigabytex570master.webp',
    price: 279.99,
    slug: 'gigabytex570master',
    stock: 3,
    brand_id: 'brand-03',
    active: true,
    created_at: getRandomDate(),
    id: 'gigabytex570master'
  },
  {
    name: 'ASRock H510M-HDV Motherboard',
    description:
      'Entry-level micro-ATX motherboard with support for Intel processors at an affordable price.',
    image: 'asrockh510mhdv.webp',
    price: 79.99,
    slug: 'asrockh510mhdv',
    stock: 9,
    brand_id: 'brand-31',
    active: true,
    created_at: getRandomDate(),
    id: 'asrockh510mhdv'
  },
  {
    name: 'ASUS Prime B550M-A/CSM Micro-ATX Motherboard',
    description:
      'Micro-ATX motherboard with business features and compatibility with AMD processors.',
    image: 'asusprimeb550m.webp',
    price: 99.99,
    slug: 'asusprimeb550m',
    stock: 7,
    brand_id: 'brand-02',
    active: true,
    created_at: getRandomDate(),
    id: 'asusprimeb550m'
  },
  {
    name: 'MSI B450 TOMAHAWK MAX Motherboard',
    description:
      'Reliable motherboard with extensive compatibility for AMD processors and gaming features.',
    image: 'msib450tomahawk.webp',
    price: 109.99,
    slug: 'msib450tomahawk',
    stock: 8,
    brand_id: 'brand-01',
    active: true,
    created_at: getRandomDate(),
    id: 'msib450tomahawk'
  }
]

export default mockup_motherboards
