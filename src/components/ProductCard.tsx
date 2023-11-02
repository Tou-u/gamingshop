"use client";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import NextLink from "next/link";

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

export default function ProductCard({ products }: { products: Products }) {
  return (
    <div className="gap-2 grid grid-cols-3">
      {products.map((product) => (
        <Card
          shadow="sm"
          key={product.slug}
          isPressable
          as={NextLink}
          href={`/product/${product.slug}`}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={product.name}
              className="w-full object-cover h-[140px]"
              src={product.image}
            />
          </CardBody>
          <CardFooter className="text-small flex-col p-2 text-center">
            <b>{product.name}</b>
            <p className="text-default-500">
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.price)}
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
