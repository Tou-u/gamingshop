import api from '@/lib/data/shop'
import CategoryList from './list'

export default async function Data({ category }: { category: string }) {
  const products = await api.getProductsPerCategory(category)

  return (
    <>
      {products.data?.length === 0 ? (
        <p>No products found</p>
      ) : (
        <CategoryList products={products.data} />
      )}
    </>
  )
}
