"use client"

import { Badge, UserStats } from "@/lib/gamification"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Zap } from "lucide-react"

interface BadgesDisplayProps {
  badges: Badge[]
  stats: UserStats
}

export function BadgesDisplay({ badges, stats }: BadgesDisplayProps) {
  const unlockedBadges = badges.filter(b => b.unlocked)
  const lockedBadges = badges.filter(b => !b.unlocked)
  
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "border-gray-400 bg-gray-900"
      case "rare": return "border-blue-400 bg-blue-900/20"
      case "epic": return "border-purple-400 bg-purple-900/20"
      case "legendary": return "border-yellow-400 bg-yellow-900/20"
      default: return "border-gray-400 bg-gray-900"
    }
  }

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-gray-300"
      case "rare": return "text-blue-300"
      case "epic": return "text-purple-300"
      case "legendary": return "text-yellow-300"
      default: return "text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            Your Progress
          </CardTitle>
          <CardDescription className="text-gray-400">
            Turn watching into a fun challenge!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.totalWatched}</div>
              <div className="text-sm text-gray-400">Items Watched</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.totalRated}</div>
              <div className="text-sm text-gray-400">Items Rated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.genresExplored.length}</div>
              <div className="text-sm text-gray-400">Genres Explored</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{unlockedBadges.length}</div>
              <div className="text-sm text-gray-400">Badges Earned</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Overall Progress</span>
              <span>{unlockedBadges.length} / {badges.length}</span>
            </div>
            <Progress value={(unlockedBadges.length / badges.length) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Unlocked Badges */}
      {unlockedBadges.length > 0 && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              Unlocked Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {unlockedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`relative p-4 rounded-lg border-2 ${getRarityColor(badge.rarity)}`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <h3 className="font-semibold text-white text-sm">{badge.name}</h3>
                    <p className={`text-xs ${getRarityTextColor(badge.rarity)} capitalize`}>
                      {badge.rarity}
                    </p>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    ✓
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Locked Badges */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-400" />
            Available Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lockedBadges.map((badge) => (
              <div key={badge.id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl opacity-50">{badge.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{badge.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{badge.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${getRarityTextColor(badge.rarity)} capitalize`}>
                        {badge.rarity}
                      </span>
                      <span className="text-xs text-gray-400">
                        {badge.progress} / {badge.maxProgress}
                      </span>
                    </div>
                    <Progress value={(badge.progress / badge.maxProgress) * 100} className="h-2 mt-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
