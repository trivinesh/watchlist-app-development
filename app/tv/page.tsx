"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { NetflixNav } from "@/components/netflix-nav"
import { SAMPLE_DATA, type WatchlistItem } from "@/lib/data"

export default function TVShowsPage() {
  const [items] = useState<WatchlistItem[]>(SAMPLE_DATA)
  const tvShows = items.filter((item) => item.type === "tv-show")

  return (
    <div className="min-h-screen bg-black text-white">
      <NetflixNav />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">TV Shows</h1>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {tvShows.map((show) => (
              <Link key={show.id} href={`/watch/${show.id}`}>
                <div className="cursor-pointer transform transition-transform duration-300 hover:scale-105">
                  <div className="relative">
                    <img
                      src={show.poster || "/placeholder.svg"}
                      alt={show.title}
                      className="w-full h-40 object-cover rounded-md mb-3"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 left-2 right-2">
                        <h3 className="text-white text-sm font-semibold truncate">{show.title}</h3>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-yellow-400 text-xs">★ {show.rating}</span>
                          <Badge variant="secondary" className="text-xs bg-primary">
                            TV
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-sm font-medium mb-1 line-clamp-2">{show.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 text-xs">★ {show.rating}</span>
                    <span className="text-gray-400 text-xs">{new Date(show.releaseDate).getFullYear()}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{show.genre}</p>
                  {show.seasons && (
                    <p className="text-xs text-gray-500">
                      {show.seasons} Season{show.seasons !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
