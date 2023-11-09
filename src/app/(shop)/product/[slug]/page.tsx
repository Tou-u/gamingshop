import { getProductBySlug } from '@/lib/data'
import Error from '@/components/Error'
import { notFound } from 'next/navigation'
import { Image } from '@nextui-org/image'
import { Divider } from '@nextui-org/divider'
import { Button } from '@nextui-org/button'

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)

  if (product.error) {
    return <Error />
  }

  if (!product.data) {
    notFound()
  }

  return (
    <main className="p-2">
      <h1 className="text-lg font-bold text-center pb-2">{product.data.name}</h1>
      <div className="grid grid-cols-2 place-items-center">
        <Image src="/placeholder.jpeg" alt={product.data.name} />
        <div>
          <p className="text-lg">
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(product.data.price)}
          </p>
          <Divider />
          <p>Stock: {product.data.stock}</p>
          <Button>Add to cart</Button>
        </div>
      </div>
      <p className="text-center">{product.data.description}</p>
    </main>
  )
}
