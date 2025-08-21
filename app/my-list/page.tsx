"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Play, Info, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NetflixNav } from "@/components/netflix-nav"
import { SAMPLE_DATA, type WatchlistItem } from "@/lib/data"
import { SortDropdown, type SortOption } from "@/components/sort-dropdown"

export default function MyListPage() {
  const [items, setItems] = useState<WatchlistItem[]>(SAMPLE_DATA)
  const [sortOption, setSortOption] = useState<SortOption>("release-date-newest")
  
  const myListItems = useMemo(() => {
    const filtered = items.filter((item) => item.status === "want-to-watch")
    
    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "release-date-newest":
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        case "release-date-oldest":
          return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
        case "rating-highest":
          return b.rating - a.rating
        case "rating-lowest":
          return a.rating - b.rating
        case "personal-rating-highest":
          return (b.personalRating || 0) - (a.personalRating || 0)
        case "personal-rating-lowest":
          return (a.personalRating || 0) - (b.personalRating || 0)
        default:
          return 0
      }
    })
  }, [items, sortOption])

  const removeFromList = (itemId: string) => {
    setItems(items.map((item) => (item.id === itemId ? { ...item, status: "watched" as const } : item)))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <NetflixNav />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">My List</h1>
            <SortDropdown onSortChange={setSortOption} currentSort={sortOption} />
          </div>

          {myListItems.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold mb-4">Your list is empty</h2>
              <p className="text-gray-400 mb-8">Add movies and TV shows to watch them later</p>
              <Link href="/">
                <Button size="lg" className="bg-primary hover:bg-primary/80">
                  Browse Content
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myListItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors"
                >
                  <Link href={`/watch/${item.id}`}>
                    <img
                      src={item.poster || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  </Link>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="bg-yellow-500 text-black text-xs">
                            ★ {item.rating}
                          </Badge>
                          <span className="text-gray-400 text-sm">{new Date(item.releaseDate).getFullYear()}</span>
                          <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {item.genre}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromList(item.id)}
                        className="text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>

                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-white text-black hover:bg-gray-200 flex-1">
                        <Play className="h-4 w-4 mr-1 fill-current" />
                        Play
                      </Button>
                      <Link href={`/watch/${item.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                        >
                          <Info className="h-4 w-4 mr-1" />
                          Info
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
