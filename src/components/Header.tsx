import { getPageSession } from '@/auth/lucia'
import { NavBar } from './NavBar'
import { UserCart } from '@/types'
import api from '@/lib/data/shop'

let usercart: UserCart[] | undefined = undefined

export default async function Header() {
  const session = await getPageSession().catch((session) => (session = null))
  if (session) {
    usercart = await api.getUserCart(session.user.userId)
  }

  return <NavBar session={session} usercart={usercart} />
}
