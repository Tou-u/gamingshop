import { getPageSession } from '@/auth/lucia'
import { getCategories, getUserCart } from '@/lib/data'
import { NavBar } from './NavBar'
import NavBarSkeleton from './skeletons/NavBarSkeleton'
import { UserCart } from '@/types'

let usercart: UserCart | undefined = undefined

export default async function Header() {
  const session = await getPageSession().catch((session) => (session = null))
  const categories = await getCategories()

  if (session) {
    usercart = (await getUserCart(session.user.userId)).data?.products
  }

  if (categories.error) {
    return <NavBarSkeleton />
  }

  return (
    <>
      {categories.data && (
        <NavBar session={session} categories={categories.data} usercart={usercart} />
      )}
    </>
  )
}
