'use client'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'

export default function Error() {
  const router = useRouter()

  const reload = () => {
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <main className="flex h-full flex-col items-center justify-center p-2">
      <h2 className="text-center">Products could not be obtained</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={reload}>
        Try again
      </button>
    </main>
  )
}
