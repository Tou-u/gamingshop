import { getPageSession } from '@/auth/lucia'
import { notFound, redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await getPageSession().catch((session) => (session = null))

  if (!session || session.user.role !== 'admin') {
    notFound()
  }

  if (session.user.role === 'admin') {
    redirect('/d/products')
  }

  return null
}
