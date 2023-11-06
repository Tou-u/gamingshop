import Error from '@/components/Error'
import { getProductBySlug } from '@/lib/data'
import { notFound } from 'next/navigation'

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
      <strong>{JSON.stringify(product)}</strong>
    </main>
  )
}
