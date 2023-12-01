import { User } from 'lucia'
import api from '@/lib/data'
import TableComponent from './table'

export default async function Data({ user }: { user: User }) {
  const orders = await api.getUserOrders(user.userId)

  return <TableComponent orders={orders} />
}
