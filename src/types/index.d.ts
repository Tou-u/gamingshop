export type Products = {
  slug: string
  name: string
  image: string
  price: number
  brand?: Brand
}[]

export type Product = {
  slug: string
  name: string
  image: string
  price: number
  brand?: Brand
}

export type Brand = {
  name: string
}

export type Categories = {
  name: string
}[]
