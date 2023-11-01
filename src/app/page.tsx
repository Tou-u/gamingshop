import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";
import Form from "@/components/form";
import ProductCard from "@/components/ProductCard";

const Page = async () => {
  const session = await getPageSession();
  // if (!session) redirect("/login");
  return (
    <main className="p-2">
      <p>Username: {session?.user.username}</p>
      <ProductCard />
    </main>
  );
};

export default Page;
