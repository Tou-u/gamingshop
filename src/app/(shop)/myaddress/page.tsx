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
    <div className="text-center">
      <h1 className="p-1 font-bold text-lg">
        {callbackUrl ? 'To continue with the purchase, enter your address' : 'My Address'}
      </h1>
      <Suspense fallback={<Loading title="Loading Form" gap />}>
        <Data user={session.user} callbackUrl={callbackUrl} />
      </Suspense>
    </div>
  )
}
