import { getPageSession } from '@/auth/lucia'
import { redirect } from 'next/navigation'
import Form from './form'

const Page = async () => {
  const session = await getPageSession()
  if (session) redirect('/')
  return (
    <section className="h-[calc(100vh-65px)] flex flex-col justify-center text-center gap-3 max-w-md mx-auto">
      <h1 className="text-xl font-bold leading-tight tracking-tight">Sign up to Gaming Shop</h1>
      <Form />
    </section>
  )
}

export default Page
