import { getProducts } from "@/lib/data";
import ProductCard from "./ProductCard";

export default async function ProductList() {
  const products = await getProducts();
  return <ProductCard products={products} />;
}
