export type Brands = {
  id: string
  name: string
}[]

export type Products = {
  id?: string
  slug: string
  name: string
  description: string
  image: string
  price: number
  stock: number
  active?: boolean
  brand_id: string
  created_at?: Date
}[]

export type Processors = {
  id?: string
  slug: string
  name: string
  description: string
  image: string
  price: number
  stock: number
  active?: boolean
  brand_id: 'brand-08' | 'brand-06' // Intel or AMD
  created_at?: Date
}[]
