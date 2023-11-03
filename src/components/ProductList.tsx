import { getSixProducts } from "@/lib/data";
import Carousel from "./ui/Carousel";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";

export default async function ProductList() {
  const products = await getSixProducts();
  const graphic_cards = products
    .filter((x) => x.name === "graphics cards")
    .flatMap((x) => x.products);

  const processors = products
    .filter((x) => x.name === "processors")
    .flatMap((x) => x.products);

  return (
    <section>
      <Link
        as={NextLink}
        showAnchorIcon
        href="/category/graphics_cards"
        className="font-bold text-lg p-1"
      >
        Graphics Cards
      </Link>
      <Carousel products={graphic_cards} />
      <article>
        <Link
          as={NextLink}
          showAnchorIcon
          href="/category/processors"
          className="font-bold text-lg p-1"
        >
          Processors
        </Link>
        <Carousel products={processors} />
      </article>
    </section>
  );
}
