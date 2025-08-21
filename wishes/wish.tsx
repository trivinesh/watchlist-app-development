import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Movie {
  id: number;
  title: string;
}

const Watchlist: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [input, setInput] = useState("");

  // Add movie
  const addMovie = () => {
    if (input.trim() === "") return;
    const newMovie: Movie = {
      id: Date.now(),
      title: input.trim(),
    };
    setMovies([...movies, newMovie]);
    setInput("");
  };

  // Remove movie
  const removeMovie = (id: number) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎬 My Watchlist</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter movie name..."
          className="border p-2 rounded w-full"
        />
        <Button onClick={addMovie}>Add</Button>
      </div>

      <div className="grid gap-3">
        {movies.length === 0 && <p className="text-gray-500">No movies yet.</p>}
        {movies.map((movie) => (
          <Card key={movie.id} className="shadow">
            <CardContent className="flex justify-between items-center p-3">
              <span>{movie.title}</span>
              <Button variant="destructive" onClick={() => removeMovie(movie.id)}>
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;