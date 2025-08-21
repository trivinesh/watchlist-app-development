import { SAMPLE_DATA, getStatusDisplayName, getStatusDescription } from "@/lib/data"
import Link from "next/link"

export default function WatchingPage() {
  const watchingItems = SAMPLE_DATA.filter((item) => item.status === "watching")

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-20 px-4 md:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{getStatusDisplayName("watching")}</h1>
          <p className="text-gray-400 text-lg">{getStatusDescription("watching")}</p>
        </div>

        {watchingItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">You're not watching anything right now</h2>
            <p className="text-gray-400 mb-8">Start watching something from your watchlist!</p>
            <Link
              href="/watchlist"
              className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded font-semibold transition-colors"
            >
              View Watchlist
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {watchingItems.map((item) => (
              <div key={item.id} className="group relative">
                <Link href={`/watch/${item.id}`}>
                  <div className="relative overflow-hidden rounded-md">
                    <img
                      src={item.poster || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute bottom-2 left-2 bg-red-600 text-xs px-2 py-1 rounded">WATCHING</div>
                  </div>
                </Link>
                <div className="mt-2">
                  <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                  <p className="text-gray-400 text-xs">
                    {item.genre} • {item.rating}/10
                  </p>
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
