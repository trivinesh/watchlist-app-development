"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Play, Star, Plus, Check, Bookmark } from "lucide-react"
import type { WatchlistItem } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface MovieCardProps {
  item: WatchlistItem
  onToggleWatchlist?: (id: string) => void
  onToggleWishlist?: (id: string) => void
  onPlay?: (id: string) => void
  className?: string
}

export function MovieCard({ item, onToggleWatchlist, onToggleWishlist, onPlay, className }: MovieCardProps) {
  const [isInWatchlist, setIsInWatchlist] = useState(item.status === "watchlist")
  const [isInWishlist, setIsInWishlist] = useState(() => {
    if (typeof window !== "undefined") {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      return wishlist.includes(item.id)
    }
    return false
  })
  const [imageError, setImageError] = useState(false)

  const handleToggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsInWatchlist(!isInWatchlist)
    onToggleWatchlist?.(item.id)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const newWishlistState = !isInWishlist
    setIsInWishlist(newWishlistState)

    if (typeof window !== "undefined") {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      if (newWishlistState) {
        if (!wishlist.includes(item.id)) {
          wishlist.push(item.id)
        }
      } else {
        const index = wishlist.indexOf(item.id)
        if (index > -1) {
          wishlist.splice(index, 1)
        }
      }
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
    }

    onToggleWishlist?.(item.id)
  }

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onPlay?.(item.id)
  }

  return (
    <Link href={`/watch/${item.id}`}>
      <div
        className={cn(
          "group relative bg-gray-900 rounded-md overflow-hidden transition-all duration-300 hover:scale-105 hover:z-10 cursor-pointer",
          className,
        )}
      >
        {/* Movie Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={
              imageError
                ? `/placeholder.svg?height=450&width=300&query=${encodeURIComponent(item.title + " movie poster")}`
                : item.poster
            }
            alt={`${item.title} poster`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-white text-black hover:bg-gray-200 font-bold rounded-full w-10 h-10 p-0"
                onClick={handlePlay}
              >
                <Play className="h-4 w-4 fill-current" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700 rounded-full w-10 h-10 p-0"
                onClick={handleToggleWatchlist}
              >
                {isInWatchlist ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700 rounded-full w-10 h-10 p-0"
                onClick={handleToggleWishlist}
              >
                <Heart className={cn("h-4 w-4", isInWatchlist ? "fill-red-500 text-red-500" : "text-white")} />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700 rounded-full w-10 h-10 p-0 ml-auto"
                onClick={handleToggleWishlist}
              >
                <Bookmark className={cn("h-4 w-4", isInWishlist ? "fill-yellow-500 text-yellow-500" : "text-white")} />
              </Button>
            </div>
          </div>

          <div className="absolute top-2 right-2">
            <Badge className="bg-black/60 text-white border-none text-xs">
              <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
              {item.rating}
            </Badge>
          </div>
        </div>

        <div className="p-3 bg-gray-900">
          <h3 className="font-bold text-white text-sm leading-tight mb-2 line-clamp-2">{item.title}</h3>
          <div className="flex items-center gap-2 text-xs text-gray-300 mb-1">
            <span className="bg-red-600 text-white px-1 rounded text-xs font-bold">
              {Math.round(item.rating * 10)}% Match
            </span>
            <span>{new Date(item.releaseDate).getFullYear()}</span>
            {item.duration && <span>{item.duration}</span>}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
            <span>{item.genre}</span>
            {item.cast && <span>• {item.cast.slice(0, 2).join(", ")}</span>}
          </div>
          {item.description && <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>}
        </div>
      </div>
    </Link>
  )
}
