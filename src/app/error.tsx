'use client' // Error components must be Client Components
  
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h2>{error.message}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="text-black p-4 bg-red-500"
      >
        Try again
      </button>
    </div>
  )
}