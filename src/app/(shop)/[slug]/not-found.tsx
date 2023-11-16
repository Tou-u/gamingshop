import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center p-2">
      <h2>Item not found</h2>
      <p className="mb-2">Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
