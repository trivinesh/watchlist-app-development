import React from 'react';

type WatchStatus = 'Watched' | 'Watching' | 'Want to Watch';

interface MovieCardProps {
  title: string;
  genre: string;
  releaseYear: number;
  rating: number;
  status: WatchStatus;
  posterUrl?: string;
  notes?: string;
  onEdit: () => void;
  onDelete: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  genre,
  releaseYear,
  rating,
  status,
  posterUrl,
  notes,
  onEdit,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-sm">
      <img
        src={posterUrl || '/placeholder.jpg'}
        alt={title}
        className="w-full h-64 object-cover rounded"
      />

      <div className="mt-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600">{genre} • {releaseYear}</p>
        <p className="text-sm mt-1">⭐ {rating}/10</p>
        <p className="text-sm text-blue-600">{status}</p>

        {notes && <p className="text-sm mt-2 text-gray-700 italic">📝 {notes}</p>}

        <div className="flex justify-between mt-4">
          <button
            onClick={onEdit}
            className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
