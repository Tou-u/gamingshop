import { getProductBySlug } from "@/lib/data";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  return (
    <main className="p-2">
      {!product ? (
        <p>Product not found</p>
      ) : (
        <strong>{JSON.stringify(product)}</strong>
      )}
    </main>
  );
}
