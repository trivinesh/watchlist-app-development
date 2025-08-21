"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Play,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Share,
  Bookmark,
  Calendar,
  Clock,
  Users,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NetflixNav } from "@/components/netflix-nav"
import { SAMPLE_DATA, type WatchlistItem } from "@/lib/data"

export default function WatchPage({ params }: { params: { id: string } }) {
  const [items, setItems] = useState<WatchlistItem[]>(SAMPLE_DATA)
  const [isInWishlist, setIsInWishlist] = useState(() => {
    if (typeof window !== "undefined") {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      return wishlist.includes(params.id)
    }
    return false
  })

  const item = items.find((i) => i.id === params.id)

  const toggleWatchlist = () => {
    if (!item) return
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.id === item.id
          ? {
              ...i,
              status: i.status === "watchlist" ? "want-to-watch" : "watchlist",
            }
          : i,
      ),
    )
  }

  const toggleWishlist = () => {
    const newWishlistState = !isInWishlist
    setIsInWishlist(newWishlistState)

    if (typeof window !== "undefined") {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      if (newWishlistState) {
        if (!wishlist.includes(params.id)) {
          wishlist.push(params.id)
        }
      } else {
        const index = wishlist.indexOf(params.id)
        if (index > -1) {
          wishlist.splice(index, 1)
        }
      }
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
    }
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Content Not Found</h1>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const similarItems = items.filter((i) => i.id !== item.id && i.genre === item.genre).slice(0, 6)

  return (
    <div className="min-h-screen bg-black text-white">
      <NetflixNav />

      {/* Hero Section */}
      <div className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${item.poster})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 pt-20 w-full">
            <Link href="/" className="inline-flex items-center text-white hover:text-gray-300 mb-8">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Browse
            </Link>

            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{item.title}</h1>

              <div className="flex items-center flex-wrap gap-3 mb-6">
                <Badge variant="secondary" className="bg-yellow-500 text-black font-semibold text-lg px-3 py-1">
                  <Award className="h-4 w-4 mr-1" />
                  {item.rating}
                </Badge>
                <Badge variant="outline" className="border-gray-400 text-gray-300 text-lg px-3 py-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(item.releaseDate).getFullYear()}
                </Badge>
                <Badge variant="outline" className="border-gray-400 text-gray-300 text-lg px-3 py-1">
                  {item.type === "movie" ? "Movie" : "TV Show"}
                </Badge>
                <Badge variant="outline" className="border-gray-400 text-gray-300 text-lg px-3 py-1">
                  {item.genre}
                </Badge>
                {item.personalRating && (
                  <Badge className="bg-red-600 text-white font-semibold text-lg px-3 py-1">
                    My Rating: ★ {item.personalRating}
                  </Badge>
                )}
              </div>

              {item.duration && (
                <div className="flex items-center text-gray-300 mb-4">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{item.duration}</span>
                </div>
              )}

              {item.seasons && (
                <div className="flex items-center text-gray-300 mb-4">
                  <Users className="h-4 w-4 mr-2" />
                  <span>
                    {item.seasons} Seasons • {item.episodes} Episodes
                  </span>
                </div>
              )}

              <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">{item.description}</p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-semibold text-lg px-8">
                  <Play className="h-6 w-6 mr-2 fill-current" />
                  Play
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={toggleWatchlist}
                  className="border-gray-400 text-white hover:bg-gray-800 font-semibold text-lg px-8 bg-transparent"
                >
                  <Heart
                    className={`h-6 w-6 mr-2 transition-colors duration-200 ${
                      item.status === "watchlist" ? "fill-red-500 text-red-500" : "text-white"
                    }`}
                  />
                  {item.status === "watchlist" ? "In Watchlist" : "Add to Watchlist"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={toggleWishlist}
                  className="border-gray-400 text-white hover:bg-gray-800 font-semibold text-lg px-8 bg-transparent"
                >
                  <Bookmark
                    className={`h-6 w-6 mr-2 transition-colors duration-200 ${
                      isInWishlist ? "fill-yellow-500 text-yellow-500" : "text-white"
                    }`}
                  />
                  {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                </Button>
                <Button size="lg" variant="ghost" className="text-white hover:bg-gray-800">
                  <ThumbsUp className="h-6 w-6" />
                </Button>
                <Button size="lg" variant="ghost" className="text-white hover:bg-gray-800">
                  <ThumbsDown className="h-6 w-6" />
                </Button>
                <Button size="lg" variant="ghost" className="text-white hover:bg-gray-800">
                  <Share className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="relative z-10 -mt-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-6">About {item.title}</h2>

              {item.cast && (
                <div className="mb-6 p-4 bg-gray-900 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-3 flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Cast
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.cast.map((actor, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-700 text-white">
                        {actor}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {item.director && (
                <div className="mb-6 p-4 bg-gray-900 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2 flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Director
                  </h3>
                  <Badge variant="outline" className="border-red-600 text-red-400">
                    {item.director}
                  </Badge>
                </div>
              )}

              {item.notes && (
                <div className="mb-6 p-4 bg-gray-900 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-3">My Notes</h3>
                  <p className="text-gray-300 italic border-l-4 border-red-600 pl-4">{item.notes}</p>
                </div>
              )}
            </div>

            <div>
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-gray-400">Release Date: </span>
                    <span className="text-white ml-2">{new Date(item.releaseDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-400">Genre: </span>
                    <Badge variant="outline" className="ml-2 border-red-600 text-red-400">
                      {item.genre}
                    </Badge>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-400">Status: </span>
                    <Badge variant="secondary" className="ml-2 bg-red-600 text-white">
                      {item.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Badge>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-400">Added: </span>
                    <span className="text-white ml-2">{new Date(item.addedDate).toLocaleDateString()}</span>
                  </div>
                  {item.personalRating && (
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2 text-yellow-400" />
                      <span className="text-gray-400">My Rating: </span>
                      <span className="text-yellow-400 ml-2">★ {item.personalRating}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-gray-400">IMDb Rating: </span>
                    <span className="text-white ml-2">★ {item.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Content */}
        {similarItems.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 pb-12">
            <h2 className="text-2xl font-semibold mb-6">More Like This</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {similarItems.map((similarItem) => (
                <Link key={similarItem.id} href={`/watch/${similarItem.id}`}>
                  <div className="cursor-pointer transform transition-transform duration-300 hover:scale-105 bg-gray-900 rounded-lg overflow-hidden">
                    <img
                      src={similarItem.poster || "/placeholder.svg"}
                      alt={similarItem.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="text-sm font-medium truncate text-white">{similarItem.title}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-400">★ {similarItem.rating}</p>
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                          {similarItem.genre}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
