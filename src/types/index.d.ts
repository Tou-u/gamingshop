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
  slug: string
  name: string
  image: string
  price: number
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
