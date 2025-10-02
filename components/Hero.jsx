'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getTrendingMovies } from '@/lib/tmdb';
import { PlayCircle } from 'lucide-react';

const Hero = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getTrendingMovies();
        if (data.results && data.results.length > 0) {
          setFeaturedMovie(data.results[0]);
        }
      } catch (error) {
        console.error('Error fetching featured movie:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (isLoading || !featuredMovie) {
    return (
      <div className="h-[60vh] md:h-[90vh] bg-gray-900 animate-pulse flex items-center justify-center">
         <div className="text-white">Loading Hero...</div>
      </div>
    );
  }

  const { id, title, overview, backdrop_path, release_date, vote_average } = featuredMovie;
  const backgroundImageUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <div
      className="h-[60vh] md:h-[90vh] bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12 md:pb-24">
        <div className="max-w-xl text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {title}
          </h1>
          <div className="flex items-center space-x-4 mb-4 text-gray-300">
            <span>{release_date?.substring(0, 4)}</span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
            <span>{vote_average?.toFixed(1)}/10 IMDb</span>
          </div>
          <p className="text-gray-200 mb-8 line-clamp-3">
            {overview}
          </p>
          <div className="flex space-x-4">
            <Link 
                href={`/movie/${id}`}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 transition-colors"
            >
                Read More
            </Link>
            <button className="inline-flex items-center justify-center px-6 py-3 border border-purple-500 text-base font-medium rounded-md text-white bg-purple-600/30 hover:bg-purple-700/50 backdrop-blur-sm transition-colors">
              <PlayCircle className="mr-2 h-6 w-6" />
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
