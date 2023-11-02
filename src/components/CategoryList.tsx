import { getProductsPerCategory } from "@/lib/data";
import ProductCard from "./ProductCard";

export default async function CategoryList({ category }: { category: string }) {
  const products = await getProductsPerCategory(category);
  return (
    <>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ProductCard products={products} />
      )}
    </>
  );
}
