import { getPageSession } from '@/auth/lucia'
import api from '@/lib/data/dashboard'
import { notFound } from 'next/navigation'
import Table from './table'

export default async function Orders({ searchParams }: { searchParams?: { client?: string } }) {
  const session = await getPageSession().catch((session) => (session = null))
  if (!session || session.user.role !== 'admin') notFound()

  const orders = await api.getOrders(searchParams?.client)

  return (
    <div>
      <Table orders={orders} />
    </div>
  )
}
