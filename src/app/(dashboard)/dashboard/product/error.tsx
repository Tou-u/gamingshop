'use client'
export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center p-2">
      <h2 className="text-center">Product could not be obtained</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={() => window.location.reload()}>
        Try again
      </button>
    </div>
  )
}
