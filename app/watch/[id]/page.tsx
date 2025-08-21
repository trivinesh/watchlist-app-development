"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Play, Plus, ThumbsUp, ThumbsDown, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NetflixNav } from "@/components/netflix-nav"
import { SAMPLE_DATA, type WatchlistItem } from "@/lib/data"

export default function WatchPage({ params }: { params: { id: string } }) {
  const [items] = useState<WatchlistItem[]>(SAMPLE_DATA)
  const item = items.find((i) => i.id === params.id)

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

              <div className="flex items-center space-x-4 mb-6">
                <Badge variant="secondary" className="bg-yellow-500 text-black font-semibold text-lg px-3 py-1">
                  ★ {item.rating}
                </Badge>
                <span className="text-gray-300 text-lg">{new Date(item.releaseDate).getFullYear()}</span>
                <Badge variant="outline" className="border-gray-400 text-gray-300 text-lg px-3 py-1">
                  {item.type === "movie" ? "Movie" : "TV Show"}
                </Badge>
                <Badge variant="outline" className="border-gray-400 text-gray-300 text-lg px-3 py-1">
                  {item.genre}
                </Badge>
              </div>

              {item.duration && <p className="text-gray-300 mb-4">{item.duration}</p>}

              {item.seasons && (
                <p className="text-gray-300 mb-4">
                  {item.seasons} Seasons • {item.episodes} Episodes
                </p>
              )}

              <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">{item.description}</p>

              <div className="flex space-x-4 mb-8">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-semibold text-lg px-8">
                  <Play className="h-6 w-6 mr-2 fill-current" />
                  Play
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-400 text-white hover:bg-gray-800 font-semibold text-lg px-8 bg-transparent"
                >
                  <Plus className="h-6 w-6 mr-2" />
                  My List
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
              <h2 className="text-2xl font-semibold mb-4">About {item.title}</h2>

              {item.cast && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-300 mb-2">Cast:</h3>
                  <p className="text-gray-400">{item.cast.join(", ")}</p>
                </div>
              )}

              {item.director && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-300 mb-2">Director:</h3>
                  <p className="text-gray-400">{item.director}</p>
                </div>
              )}

              {item.notes && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-300 mb-2">My Notes:</h3>
                  <p className="text-gray-400">{item.notes}</p>
                </div>
              )}
            </div>

            <div>
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400">Release Date: </span>
                    <span className="text-white">{new Date(item.releaseDate).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Genre: </span>
                    <span className="text-white">{item.genre}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Status: </span>
                    <Badge variant="secondary" className="ml-2">
                      {item.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Badge>
                  </div>
                  {item.personalRating && (
                    <div>
                      <span className="text-gray-400">My Rating: </span>
                      <span className="text-yellow-400">★ {item.personalRating}</span>
                    </div>
                  )}
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
                  <div className="cursor-pointer transform transition-transform duration-300 hover:scale-105">
                    <img
                      src={similarItem.poster || "/placeholder.svg"}
                      alt={similarItem.title}
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <h3 className="text-sm font-medium truncate">{similarItem.title}</h3>
                    <p className="text-xs text-gray-400">★ {similarItem.rating}</p>
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
