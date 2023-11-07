import EditForm from '@/components/dashboard/EditForm'
import { getBrandsDashboard, getCategoriesDashboard, getProductByID } from '@/lib/data'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const initialData = await getProductByID(params.id)
  const product = initialData.data
  const categories = await getCategoriesDashboard()
  const brands = await getBrandsDashboard()

  return (
    <main className="p-2">
      <h1 className="text-center text-lg">Details of {product?.name}</h1>
      <EditForm product={product!} categories={categories.data!} brands={brands.data!} />
    </main>
  )
}
