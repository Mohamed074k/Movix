'use client';

import Link from 'next/link';
import { Star, Play } from 'lucide-react';
import { getImageUrl } from '@/lib/tmdb';

const MovieCard = ({ movie }) => {
  const {
    id,
    title,
    name,
    poster_path,
    vote_average,
    release_date,
    first_air_date,
    media_type,
  } = movie;

  const displayTitle = title || name;
  const displayDate = release_date || first_air_date;
  const year = displayDate ? new Date(displayDate).getFullYear() : '';
  const type = media_type === 'tv' ? 'tv' : 'movie';

  return (
    <Link href={`/${type}/${id}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-gray-800 transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-2xl aspect-[2/3] w-full">
        {/* Poster Image */}
        <img
          src={getImageUrl(poster_path, 'w500')}
          alt={displayTitle}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0xNTAgMjI1QzE2Ni41NjkgMjI1IDE4MCAyMTEuNTY5IDE4MCAxOTVDMTgwIDE3OC40MzEgMTY2LjU2OSAxNjUgMTUwIDE2NUMxMzMuNDMxIDE2NSAxMjAgMTc4LjQzMSAxMjAgMTk1QzEyMCAyMTEuNTY5IDEzMy40MzEgMjI1IDE1MCAyMjVaIiBmaWxsPSIjNkI3MjgwIi8+CjxwYXRoIGQ9Ik0xNTAgMjM1QzE3Ni41NjkgMjM1IDE5OCAyMTMuNTY5IDE5OCAxODdDMTk4IDE2MC40MzEgMTc2LjU2OSAxMzkgMTUwIDEzOUMxMjMuNDMxIDEzOSAxMDIgMTYwLjQzMSAxMDIgMTg3QzEwMiAyMTMuNTY5IDEyMy40MzEgMjM1IDE1MCAyMzVaIiBmaWxsPSIjNkI3MjgwIiBmaWxsLW9wYWNpdHk9IjAuNSIvPgo8L3N2Zz4K';
          }}
        />
        
        {/* Overlay with play button */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <Play className="h-8 w-8 text-white fill-white" />
          </div>
        </div>

        {/* Rating Badge */}
        {vote_average > 0 && (
          <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-xs font-medium">
              {vote_average.toFixed(1)}
            </span>
          </div>
        )}

        {/* Movie Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
          <h3 className="text-white font-bold text-sm line-clamp-1 group-hover:text-purple-300 transition-colors">
            {displayTitle}
          </h3>
          {year && (
            <p className="text-gray-300 text-xs mt-1">
              {year}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
