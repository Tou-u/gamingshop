import Table from '@/components/Table'
import { getProducts } from '@/lib/data'

export default async function Dashboard() {
  const products = await getProducts()
  return (
    <div>
      <h1>Dashboard</h1>
      <Table products={products.data!} />
    </div>
  )
}
