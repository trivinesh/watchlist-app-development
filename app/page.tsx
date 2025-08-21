"use client"

import { useState } from "react"
import Link from "next/link"
import { Play, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NetflixNav } from "@/components/netflix-nav"
import { SAMPLE_DATA, type WatchlistItem } from "@/lib/data"

function HeroBanner({ item }: { item: WatchlistItem }) {
  return (
    <div className="relative h-screen flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${item.poster})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20">
        <div className="max-w-lg">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{item.title}</h1>
          <p className="text-lg md:text-xl mb-6 text-gray-200">{item.description}</p>
          <div className="flex items-center space-x-4 mb-6">
            <Badge variant="secondary" className="bg-yellow-500 text-black font-semibold">
              ★ {item.rating}
            </Badge>
            <span className="text-gray-300">{new Date(item.releaseDate).getFullYear()}</span>
            <Badge variant="outline" className="border-gray-400 text-gray-300">
              {item.type === "movie" ? "Movie" : "TV Show"}
            </Badge>
          </div>
          <div className="flex space-x-4">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-semibold">
              <Play className="h-5 w-5 mr-2 fill-current" />
              Play
            </Button>
            <Link href={`/watch/${item.id}`}>
              <Button
                size="lg"
                variant="secondary"
                className="bg-gray-600/70 text-white hover:bg-gray-600 font-semibold"
              >
                <Info className="h-5 w-5 mr-2" />
                More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContentRow({ title, items }: { title: string; items: WatchlistItem[] }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 px-4 md:px-12">{title}</h2>
      <div className="relative group">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide px-4 md:px-12 pb-4">
          {items.map((item) => (
            <Link key={item.id} href={`/watch/${item.id}`}>
              <div className="flex-none w-48 md:w-64 cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <div className="relative">
                  <img
                    src={item.poster || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-28 md:h-36 object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 left-2 right-2">
                      <h3 className="text-white text-sm font-semibold truncate">{item.title}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-yellow-400 text-xs">★ {item.rating}</span>
                        <Badge variant="secondary" className="text-xs bg-primary">
                          {item.type === "movie" ? "Movie" : "TV"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function NetflixClone() {
  const [items] = useState<WatchlistItem[]>(SAMPLE_DATA)

  const featuredItem = items.find((item) => item.featured) || items[0]

  const trendingNow = items.filter((item) => item.rating >= 8.5)
  const continueWatching = items.filter((item) => item.status === "watching")
  const myList = items.filter((item) => item.status === "want-to-watch")
  const recentlyAdded = [...items].sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime())

  return (
    <div className="min-h-screen bg-black text-white">
      <NetflixNav />

      <HeroBanner item={featuredItem} />

      <div className="relative z-10 -mt-32 space-y-8">
        {continueWatching.length > 0 && <ContentRow title="Continue Watching" items={continueWatching} />}

        <ContentRow title="Trending Now" items={trendingNow} />

        {myList.length > 0 && <ContentRow title="My List" items={myList} />}

        <ContentRow title="Recently Added" items={recentlyAdded} />

        <ContentRow title="Movies" items={items.filter((item) => item.type === "movie")} />

        <ContentRow title="TV Shows" items={items.filter((item) => item.type === "tv-show")} />
      </div>

      <div className="h-20"></div>
    </div>
  )
}
