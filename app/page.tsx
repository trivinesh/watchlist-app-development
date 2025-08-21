"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Play, Info, Heart, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NetflixNav } from "@/components/netflix-nav"
import { SAMPLE_DATA, type WatchlistItem } from "@/lib/data"

function HeroBanner({ item }: { item: WatchlistItem }) {
  return (
    <div className="relative h-[60vh] sm:h-[70vh] lg:h-screen flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${item.poster})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="max-w-sm sm:max-w-md lg:max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-3 sm:mb-4 leading-tight">
            {item.title}
          </h1>
          <p className="text-sm sm:text-base lg:text-xl mb-4 sm:mb-6 text-gray-200 leading-relaxed line-clamp-3 lg:line-clamp-none">
            {item.description}
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <Badge variant="secondary" className="bg-yellow-500 text-black font-semibold text-xs sm:text-sm">
              ★ {item.rating}
            </Badge>
            <span className="text-gray-300 text-xs sm:text-sm">{new Date(item.releaseDate).getFullYear()}</span>
            <Badge variant="outline" className="border-gray-400 text-gray-300 text-xs sm:text-sm">
              {item.type === "movie" ? "Movie" : "TV Show"}
            </Badge>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href={`/watch/${item.id}`} className="w-full sm:w-auto">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-semibold w-full">
                <Play className="h-4 w-4 sm:h-5 sm:w-5 mr-2 fill-current" />
                Play
              </Button>
            </Link>
            <Link href={`/watch/${item.id}`} className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="secondary"
                className="bg-gray-600/70 text-white hover:bg-gray-600 font-semibold w-full"
              >
                <Info className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContentRow({
  title,
  items,
  toggleWatchlist,
  toggleWishlist,
}: {
  title: string
  items: WatchlistItem[]
  toggleWatchlist: (itemId: string, e: React.MouseEvent) => void
  toggleWishlist: (itemId: string, e: React.MouseEvent) => void
}) {
  return (
    <div className="mb-6 sm:mb-8">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-heading font-semibold mb-3 sm:mb-4 px-4 sm:px-6 lg:px-12">
        {title}
      </h2>
      <div className="relative group">
        <div className="flex gap-2 sm:gap-3 lg:gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-12 pb-4">
          {items.map((item) => (
            <Link key={item.id} href={`/watch/${item.id}`} className="flex-none w-32 sm:w-40 md:w-48 lg:w-56 relative group/item">
              <div className="cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <div className="relative">
                  <img
                    src={
                      item.poster ||
                      `/placeholder.svg?height=240&width=160&query=${encodeURIComponent(item.title + " poster") || "/placeholder.svg"}`
                    }
                    alt={item.title}
                    className="w-full h-20 sm:h-24 md:h-28 lg:h-36 object-cover rounded-md"
                  />

                  {title === "Continue Watching" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                        <Play className="h-4 w-4 mr-1 fill-current" />
                        Play
                      </Button>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 right-1 sm:right-2">
                      <h3 className="text-white text-xs sm:text-sm font-semibold truncate">{item.title}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-yellow-400 text-xs">★ {item.rating}</span>
                        <div className="flex items-center gap-1">
                          <Badge variant="secondary" className="text-xs bg-accent">
                            {item.type === "movie" ? "Movie" : "TV"}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                            {item.genre}
                          </Badge>
                        </div>
                      </div>
                      {item.cast && (
                        <p className="text-gray-300 text-xs mt-1 truncate">{item.cast.slice(0, 2).join(", ")}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-2 px-1">
                  <h3 className="text-white text-xs sm:text-sm font-semibold truncate leading-tight">{item.title}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-yellow-400 text-xs">★ {item.rating}</span>
                    <span className="text-gray-400 text-xs">{new Date(item.releaseDate).getFullYear()}</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-1 sm:top-2 right-1 sm:right-2 flex gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 z-10">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWatchlist(item.id, e);
                  }}
                  className="p-1 sm:p-2 rounded-full bg-black/70 hover:bg-black/90 transition-colors duration-200"
                  title={item.status === "watchlist" ? "Remove from Watchlist" : "Add to Watchlist"}
                >
                  <Heart
                    className={`h-3 w-3 sm:h-4 sm:w-4 transition-colors duration-200 ${
                      item.status === "watchlist" ? "fill-red-500 text-red-500" : "text-white hover:text-red-500"
                    }`}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(item.id, e);
                  }}
                  className="p-1 sm:p-2 rounded-full bg-black/70 hover:bg-black/90 transition-colors duration-200"
                  title="Add to Wishlist"
                >
                  <Bookmark className="h-3 w-3 sm:h-4 sm:w-4 text-white hover:text-yellow-500 transition-colors duration-200" />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function NetflixClone() {
  const [items, setItems] = useState<WatchlistItem[]>(SAMPLE_DATA)

  const toggleWatchlist = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent event bubbling instead of preventDefault
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

  const toggleWishlist = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent event bubbling instead of preventDefault
    if (typeof window !== "undefined") {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      const newWishlist = wishlist.includes(itemId)
        ? wishlist.filter((id: string) => id !== itemId)
        : [...wishlist, itemId]
      localStorage.setItem("wishlist", JSON.stringify(newWishlist))
    }
  }

  const featuredItem = items.find((item) => item.featured) || items[0]

  const trendingNow = items.filter((item) => item.rating >= 8.5)
  const continueWatching = items.filter((item) => item.status === "watching")
  const myList = items.filter((item) => item.status === "want-to-watch")
  const recentlyAdded = [...items].sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime())

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NetflixNav />

      <HeroBanner item={featuredItem} />

      <div className="relative z-10 -mt-16 sm:-mt-24 lg:-mt-32 space-y-4 sm:space-y-6 lg:space-y-8">
        {continueWatching.length > 0 && (
          <div className="mt-6">
            <ContentRow
              title="Continue Watching"
              items={continueWatching}
              toggleWatchlist={toggleWatchlist}
              toggleWishlist={toggleWishlist}
            />
          </div>
        )}

        <ContentRow
          title="Trending Now"
          items={trendingNow}
          toggleWatchlist={toggleWatchlist}
          toggleWishlist={toggleWishlist}
        />

        {myList.length > 0 && (
          <ContentRow
            title="My List"
            items={myList}
            toggleWatchlist={toggleWatchlist}
            toggleWishlist={toggleWishlist}
          />
        )}

        <ContentRow
          title="Recently Added"
          items={recentlyAdded}
          toggleWatchlist={toggleWatchlist}
          toggleWishlist={toggleWishlist}
        />

        <ContentRow
          title="Movies"
          items={items.filter((item) => item.type === "movie")}
          toggleWatchlist={toggleWatchlist}
          toggleWishlist={toggleWishlist}
        />

        <ContentRow
          title="TV Shows"
          items={items.filter((item) => item.type === "tv-show")}
          toggleWatchlist={toggleWatchlist}
          toggleWishlist={toggleWishlist}
        />
      </div>

      <div className="h-12 sm:h-16 lg:h-20"></div>
    </div>
  )
}
