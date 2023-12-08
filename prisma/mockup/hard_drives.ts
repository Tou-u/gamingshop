import { Products } from './types'
import { getRandomDate } from './utils'

const mockup_hard_drives: Products = [
  {
    name: 'Samsung 1TB NVMe SSD',
    description:
      'Swift and reliable 1TB NVMe solid-state drive from Samsung, perfect for faster data access and multitasking.',
    image: 'samsung1tbssd.webp',
    price: 129.99,
    slug: 'samsung1tbssd',
    stock: 8,
    brand_id: 'brand-09',
    active: true,
    created_at: getRandomDate(),
    id: 'samsung1tbssd'
  },
  {
    name: 'Seagate BarraCuda 4TB HDD',
    description:
      'High-capacity 4TB hard disk drive by Seagate, offering ample storage space for your files and applications.',
    image: 'seagate4tbhdd.webp',
    price: 99.99,
    slug: 'seagate4tbhdd',
    stock: 5,
    brand_id: 'brand-23',
    active: true,
    created_at: getRandomDate(),
    id: 'seagate4tbhdd'
  },
  {
    name: 'Crucial MX500 2TB SATA SSD',
    description: '2TB SATA SSD for fast storage and system responsiveness.',
    image: 'crucial2tbssd.webp',
    price: 199.99,
    slug: 'crucial2tbssd',
    stock: 6,
    brand_id: 'brand-24',
    active: true,
    created_at: getRandomDate(),
    id: 'crucial2tbssd'
  },
  {
    name: 'WD 500GB NVMe SSD',
    description:
      'High-speed 500GB NVMe solid-state drive from Western Digital, ideal for system acceleration and data transfer.',
    image: 'wd500gbssd.webp',
    price: 79.99,
    slug: 'wd500gbssd',
    stock: 7,
    brand_id: 'brand-10',
    active: true,
    created_at: getRandomDate(),
    id: 'wd500gbssd'
  },
  {
    name: 'Toshiba P300 1TB HDD',
    description:
      '1TB hard disk drive by Toshiba for reliable data storage and everyday computing tasks.',
    image: 'toshiba1tbhdd.webp',
    price: 49.99,
    slug: 'toshiba1tbhdd',
    stock: 9,
    brand_id: 'brand-25',
    active: true,
    created_at: getRandomDate(),
    id: 'toshiba1tbhdd'
  },
  {
    name: 'Kingston A2000 500GB NVMe SSD',
    description:
      '500GB NVMe SSD by Kingston, offering high-speed data access and storage for your applications.',
    image: 'kingston500gbssd.webp',
    price: 89.99,
    slug: 'kingston500gbssd',
    stock: 10,
    brand_id: 'brand-26',
    active: true,
    created_at: getRandomDate(),
    id: 'kingston500gbssd'
  },
  {
    name: 'Seagate IronWolf 6TB NAS HDD',
    description:
      '6TB NAS hard disk drive by Seagate, designed for network-attached storage and data backup.',
    image: 'seagate6tbnas.webp',
    price: 179.99,
    slug: 'seagate6tbnas',
    stock: 4,
    brand_id: 'brand-23',
    active: true,
    created_at: getRandomDate(),
    id: 'seagate6tbnas'
  },
  {
    name: 'ADATA SU800 1TB SATA SSD',
    description:
      '1TB SATA SSD by ADATA for reliable and cost-effective storage for your data and applications.',
    image: 'adata1tbssd.webp',
    price: 119.99,
    slug: 'adata1tbssd',
    stock: 6,
    brand_id: 'brand-27',
    active: true,
    created_at: getRandomDate(),
    id: 'adata1tbssd'
  },
  {
    name: 'WD Red Plus 4TB NAS HDD',
    description:
      '4TB NAS hard disk drive by Western Digital, suitable for home and small business network storage solutions.',
    image: 'wd4tbnas.webp',
    price: 129.99,
    slug: 'wd4tbnas',
    stock: 5,
    brand_id: 'brand-10',
    active: true,
    created_at: getRandomDate(),
    id: 'wd4tbnas'
  },
  {
    name: 'Samsung 2TB NVMe SSD',
    description:
      '2TB NVMe solid-state drive by Samsung, offering fast and efficient storage for your work and gaming needs.',
    image: 'samsung2tbssd.webp',
    price: 249.99,
    slug: 'samsung2tbssd',
    stock: 4,
    brand_id: 'brand-09',
    active: true,
    created_at: getRandomDate(),
    id: 'samsung2tbssd'
  }
]

export default mockup_hard_drives
