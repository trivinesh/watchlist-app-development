"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { NetflixNav } from "@/components/netflix-nav"
import { SAMPLE_DATA, type WatchlistItem } from "@/lib/data"

export default function MoviesPage() {
  const [items] = useState<WatchlistItem[]>(SAMPLE_DATA)
  const movies = items.filter((item) => item.type === "movie")

  return (
    <div className="min-h-screen bg-black text-white">
      <NetflixNav />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Movies</h1>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <Link key={movie.id} href={`/watch/${movie.id}`}>
                <div className="cursor-pointer transform transition-transform duration-300 hover:scale-105">
                  <div className="relative">
                    <img
                      src={movie.poster || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-full h-40 object-cover rounded-md mb-3"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 left-2 right-2">
                        <h3 className="text-white text-sm font-semibold truncate">{movie.title}</h3>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-yellow-400 text-xs">★ {movie.rating}</span>
                          <Badge variant="secondary" className="text-xs bg-primary">
                            Movie
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-sm font-medium mb-1 line-clamp-2">{movie.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 text-xs">★ {movie.rating}</span>
                    <span className="text-gray-400 text-xs">{new Date(movie.releaseDate).getFullYear()}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{movie.genre}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
