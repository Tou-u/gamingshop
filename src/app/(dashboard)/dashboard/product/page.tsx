import api from '@/lib/data/dashboard'
import Form from './form'

type Props = {
  searchParams: { id: string }
}

export default async function Product({ searchParams }: Props) {
  const product = await api.getProduct(searchParams.id)

  return (
    <Form
      product={product.data.product}
      brands={product.data.brands}
      categories={product.data.categories}
    />
  )
}
