import { getProductsPerCategory } from '@/lib/data'
import Error from '@/components/Error'
import CategoryList from './list'

export default async function GetData({ category }: { category: string }) {
  const products = await getProductsPerCategory(category)

  if (products.error) {
    return <Error />
  }

  return (
    <>
      {products.data?.length === 0 ? (
        <p>No products found</p>
      ) : (
        <CategoryList products={products.data!} />
      )}
    </>
  )
}
