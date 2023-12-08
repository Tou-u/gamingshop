import { PUBLIC_URL } from '@/lib/r2'
import { CurrencyToUSD } from '@/lib/utils'
import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import NextLink from 'next/link'

type Product = {
  slug: string
  name: string
  image: string
  price: number
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      shadow="sm"
      key={product.slug}
      isPressable
      as={NextLink}
      href={`/${product.slug}`}
      className="w-[200px]">
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={product.name}
          className="w-full object-contain h-[150px] bg-white"
          src={`${PUBLIC_URL}/${product.image}`}
        />
      </CardBody>
      <CardFooter className="text-small flex-col p-2 text-center h-[90px] items-center justify-center">
        <b>{product.name}</b>
        <p className="text-default-500">{CurrencyToUSD(product.price)}</p>
      </CardFooter>
    </Card>
  )
}
