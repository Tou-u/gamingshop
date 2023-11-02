import { getPageSession } from "@/auth/lucia";
import { getCategories } from "@/lib/data";
import { NavBar } from "./NavBar";

export default async function Header() {
  const session = await getPageSession();
  const categories = await getCategories();
  return <NavBar session={session} categories={categories} />;
}
