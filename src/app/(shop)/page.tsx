import { getPageSession } from '@/auth/lucia'
import Loading from '@/components/skeletons/Loading'
import GetData from './get-data'
import { Suspense } from 'react'

const Page = async () => {
  // const session = await getPageSession();
  return (
    <>
      {/* <p>Username: {session?.user.username}</p> */}
      <h1 className="capitalize p-1 font-bold text-lg">Our Products</h1>
      <Suspense fallback={<Loading />}>
        <GetData />
      </Suspense>
    </>
  )
}

export default Page
