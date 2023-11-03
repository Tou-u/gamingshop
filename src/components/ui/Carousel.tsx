"use client";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../ProductCard";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
  },
};

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

export default function Carousel({ products }: { products: Products }) {
  return (
    <div className="relative pb-6">
      <MultiCarousel
        showDots
        responsive={responsive}
        ssr
        infinite
        customTransition="all .5"
        transitionDuration={500}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        partialVisible
        renderDotsOutside
        dotListClass="customdot"
      >
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </MultiCarousel>
    </div>
  );
}
