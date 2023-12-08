import api from '@/lib/data/shop'
import CategoryList from './list'

export default async function Data({
  category,
  searchParams
}: {
  category: string
  searchParams?: { order?: 'asc' | 'desc'; brand?: string }
}) {
  const data = await api.getProductsPerCategory(category, searchParams?.order, searchParams?.brand)

  return <CategoryList products={data.products} brands={data.brands} />
}
