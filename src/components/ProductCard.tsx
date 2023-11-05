'use client'
import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import NextLink from 'next/link'

type Product = {
  id: string
  slug: string
  name: string
  description: string
  image: string
  price: number
  stock: number
  category_id: string
  brand?: Brand
}

type Brand = {
  id: string
  name: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      shadow="sm"
      key={product.slug}
      isPressable
      as={NextLink}
      href={`/product/${product.slug}`}
      className="w-[200px]">
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={product.name}
          className="w-full object-cover h-[140px]"
          src="/placeholder.jpeg"
        />
      </CardBody>
      <CardFooter className="text-small flex-col p-2 text-center h-[100px] items-center justify-center">
        <b>{product.name}</b>
        <p className="text-default-500">
          {Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(product.price)}
        </p>
      </CardFooter>
    </Card>
  )
}
