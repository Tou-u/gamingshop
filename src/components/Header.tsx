import { getPageSession } from '@/auth/lucia'
import { getUserCart } from '@/lib/data'
import { NavBar } from './NavBar'
import { UserCart } from '@/types'

let usercart: UserCart | undefined = undefined

export default async function Header() {
  const session = await getPageSession().catch((session) => (session = null))

  if (session) {
    usercart = (await getUserCart(session.user.userId)).data?.products
  }

  return <NavBar session={session} usercart={usercart} />
}
