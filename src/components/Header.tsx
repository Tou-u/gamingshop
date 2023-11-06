import { getPageSession } from '@/auth/lucia'
import { getCategories } from '@/lib/data'
import { NavBar } from './NavBar'
import NavBarSkeleton from './skeletons/NavBarSkeleton'

export default async function Header() {
  const session = await getPageSession()
  const categories = await getCategories()

  if (categories.error) {
    return <NavBarSkeleton />
  }

  return <>{categories.data && <NavBar session={session} categories={categories.data} />}</>
}
