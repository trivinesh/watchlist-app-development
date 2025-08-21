"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Smile, Frown, Zap, Coffee, Heart, Bookmark, Clock, Star, Trophy, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NetflixNav } from "@/components/netflix-nav"
import { SAMPLE_DATA, type WatchlistItem } from "@/lib/data"

function MoodBasedSuggestions({
  items,
  toggleWatchlist,
  toggleWishlist,
}: {
  items: WatchlistItem[]
  toggleWatchlist: (itemId: string, e: React.MouseEvent) => void
  toggleWishlist: (itemId: string, e: React.MouseEvent) => void
}) {
  const [selectedMood, setSelectedMood] = useState<string>("")

  const moods = [
    { id: "happy", label: "Happy", icon: Smile, color: "bg-yellow-500", genres: ["comedy", "family", "musical"] },
    { id: "sad", label: "Sad", icon: Frown, color: "bg-blue-500", genres: ["drama", "romance"] },
    { id: "thriller", label: "Thriller", icon: Zap, color: "bg-red-500", genres: ["thriller", "action", "crime"] },
    {
      id: "relax",
      label: "Relax",
      icon: Coffee,
      color: "bg-green-500",
      genres: ["documentary", "nature", "slice-of-life"],
    },
  ]

  const getMoodSuggestions = (mood: string) => {
    const moodData = moods.find((m) => m.id === mood)
    if (!moodData) return []

    return items
      .filter((item) =>
        moodData.genres.some(
          (genre) => item.genre.toLowerCase().includes(genre) || item.description.toLowerCase().includes(genre),
        ),
      )
      .slice(0, 8)
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-heading">Mood-Based Suggestions</CardTitle>
        <CardDescription>Entertainment that matches your mood</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide">
          {moods.map((mood) => {
            const Icon = mood.icon
            return (
              <Button
                key={mood.id}
                onClick={() => setSelectedMood(selectedMood === mood.id ? "" : mood.id)}
                variant={selectedMood === mood.id ? "default" : "outline"}
                className={`flex-none ${selectedMood === mood.id ? mood.color : "border-gray-600 hover:border-gray-400"}`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {mood.label}
              </Button>
            )
          })}
        </div>

        {selectedMood && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {getMoodSuggestions(selectedMood).map((item) => (
              <div key={item.id} className="relative group">
                <div className="cursor-pointer transform transition-transform duration-300 hover:scale-105">
                  <div className="relative">
                    <img
                      src={
                        item.poster ||
                        `/placeholder.svg?height=240&width=160&query=${encodeURIComponent(item.title + " poster") || "/placeholder.svg"}`
                      }
                      alt={item.title}
                      className="w-full h-32 sm:h-40 object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 left-2 right-2">
                        <h3 className="text-white text-sm font-semibold truncate">{item.title}</h3>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-yellow-400 text-xs">★ {item.rating}</span>
                          <Badge variant="secondary" className="text-xs bg-accent">
                            {item.type === "movie" ? "Movie" : "TV"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => toggleWatchlist(item.id, e)}
                    className="p-1 rounded-full bg-black/70 hover:bg-black/90 transition-colors duration-200"
                  >
                    <Heart
                      className={`h-4 w-4 transition-colors duration-200 ${
                        item.status === "watchlist" ? "fill-red-500 text-red-500" : "text-white hover:text-red-500"
                      }`}
                    />
                  </button>
                  <button
                    onClick={(e) => toggleWishlist(item.id, e)}
                    className="p-1 rounded-full bg-black/70 hover:bg-black/90 transition-colors duration-200"
                  >
                    <Bookmark className="h-4 w-4 text-white hover:text-yellow-500 transition-colors duration-200" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function GamificationSection() {
  const [userStats, setUserStats] = useState({
    seriesCompleted: 3,
    moviesRated: 15,
    genresExplored: 8,
    totalWatchTime: 120, // hours
  })

  const badges = [
    {
      id: "series-master",
      title: "Series Master",
      description: "Complete 5 TV series",
      icon: Trophy,
      progress: userStats.seriesCompleted,
      target: 5,
      unlocked: userStats.seriesCompleted >= 5,
    },
    {
      id: "critic",
      title: "Movie Critic",
      description: "Rate 20 movies",
      icon: Star,
      progress: userStats.moviesRated,
      target: 20,
      unlocked: userStats.moviesRated >= 20,
    },
    {
      id: "explorer",
      title: "Genre Explorer",
      description: "Watch content from 10 different genres",
      icon: Award,
      progress: userStats.genresExplored,
      target: 10,
      unlocked: userStats.genresExplored >= 10,
    },
  ]

  return (
    <Card className="bg-gray-900/50 border-gray-800 mb-8">
      <CardHeader>
        <CardTitle className="text-xl font-heading">Your Achievements</CardTitle>
        <CardDescription>Turn watching into a fun challenge</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {badges.map((badge) => {
            const Icon = badge.icon
            const progressPercentage = Math.min((badge.progress / badge.target) * 100, 100)

            return (
              <div
                key={badge.id}
                className={`flex-none w-48 p-4 rounded-lg border transition-all duration-300 ${
                  badge.unlocked
                    ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50"
                    : "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                }`}
              >
                <div className="flex items-center mb-3">
                  <div className={`p-2 rounded-full ${badge.unlocked ? "bg-yellow-500" : "bg-gray-600"}`}>
                    <Icon className={`h-5 w-5 ${badge.unlocked ? "text-black" : "text-gray-300"}`} />
                  </div>
                  <div className="ml-3">
                    <h3 className={`font-semibold text-sm ${badge.unlocked ? "text-yellow-400" : "text-white"}`}>
                      {badge.title}
                    </h3>
                    {badge.unlocked && <span className="text-xs text-yellow-500">Unlocked!</span>}
                  </div>
                </div>

                <p className="text-xs text-gray-400 mb-3">{badge.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">
                      {badge.progress}/{badge.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        badge.unlocked ? "bg-yellow-500" : "bg-gray-500"
                      }`}
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default function ProfilePage() {
  const [user, setUser] = useState<any | null>(null)
  const [items, setItems] = useState<WatchlistItem[]>(SAMPLE_DATA)
  const [wishlistItems, setWishlistItems] = useState<string[]>([])
  const [watchedItems, setWatchedItems] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))

    if (typeof window !== "undefined") {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      const watched = JSON.parse(localStorage.getItem("watched") || "[]")
      setWishlistItems(wishlist)
      setWatchedItems(watched)
    }
  }, [router])

  const toggleWatchlist = (itemId: string, e: React.MouseEvent) => {
    e.preventDefault()
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
    if (typeof window !== "undefined") {
      const currentWatchlist = JSON.parse(localStorage.getItem("watchlist") || "[]")
      const newWatchlist = currentWatchlist.includes(itemId)
        ? currentWatchlist.filter((id: string) => id !== itemId)
        : [...currentWatchlist, itemId]
      localStorage.setItem("watchlist", JSON.stringify(newWatchlist))
      setWishlistItems(newWatchlist)
    }
  }

  const toggleWishlist = (itemId: string, e: React.MouseEvent) => {
    e.preventDefault()
    if (typeof window !== "undefined") {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      const newWishlist = wishlist.includes(itemId)
        ? wishlist.filter((id: string) => id !== itemId)
        : [...wishlist, itemId]
      localStorage.setItem("wishlist", JSON.stringify(newWishlist))
      setWishlistItems(newWishlist)
    }
  }

  if (!user) {
    return null
  }

  const watchedCount = watchedItems.length
  const watchlistCount = wishlistItems.length
  const totalWatchTime = items
    .filter((item) => watchedItems.includes(item.id))
    .reduce((acc, item) => acc + (item.runtime || 120), 0)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NetflixNav />

      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="mb-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-heading font-bold mb-2">{user.username}</h1>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Star className="h-8 w-8 text-yellow-500" />
                    <div>
                      <p className="text-2xl font-bold">{watchedCount}</p>
                      <p className="text-sm text-gray-400">Movies Watched</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Heart className="h-8 w-8 text-red-500" />
                    <div>
                      <p className="text-2xl font-bold">{watchlistCount}</p>
                      <p className="text-sm text-gray-400">In Watchlist</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">{Math.round(totalWatchTime / 60)}h</p>
                      <p className="text-sm text-gray-400">Watch Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Gamification Section */}
          <GamificationSection />

          {/* Mood-Based Suggestions */}
          <MoodBasedSuggestions items={items} toggleWatchlist={toggleWatchlist} toggleWishlist={toggleWishlist} />
        </div>
      </div>
    </div>
  )
}
