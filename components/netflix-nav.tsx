"use client"

import Link from "next/link"
import { Search } from "lucide-react"

export function NetflixNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/80">
            NETFLIX
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-white hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link href="/tv" className="text-white hover:text-gray-300 transition-colors">
              TV Shows
            </Link>
            <Link href="/movies" className="text-white hover:text-gray-300 transition-colors">
              Movies
            </Link>
            <Link href="/wishlist" className="text-white hover:text-gray-300 transition-colors">
              Wishlist
            </Link>
            <Link href="/watchlist" className="text-white hover:text-gray-300 transition-colors">
              Watchlist
            </Link>
            <Link href="/watching" className="text-white hover:text-gray-300 transition-colors">
              Watching
            </Link>
            <Link href="/watched" className="text-white hover:text-gray-300 transition-colors">
              Watched
            </Link>
            <Link href="/my-list" className="text-white hover:text-gray-300 transition-colors">
              My List
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/search">
            <Search className="h-5 w-5 text-white cursor-pointer hover:text-gray-300" />
          </Link>
          <Link href="/profile">
            <div className="w-8 h-8 bg-primary rounded-sm"></div>
          </Link>
        </div>
      </div>
    </nav>
  )
}
