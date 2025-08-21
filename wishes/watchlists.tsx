import MovieCard from './MovieCard';

<MovieCard
  title="Inception"
  genre="Sci-Fi"
  releaseYear={2010}
  rating={9}
  status="Watched"
  posterUrl="https://image.tmdb.org/t/p/w500/yourposter.jpg"
  notes="Mind-bending thriller!"
  onEdit={() => console.log('Edit clicked')}
  onDelete={() => console.log('Delete clicked')}
/>
