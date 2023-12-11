import { getPageSession } from '@/auth/lucia'
import { redirect } from 'next/navigation'
import Form from './form'

type Props = {
  searchParams: { callbackUrl: string }
}

export default async function Login({ searchParams }: Props) {
  const session = await getPageSession()

  if (session) {
    if (searchParams.callbackUrl) {
      redirect(`/${searchParams.callbackUrl}`)
    }
    redirect('/')
  }
  return (
    <section className="h-[calc(100vh-65px)] flex flex-col justify-center text-center gap-3 max-w-md mx-auto">
      <h1 className="text-xl font-bold leading-tight tracking-tight">Sign in to your account</h1>
      <Form />
      <div className="flex items-center p-2 mb-2 border-t-4 border-primary-500 border rounded-xl w-fit mx-auto">
        <svg className="flex-shrink-0 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <div className="ms-3 text-sm text-start grid grid-cols-2">
          <p className="col-span-1">Admin user:</p>
          <p className="font-bold">admin/admin</p>
          <p className="col-span-1">Guest user:</p>
          <p className="font-bold">sign up!</p>
        </div>
      </div>
    </section>
  )
}
