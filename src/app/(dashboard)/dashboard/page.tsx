import Table from '@/components/Table'
import { getProductsDashboard } from '@/lib/data'

export default async function Dashboard() {
  const products = await getProductsDashboard()
  return (
    <div>
      <h1>Dashboard</h1>
      {products.data && <Table products={products.data} />}
    </div>
  )
}
