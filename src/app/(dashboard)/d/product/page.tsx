import api from '@/lib/data/dashboard'
import Form from './form'
import { getPageSession } from '@/auth/lucia'
import { notFound } from 'next/navigation'

type Props = {
  searchParams: { id: string }
}

export default async function Product({ searchParams }: Props) {
  const session = await getPageSession().catch((session) => (session = null))
  if (!session || session.user.role !== 'admin') notFound()

  const product = await api.getProduct(searchParams.id)

  return (
    <Form
      product={product.data.product}
      brands={product.data.brands}
      categories={product.data.categories}
    />
  )
}
