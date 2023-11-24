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

export type Adress = {
  id: string
  first_name: string
  last_name: string
  adress: string
  email: string
  phone: number
  info: string | null
  user_id: string
}
