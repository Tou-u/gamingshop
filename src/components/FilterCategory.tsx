"use client";
import ProductCard from "./ProductCard";
import { useFilterStore } from "@/store/zustand";
import SelectComponent from "./ui/Select";

type Products = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  category_id: string;
}[];

export default function FilterCategory({ products }: { products: Products }) {
  const { option } = useFilterStore();

  let sortProducts = products.slice();

  if (option === "higher") {
    sortProducts.sort((a, b) => b.price - a.price);
  } else if (option === "lower") {
    sortProducts.sort((a, b) => a.price - b.price);
  }

  return (
    <>
      <div className="pl-3">
        <SelectComponent />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 place-items-center gap-4">
        {sortProducts.map((product) => (
          <ProductCard product={product} key={product.slug} />
        ))}
      </div>
    </>
  );
}
