import { getPageSession } from '@/auth/lucia'
import { getCategories } from '@/lib/data'
import { NavBar } from './NavBar'
import NavBarSkeleton from './skeletons/NavBarSkeleton'

export default async function Header() {
  const session = await getPageSession()
  const categories = await getCategories()

  return (
    <>
      {categories.error && <NavBarSkeleton />}
      {categories.data && <NavBar session={session} categories={categories.data} />}
    </>
  )
}
