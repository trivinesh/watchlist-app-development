import { SAMPLE_DATA, getStatusDisplayName, getStatusDescription } from "@/lib/data"
import Link from "next/link"
import { NetflixNav } from "@/components/netflix-nav"

export default function WatchedPage() {
  const watchedItems = SAMPLE_DATA.filter((item) => item.status === "watched")

  return (
    <div className="min-h-screen bg-black text-white">
      <NetflixNav />
      <div className="pt-20 px-4 md:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{getStatusDisplayName("watched")}</h1>
          <p className="text-gray-400 text-lg">{getStatusDescription("watched")}</p>
        </div>

        {watchedItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">You haven't watched anything yet</h2>
            <p className="text-gray-400 mb-8">Start watching and track your viewing history!</p>
            <Link
              href="/search"
              className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded font-semibold transition-colors"
            >
              Browse Content
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {watchedItems.map((item) => (
              <div key={item.id} className="group relative">
                <Link href={`/watch/${item.id}`}>
                  <div className="relative overflow-hidden rounded-md">
                    <img
                      src={item.poster || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute top-2 right-2 bg-green-600 text-xs px-2 py-1 rounded">✓ WATCHED</div>
                  </div>
                </Link>
                <div className="mt-2">
                  <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                  <p className="text-gray-400 text-xs">
                    {item.genre} • {item.rating}/10
                  </p>
                  {item.personalRating && (
                    <p className="text-yellow-400 text-xs">Your rating: {item.personalRating}/10</p>
                  )}
                  {item.notes && <p className="text-gray-500 text-xs mt-1 truncate">{item.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
