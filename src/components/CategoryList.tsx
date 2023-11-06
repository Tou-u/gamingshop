import { getProductsPerCategory } from '@/lib/data'
import FilterCategory from './FilterCategory'
import Error from './Error'

export default async function CategoryList({ category }: { category: string }) {
  const products = await getProductsPerCategory(category)

  if (products.error) {
    return <Error />
  }

  return (
    <>
      {products.data?.length === 0 ? (
        <p>No products found</p>
      ) : (
        <FilterCategory products={products.data!} />
      )}
    </>
  )
}
