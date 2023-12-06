import api from '@/lib/data/dashboard'
import { notFound } from 'next/navigation'

type Props = {
  params: { id: string }
}

export default async function OrderPage({ params }: Props) {
  const order = await api.getOrder(params.id)
  if (!order) notFound()

  return <div>{JSON.stringify(order, null, 2)}</div>
}
