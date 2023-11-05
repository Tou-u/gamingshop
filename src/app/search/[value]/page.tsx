import ProductCard from '@/components/ProductCard'
import { getProductsByName } from '@/lib/data'

export default async function PageSearch({ params }: { params: { value: string } }) {
  const products = await getProductsByName(params.value)

  return (
    <main className="p-2">
      <h1 className="text-center pb-1 font-bold text-lg">{`Products found from search: "${params.value}"`}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-5 place-items-center gap-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </main>
  )
}
