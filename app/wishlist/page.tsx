"use client"

import { useState, useEffect } from "react"
import { SAMPLE_DATA, type WatchlistItem } from "@/lib/data"
import { NetflixNav } from "@/components/netflix-nav"
import { MovieCard } from "@/components/movie-card"
import { Button } from "@/components/ui/button"
import { Bookmark, Filter } from "lucide-react"
import Link from "next/link"

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([])
  const [items, setItems] = useState<WatchlistItem[]>(SAMPLE_DATA)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      setWishlistIds(wishlist)
    }
  }, [])

  const wishlistItems = items.filter((item) => wishlistIds.includes(item.id))

  const toggleWatchlist = (itemId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              status: item.status === "watchlist" ? "want-to-watch" : "watchlist",
            }
          : item,
      ),
    )
  }

  const toggleWishlist = (itemId: string) => {
    if (typeof window !== "undefined") {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      const newWishlist = wishlist.filter((id: string) => id !== itemId)
      localStorage.setItem("wishlist", JSON.stringify(newWishlist))
      setWishlistIds(newWishlist)
    }
  }

  const handlePlay = (itemId: string) => {
    console.log("Playing item:", itemId)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NetflixNav />

      <div className="pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <Bookmark className="h-8 w-8 text-yellow-500" />
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold">My Wishlist</h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-1">
                  Items you're interested in watching ({wishlistItems.length} items)
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="self-start sm:self-auto bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-20">
              <Bookmark className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Start adding movies and shows you're interested in by clicking the bookmark icon on any content!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8">Browse Home</Button>
                </Link>
                <Link href="/movies">
                  <Button
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-gray-800 px-8 bg-transparent"
                  >
                    Explore Movies
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
              {wishlistItems.map((item) => (
                <MovieCard
                  key={item.id}
                  item={item}
                  onToggleWatchlist={toggleWatchlist}
                  onToggleWishlist={toggleWishlist}
                  onPlay={handlePlay}
                  className="w-full"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
