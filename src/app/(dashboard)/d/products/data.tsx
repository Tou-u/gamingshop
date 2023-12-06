import api from '@/lib/data/dashboard'
import Table from './table'

export default async function Data() {
  const products = await api.getProductsDashboard()

  return <>{products.data && <Table products={products.data} />}</>
}
