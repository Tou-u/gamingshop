import { Button } from '@nextui-org/react'
import NextLink from 'next/link'

export default function NotFound() {
  return (
    <section className="h-[calc(100vh-65px)] w-full flex flex-col justify-center items-center">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
      <div className="bg-[#0070F0] px-2 text-sm rounded rotate-12 absolute">Page Not Found</div>
      <Button as={NextLink} href="/" className="mt-5" color="primary" variant="shadow">
        Return Home
      </Button>
    </section>
  )
}
