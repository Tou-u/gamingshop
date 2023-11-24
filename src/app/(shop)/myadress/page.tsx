import api from '@/lib/data'
import Form from './form'
import { getPageSession } from '@/auth/lucia'
import { notFound } from 'next/navigation'

type Props = {
  searchParams: { callbackUrl: string }
}

export default async function MyAdressPage({ searchParams }: Props) {
  const callbackUrl = searchParams.callbackUrl
  const session = await getPageSession().catch((session) => (session = null))

  if (!session) {
    notFound()
  }
  const adress = await api.getUserAdress(session.user.userId)

  console.log(adress)

  return (
    <>
      <div className="text-center">
        <h2>To continue with the purchase, enter your address</h2>
        <Form adress={adress} user={session.user} callbackUrl={callbackUrl} />
      </div>
    </>
  )
}
