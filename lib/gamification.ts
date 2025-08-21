export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: BadgeCategory
  requirement: BadgeRequirement
  rarity: BadgeRarity
  unlocked: boolean
  unlockedDate?: string
  progress: number
  maxProgress: number
}

export type BadgeCategory = 
  | "series-completion" 
  | "rating-master" 
  | "genre-explorer" 
  | "watch-streak" 
  | "collection-master"
  | "social-butterfly"

export type BadgeRarity = "common" | "rare" | "epic" | "legendary"

export interface BadgeRequirement {
  type: "count" | "streak" | "genre" | "rating" | "series"
  target: number
  condition?: string
}

export interface UserStats {
  totalWatched: number
  totalRated: number
  genresExplored: string[]
  seriesCompleted: number
  averageRating: number
  longestStreak: number
  currentStreak: number
  badgesEarned: number
  totalBadges: number
}

export const BADGES: Badge[] = [
  // Series Completion Badges
  {
    id: "first-watch",
    name: "First Watch",
    description: "Complete your first movie or TV show",
    icon: "🎬",
    category: "series-completion",
    requirement: { type: "count", target: 1 },
    rarity: "common",
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: "movie-buff",
    name: "Movie Buff",
    description: "Complete 10 movies",
    icon: "🍿",
    category: "series-completion",
    requirement: { type: "count", target: 10 },
    rarity: "rare",
    unlocked: false,
    progress: 0,
    maxProgress: 10
  },
  {
    id: "binge-watcher",
    name: "Binge Watcher",
    description: "Complete 25 TV shows",
    icon: "📺",
    category: "series-completion",
    requirement: { type: "count", target: 25 },
    rarity: "epic",
    unlocked: false,
    progress: 0,
    maxProgress: 25
  },
  {
    id: "completionist",
    name: "Completionist",
    description: "Complete 100 items",
    icon: "🏆",
    category: "series-completion",
    requirement: { type: "count", target: 100 },
    rarity: "legendary",
    unlocked: false,
    progress: 0,
    maxProgress: 100
  },

  // Rating Master Badges
  {
    id: "first-rating",
    name: "First Rating",
    description: "Rate your first movie or show",
    icon: "⭐",
    category: "rating-master",
    requirement: { type: "rating", target: 1 },
    rarity: "common",
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: "critic",
    name: "Critic",
    description: "Rate 25 items",
    icon: "📝",
    category: "rating-master",
    requirement: { type: "rating", target: 25 },
    rarity: "rare",
    unlocked: false,
    progress: 0,
    maxProgress: 25
  },
  {
    id: "master-critic",
    name: "Master Critic",
    description: "Rate 100 items",
    icon: "🎯",
    category: "rating-master",
    requirement: { type: "rating", target: 100 },
    rarity: "epic",
    unlocked: false,
    progress: 0,
    maxProgress: 100
  },

  // Genre Explorer Badges
  {
    id: "genre-dabbler",
    name: "Genre Dabbler",
    description: "Explore 5 different genres",
    icon: "🎭",
    category: "genre-explorer",
    requirement: { type: "genre", target: 5 },
    rarity: "common",
    unlocked: false,
    progress: 0,
    maxProgress: 5
  },
  {
    id: "genre-aficionado",
    name: "Genre Aficionado",
    description: "Explore 10 different genres",
    icon: "🌈",
    category: "genre-explorer",
    requirement: { type: "genre", target: 10 },
    rarity: "rare",
    unlocked: false,
    progress: 0,
    maxProgress: 10
  },
  {
    id: "genre-master",
    name: "Genre Master",
    description: "Explore all available genres",
    icon: "🎪",
    category: "genre-explorer",
    requirement: { type: "genre", target: 15 },
    rarity: "epic",
    unlocked: false,
    progress: 0,
    maxProgress: 15
  },

  // Collection Master Badges
  {
    id: "collector",
    name: "Collector",
    description: "Add 50 items to your lists",
    icon: "📚",
    category: "collection-master",
    requirement: { type: "count", target: 50 },
    rarity: "rare",
    unlocked: false,
    progress: 0,
    maxProgress: 50
  },
  {
    id: "hoarder",
    name: "Hoarder",
    description: "Add 200 items to your lists",
    icon: "🗄️",
    category: "collection-master",
    requirement: { type: "count", target: 200 },
    rarity: "epic",
    unlocked: false,
    progress: 0,
    maxProgress: 200
  }
]

export function calculateUserStats(items: any[]): UserStats {
  const watchedItems = items.filter(item => item.status === "watched")
  const ratedItems = items.filter(item => item.personalRating !== undefined)
  const genres = [...new Set(items.map(item => item.genre))]
  
  return {
    totalWatched: watchedItems.length,
    totalRated: ratedItems.length,
    genresExplored: genres,
    seriesCompleted: watchedItems.length,
    averageRating: ratedItems.length > 0 
      ? ratedItems.reduce((sum, item) => sum + (item.personalRating || 0), 0) / ratedItems.length 
      : 0,
    longestStreak: 0,
    currentStreak: 0,
    badgesEarned: 0,
    totalBadges: BADGES.length
  }
}

export function updateBadgeProgress(stats: UserStats, badges: Badge[]): Badge[] {
  return badges.map(badge => {
    let progress = 0
    
    switch (badge.requirement.type) {
      case "count":
        if (badge.category === "series-completion") {
          progress = Math.min(stats.totalWatched, badge.maxProgress)
        } else if (badge.category === "collection-master") {
          progress = Math.min(stats.totalWatched + stats.totalRated, badge.maxProgress)
        }
        break
        
      case "rating":
        progress = Math.min(stats.totalRated, badge.maxProgress)
        break
        
      case "genre":
        progress = Math.min(stats.genresExplored.length, badge.maxProgress)
        break
    }
    
    return {
      ...badge,
      progress,
      unlocked: progress >= badge.maxProgress,
      unlockedDate: progress >= badge.maxProgress && !badge.unlocked ? new Date().toISOString() : badge.unlockedDate
    }
  })
}
