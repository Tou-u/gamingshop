import CategoryList from "@/components/CategoryList";
import Loading from "@/components/Loading";
import { Suspense } from "react";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = params.category.replace("_", " ");

  return (
    <main className="p-2">
      <h1 className="capitalize p-1 font-bold text-lg">{category}</h1>
      <Suspense fallback={<Loading />}>
        <CategoryList category={category} />
      </Suspense>
    </main>
  );
}
