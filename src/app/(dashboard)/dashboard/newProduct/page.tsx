import NewForm from '@/components/dashboard/NewForm'
import { getBrandsDashboard, getCategoriesDashboard } from '@/lib/data'

export default async function ProductPage() {
  const categories = await getCategoriesDashboard()
  const brands = await getBrandsDashboard()
  return (
    <main className="p-2">
      <h1 className="text-center text-lg">New Product</h1>
      {categories.data && brands.data && (
        <NewForm categories={categories.data} brands={brands.data} />
      )}
    </main>
  )
}
