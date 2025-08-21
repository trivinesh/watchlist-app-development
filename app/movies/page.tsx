"use client"

import { useState } from "react"

import type React from "react"
import { useEffect } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NetflixNav } from "@/components/netflix-nav"
import { SAMPLE_DATA, type WatchlistItem } from "@/lib/data"
import { MovieCard } from "@/components/movie-card"

export default function MoviesPage() {
  const [items, setItems] = useState<WatchlistItem[]>(SAMPLE_DATA)
  const [wishlistItems, setWishlistItems] = useState<string[]>([])
  const movies = items.filter((item) => item.type === "movie")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      setWishlistItems(wishlist)
    }
  }, [])

  const toggleWatchlist = (movieId: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault() // Prevent navigation when clicking heart
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === movieId
          ? {
              ...item,
              status: item.status === "watchlist" ? "want-to-watch" : "watchlist",
            }
          : item,
      ),
    )
    if (typeof window !== "undefined") {
      const currentWatchlist = JSON.parse(localStorage.getItem("watchlist") || "[]")
      const movie = items.find((item) => item.id === movieId)
      if (movie?.status === "watchlist") {
        const newWatchlist = currentWatchlist.filter((id: string) => id !== movieId)
        localStorage.setItem("watchlist", JSON.stringify(newWatchlist))
      } else {
        const newWatchlist = [...currentWatchlist, movieId]
        localStorage.setItem("watchlist", JSON.stringify(newWatchlist))
      }
    }
  }

  const toggleWishlist = (movieId: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault() // Prevent navigation when clicking bookmark
    if (typeof window !== "undefined") {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      const newWishlist = wishlist.includes(movieId)
        ? wishlist.filter((id: string) => id !== movieId)
        : [...wishlist, movieId]
      localStorage.setItem("wishlist", JSON.stringify(newWishlist))
      setWishlistItems(newWishlist)
    }
  }

  const handlePlay = (movieId: string) => {
    // Handle play functionality
    console.log("Playing movie:", movieId)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NetflixNav />

      <div className="pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold">Movies</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                Discover your next favorite movie ({movies.length} movies)
              </p>
            </div>
            <Button variant="outline" size="sm" className="self-start sm:self-auto bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                item={movie}
                onToggleWatchlist={toggleWatchlist}
                onToggleWishlist={toggleWishlist}
                onPlay={handlePlay}
                className="w-full"
                wishlistItems={wishlistItems}
              />
            ))}
          </div>

          {movies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No movies found</p>
              <p className="text-muted-foreground text-sm mt-2">Try adjusting your filters or check back later</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
