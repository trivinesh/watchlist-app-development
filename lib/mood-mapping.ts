export type Mood = "happy" | "sad" | "thriller" | "relax" | "adventurous" | "romantic";

export interface MoodMapping {
  mood: Mood;
  title: string;
  description: string;
  genres: string[];
  keywords: string[];
  ratingRange?: [number, number];
}

export const MOOD_MAPPINGS: MoodMapping[] = [
  {
    mood: "happy",
    title: "Feel-Good Entertainment",
    description: "Light-hearted content to lift your spirits",
    genres: ["Comedy", "Romance", "Family", "Animation"],
    keywords: ["funny", "uplifting", "heartwarming", "feel-good"],
    ratingRange: [7.0, 10.0]
  },
  {
    mood: "sad",
    title: "Emotional Stories",
    description: "Deep, meaningful content for reflective moments",
    genres: ["Drama", "Biography", "Romance", "Tragedy"],
    keywords: ["emotional", "touching", "dramatic", "poignant"],
    ratingRange: [7.5, 10.0]
  },
  {
    mood: "thriller",
    title: "Edge-of-Your-Seat Thrills",
    description: "Intense, suspenseful content to keep you guessing",
    genres: ["Thriller", "Horror", "Crime", "Mystery"],
    keywords: ["suspense", "intense", "gripping", "thrilling"],
    ratingRange: [7.0, 10.0]
  },
  {
    mood: "relax",
    title: "Chill & Unwind",
    description: "Calm, soothing content for relaxation",
    genres: ["Documentary", "Comedy", "Drama", "Family"],
    keywords: ["calm", "peaceful", "relaxing", "comforting"],
    ratingRange: [6.5, 9.5]
  },
  {
    mood: "adventurous",
    title: "Epic Adventures",
    description: "Exciting journeys and grand adventures",
    genres: ["Action", "Adventure", "Sci-Fi", "Fantasy"],
    keywords: ["adventure", "exciting", "epic", "thrilling"],
    ratingRange: [7.0, 10.0]
  },
  {
    mood: "romantic",
    title: "Love Stories",
    description: "Heartwarming tales of love and connection",
    genres: ["Romance", "Drama", "Comedy", "Musical"],
    keywords: ["romantic", "love", "sweet", "heartfelt"],
    ratingRange: [6.5, 9.5]
  }
];

export const getMoodByGenre = (genre: string): Mood[] => {
  return MOOD_MAPPINGS
    .filter(mapping => mapping.genres.includes(genre))
    .map(mapping => mapping.mood);
};

export const getMoodSuggestions = (items: any[], mood: Mood) => {
  const mapping = MOOD_MAPPINGS.find(m => m.mood === mood);
  if (!mapping) return [];

  return items.filter(item => {
    const genreMatch = mapping.genres.some(g => item.genre?.toLowerCase().includes(g.toLowerCase()));
    const ratingMatch = mapping.ratingRange 
      ? item.rating >= mapping.ratingRange[0] && item.rating <= mapping.ratingRange[1]
      : true;
    
    return genreMatch && ratingMatch;
  });
};
