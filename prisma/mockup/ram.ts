import { Products } from './types'
import { getRandomDate } from './utils'

const mockup_ram: Products = [
  {
    name: 'Corsair Vengeance LPX 16GB DDR4 RAM',
    description: 'High-quality 16GB DDR4 memory kit for improved system performance.',
    image: 'corsair16gbddr4.webp',
    price: 79.99,
    slug: 'corsair16gbddr4',
    stock: 10,
    brand_id: 'brand-05',
    active: true,
    created_at: getRandomDate(),
    id: 'corsair16gbddr4'
  },
  {
    name: 'G.Skill Trident Z RGB 32GB DDR4 RAM',
    description: '32GB DDR4 memory with RGB lighting for gaming and productivity setups.',
    image: 'gskill32gbddr4.webp',
    price: 149.99,
    slug: 'gskill32gbddr4',
    stock: 8,
    brand_id: 'brand-28',
    active: true,
    created_at: getRandomDate(),
    id: 'gskill32gbddr4'
  },
  {
    name: 'Crucial Ballistix 8GB DDR4 RAM',
    description: '8GB DDR4 memory module for budget-conscious users seeking improved performance.',
    image: 'crucial8gbddr4.webp',
    price: 39.99,
    slug: 'crucial8gbddr4',
    stock: 12,
    brand_id: 'brand-24',
    active: true,
    created_at: getRandomDate(),
    id: 'crucial8gbddr4'
  },
  {
    name: 'Kingston HyperX Fury 16GB DDR4 RAM',
    description: '16GB DDR4 memory module with heat spreader for enhanced gaming performance.',
    image: 'kingston16gbddr4.webp',
    price: 69.99,
    slug: 'kingston16gbddr4',
    stock: 7,
    brand_id: 'brand-26',
    active: true,
    created_at: getRandomDate(),
    id: 'kingston16gbddr4'
  },
  {
    name: 'Team T-Force Delta RGB 32GB DDR4 RAM',
    description: '32GB DDR4 memory with vibrant RGB lighting for gamers and content creators.',
    image: 'team32gbddr4-delta.webp',
    price: 179.99,
    slug: 'team32gbddr4-delta',
    stock: 6,
    brand_id: 'brand-29',
    active: true,
    created_at: getRandomDate(),
    id: 'team32gbddr4-delta'
  },
  {
    name: 'Patriot Viper Steel 64GB DDR4 RAM',
    description:
      'High-capacity 64GB DDR4 memory for enthusiasts and professionals demanding multitasking power.',
    image: 'patriot64gbddr4.webp',
    price: 249.99,
    slug: 'patriot64gbddr4',
    stock: 5,
    brand_id: 'brand-30',
    active: true,
    created_at: getRandomDate(),
    id: 'patriot64gbddr4'
  },
  {
    name: 'Corsair Dominator Platinum RGB 64GB DDR4 RAM',
    description: '64GB DDR4 memory with RGB lighting and superior performance for extreme tasks.',
    image: 'corsair64gbddr4.webp',
    price: 279.99,
    slug: 'corsair64gbddr4',
    stock: 4,
    brand_id: 'brand-05',
    active: true,
    created_at: getRandomDate(),
    id: 'corsair64gbddr4'
  },
  {
    name: 'HyperX Predator RGB 32GB DDR4 RAM',
    description:
      '32GB DDR4 memory module with RGB lighting for gaming and overclocking enthusiasts.',
    image: 'hyperx32gbddr4.webp',
    price: 149.99,
    slug: 'hyperx32gbddr4',
    stock: 8,
    brand_id: 'brand-26',
    active: true,
    created_at: getRandomDate(),
    id: 'hyperx32gbddr4'
  },
  {
    name: 'G.Skill Ripjaws V 16GB DDR4 RAM',
    description: '16GB DDR4 memory kit for enhanced gaming and productivity performance.',
    image: 'gskill16gbddr4.webp',
    price: 69.99,
    slug: 'gskill16gbddr4',
    stock: 9,
    brand_id: 'brand-28',
    active: true,
    created_at: getRandomDate(),
    id: 'gskill16gbddr4'
  },
  {
    name: 'Team T-Force Vulcan Z 32GB DDR4 RAM',
    description: '32GB DDR4 memory module for multitasking and content creation tasks.',
    image: 'team32gbddr4-vulcanz.webp',
    price: 119.99,
    slug: 'team32gbddr4-vulcanz',
    stock: 6,
    brand_id: 'brand-29',
    active: true,
    created_at: getRandomDate(),
    id: 'team32gbddr4-vulcanz'
  }
]

export default mockup_ram
