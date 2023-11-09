export type Product = {
  slug: string
  name: string
  image: string
  price: number
  brand?: Brand
}

export type Brand = {
  id?: string
  name: string
}

export type Category = {
  id?: string
  name: string
}

export type UserCart = {
  id: string
  slug: string
  name: string
  description: string
  image: string
  price: number
  stock: number
  active: boolean
  category_id: string
  brand_id: string
  cart_id: string | null
}[]

export type FullProduct = {
  id: string
  slug: string
  name: string
  description: string
  image: string
  price: number
  stock: number
  active: boolean
  category: Category
  brand: Brand
}
