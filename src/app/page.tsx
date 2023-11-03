import { getPageSession } from "@/auth/lucia";
import Loading from "@/components/skeletons/Loading";
import ProductList from "@/components/ProductList";
import { Suspense } from "react";
import Carousel from "@/components/ui/Carousel";

const Page = async () => {
  // const session = await getPageSession();
  return (
    <main className="p-2">
      {/* <p>Username: {session?.user.username}</p> */}
      <h1 className="capitalize p-1 font-bold text-lg">Our Products</h1>
      <Suspense fallback={<Loading />}>
        <ProductList />
      </Suspense>
    </main>
  );
};

export default Page;
