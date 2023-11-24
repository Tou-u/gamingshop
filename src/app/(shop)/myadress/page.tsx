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

  return (
    <>
      <div className="text-center">
        <h2>{callbackUrl ? 'To continue with the purchase, enter your address' : 'My Adress'}</h2>
        <Form adress={adress} user={session.user} callbackUrl={callbackUrl} />
      </div>
    </>
  )
}
