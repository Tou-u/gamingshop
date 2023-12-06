import api from '@/lib/data/dashboard'
import Table from './table'

type Props = {
  searchParams?: {
    client?: string
    page?: string
    stage?: string
  }
}

export default async function Data({ searchParams }: Props) {
  const data = await api.getOrders(
    searchParams?.client,
    Number(searchParams?.page) || 1,
    searchParams?.stage
  )
  return <Table orders={data.orders} pages={data.pages} />
}
