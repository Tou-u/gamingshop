import { getPageSession } from '@/auth/lucia'
import api from '@/lib/data'
import { notFound } from 'next/navigation'
import TableComponent from './table'

export default async function MyOrdersPage() {
  const session = await getPageSession().catch((session) => (session = null))

  if (!session) {
    notFound()
  }

  const orders = await api.getUserOrders(session.user.userId)

  return (
    <div>
      <TableComponent orders={orders} />
    </div>
  )
}
