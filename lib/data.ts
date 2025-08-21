export type WatchStatus = "wishlist" | "watchlist" | "want-to-watch" | "watching" | "watched"
export type ItemType = "movie" | "tv-show"

export interface WatchlistItem {
  id: string
  title: string
  type: ItemType
  genre: string
  rating: number
  personalRating?: number
  status: WatchStatus
  releaseDate: string
  poster: string
  notes?: string
  addedDate: string
  description?: string
  featured?: boolean
  cast?: string[]
  director?: string
  duration?: string
  seasons?: number
  episodes?: number
}

export const SAMPLE_DATA: WatchlistItem[] = [
  {
    id: "1",
    title: "The Dark Knight",
    type: "movie",
    genre: "Action",
    rating: 9.0,
    personalRating: 10,
    status: "watched",
    releaseDate: "2008-07-18",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    notes: "Incredible performance by Heath Ledger. Best Batman movie ever!",
    addedDate: "2024-01-15",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    featured: true,
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
    director: "Christopher Nolan",
    duration: "2h 32m",
  },
  {
    id: "2",
    title: "Stranger Things",
    type: "tv-show",
    genre: "Sci-Fi",
    rating: 8.7,
    status: "watching",
    releaseDate: "2016-07-15",
    poster: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    notes: "Currently on Season 3. Love the 80s nostalgia!",
    addedDate: "2024-02-01",
    description:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "David Harbour", "Winona Ryder"],
    seasons: 4,
    episodes: 34,
  },
  {
    id: "3",
    title: "Dune: Part Two",
    type: "movie",
    genre: "Sci-Fi",
    rating: 8.5,
    status: "want-to-watch",
    releaseDate: "2024-03-01",
    poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    addedDate: "2024-02-20",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Oscar Isaac"],
    director: "Denis Villeneuve",
    duration: "2h 46m",
  },
  {
    id: "4",
    title: "The Bear",
    type: "tv-show",
    genre: "Comedy",
    rating: 8.9,
    personalRating: 9,
    status: "watched",
    releaseDate: "2022-06-23",
    poster: "https://image.tmdb.org/t/p/w500/sHFlbKS3WLqMnp9t2ghADIJFnuQ.jpg",
    notes: "Brilliant writing and acting. Jeremy Allen White is phenomenal.",
    addedDate: "2024-01-10",
    description: "A young chef from the fine dining world comes home to Chicago to run his family sandwich shop.",
    cast: ["Jeremy Allen White", "Ebon Moss-Bachrach", "Ayo Edebiri", "Lionel Boyce"],
    seasons: 3,
    episodes: 28,
  },
  {
    id: "5",
    title: "Oppenheimer",
    type: "movie",
    genre: "Biography",
    rating: 8.3,
    status: "wishlist",
    releaseDate: "2023-07-21",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    addedDate: "2024-03-01",
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
    director: "Christopher Nolan",
    duration: "3h 0m",
  },
  {
    id: "6",
    title: "Wednesday",
    type: "tv-show",
    genre: "Comedy",
    rating: 8.1,
    status: "watchlist",
    releaseDate: "2022-11-23",
    poster: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    addedDate: "2024-02-15",
    description: "Follows Wednesday Addams' years as a student at Nevermore Academy.",
    cast: ["Jenna Ortega", "Hunter Doohan", "Emma Myers", "Joy Sunday"],
    seasons: 1,
    episodes: 8,
  },
]

export const getStatusDisplayName = (status: WatchStatus): string => {
  switch (status) {
    case "wishlist":
      return "Wishlist"
    case "watchlist":
      return "Watchlist"
    case "want-to-watch":
      return "Want to Watch"
    case "watching":
      return "Currently Watching"
    case "watched":
      return "Watched"
    default:
      return status
  }
}

export const getStatusDescription = (status: WatchStatus): string => {
  switch (status) {
    case "wishlist":
      return "Items you're interested in but haven't committed to watching yet"
    case "watchlist":
      return "Items you've decided to watch and are planning to start soon"
    case "want-to-watch":
      return "Items you definitely want to watch"
    case "watching":
      return "Items you're currently watching"
    case "watched":
      return "Items you've completed watching"
    default:
      return ""
  }
}
