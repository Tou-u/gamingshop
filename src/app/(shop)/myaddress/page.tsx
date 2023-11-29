import { getPageSession } from '@/auth/lucia'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Loading from '@/components/ui/Loading'
import Data from './data'

type Props = {
  searchParams: { callbackUrl: string }
}

export default async function MyAddressPage({ searchParams }: Props) {
  const callbackUrl = searchParams.callbackUrl
  const session = await getPageSession().catch((session) => (session = null))

  if (!session) {
    notFound()
  }

  return (
    <>
      <div className="text-center">
        <h2>{callbackUrl ? 'To continue with the purchase, enter your address' : 'My Address'}</h2>
        <Suspense fallback={<Loading title="Loading Form" />}>
          <Data user={session.user} callbackUrl={callbackUrl} />
        </Suspense>
      </div>
    </>
  )
}
