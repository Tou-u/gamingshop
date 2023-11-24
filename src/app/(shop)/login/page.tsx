import Form from '@/components/Form'
import Link from 'next/link'
import { getPageSession } from '@/auth/lucia'
import { redirect } from 'next/navigation'

type Props = {
  searchParams: { callbackUrl: string }
}

const Page = async ({ searchParams }: Props) => {
  const session = await getPageSession()
  if (session) {
    if (searchParams.callbackUrl) {
      redirect(`/${searchParams.callbackUrl}`)
    }
    redirect('/')
  }
  return (
    <>
      <h1>Sign in</h1>
      <Form action="/api/login">
        <label htmlFor="username">Username</label>
        <input name="username" id="username" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <input type="submit" />
      </Form>
      <Link href="/signup">Create an account</Link>
    </>
  )
}

export default Page
