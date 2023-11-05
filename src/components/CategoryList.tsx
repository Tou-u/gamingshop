import { getProductsPerCategory } from '@/lib/data'
import FilterCategory from './FilterCategory'

export default async function CategoryList({ category }: { category: string }) {
  const products = await getProductsPerCategory(category)

  return (
    <>{products.length === 0 ? <p>No products found</p> : <FilterCategory products={products} />}</>
  )
}
