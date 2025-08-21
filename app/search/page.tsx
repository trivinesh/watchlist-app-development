"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { NetflixNav } from "@/components/netflix-nav"
import { SAMPLE_DATA, type WatchlistItem } from "@/lib/data"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredItems, setFilteredItems] = useState<WatchlistItem[]>([])
  const [items] = useState<WatchlistItem[]>(SAMPLE_DATA)

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredItems([])
    } else {
      const filtered = items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.cast?.some((actor) => actor.toLowerCase().includes(searchQuery.toLowerCase())) ||
          item.director?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredItems(filtered)
    }
  }, [searchQuery, items])

  return (
    <div className="min-h-screen bg-black text-white">
      <NetflixNav />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for movies, TV shows, actors, directors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-primary"
                autoFocus
              />
            </div>
          </div>

          {searchQuery.trim() === "" ? (
            <div className="text-center py-20">
              <h2 className="text-3xl font-semibold mb-4">Search for your next watch</h2>
              <p className="text-gray-400 text-lg">Find movies, TV shows, actors, and more</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold mb-4">No results found for "{searchQuery}"</h2>
              <p className="text-gray-400">Try searching for something else</p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                {filteredItems.length} result{filteredItems.length !== 1 ? "s" : ""} for "{searchQuery}"
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredItems.map((item) => (
                  <Link key={item.id} href={`/watch/${item.id}`}>
                    <div className="cursor-pointer transform transition-transform duration-300 hover:scale-105">
                      <div className="relative">
                        <img
                          src={item.poster || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-40 object-cover rounded-md mb-3"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="bg-black/70 text-white text-xs">
                            {item.type === "movie" ? "Movie" : "TV"}
                          </Badge>
                        </div>
                      </div>
                      <h3 className="text-sm font-medium mb-1 line-clamp-2">{item.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-400 text-xs">★ {item.rating}</span>
                        <span className="text-gray-400 text-xs">{new Date(item.releaseDate).getFullYear()}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{item.genre}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
