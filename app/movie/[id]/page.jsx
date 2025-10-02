'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  Star, 
  Calendar, 
  Clock, 
  Play, 
  ArrowLeft, 
  Heart,
  Share2,
  Users,
  Film,
  PlayCircle
} from 'lucide-react';
import Link from 'next/link';
import { getMovieDetails, getImageUrl, getBackdropUrl, getMovieCredits, getSimilarMovies, getMovieVideos } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';
import CarouselSlider from '@/components/CarouselSlider';

export default function MovieDetail() {
  const params = useParams();
  const movieId = params?.id;
  
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      if (!movieId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const [movieData, creditsData, similarData, videosData] = await Promise.all([
          getMovieDetails(movieId),
          getMovieCredits(movieId),
          getSimilarMovies(movieId),
          getMovieVideos(movieId)
        ]);
        
        if (!movieData) {
          throw new Error('Movie not found');
        }
        
        setMovie(movieData);
        setCredits(creditsData);
        setSimilarMovies(similarData.results || []);
        setVideos(videosData.results || []);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
        setError('Failed to load movie details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [movieId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Movie Not Found</h1>
          <p className="text-gray-400 mb-6">{error || 'The movie you are looking for does not exist.'}</p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  const {
    title,
    name,
    backdrop_path,
    poster_path,
    vote_average,
    vote_count,
    release_date,
    first_air_date,
    runtime,
    episode_run_time,
    overview,
    genres,
    production_companies,
    budget,
    revenue,
    status,
    tagline,
    credits: movieCredits,
    videos: movieVideos,
    similar
  } = movie;

  const displayTitle = title || name;
  const displayDate = release_date || first_air_date;
  const year = displayDate ? new Date(displayDate).getFullYear() : '';
  const displayRuntime = runtime || (episode_run_time && episode_run_time[0]);
  const trailer = movieVideos?.results?.find(video => video.type === 'Trailer');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Backdrop */}
      <div className="relative h-[40vh] md:h-[60vh]">
        <img
          src={getBackdropUrl(backdrop_path, 'original')}
          alt={displayTitle}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/placeholder-backdrop.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        
        {/* Back Button */}
        <div className="absolute top-20 left-4 z-10">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-32 relative z-10">
        <div className="md:flex md:space-x-8">
          {/* Poster */}
          <div className="flex-shrink-0 w-1/3 md:w-1/4 -mt-16 md:-mt-24">
            <img
              src={getImageUrl(poster_path, 'w500')}
              alt={displayTitle}
              className="rounded-lg shadow-2xl w-full"
              onError={(e) => {
                e.target.src = '/placeholder-movie.jpg';
              }}
            />
          </div>

          {/* Details */}
          <div className="mt-4 md:mt-0 pt-4 md:pt-28 flex-grow">
            <h1 className="text-3xl md:text-5xl font-bold">{displayTitle}</h1>
            <p className="text-gray-400 mt-1">{tagline}</p>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-300">
              <span className="flex items-center"><Star className="mr-2 text-yellow-400" /> {vote_average?.toFixed(1)}/10</span>
              <span className="flex items-center"><Calendar className="mr-2" /> {year}</span>
              <span className="flex items-center"><Clock className="mr-2" /> {displayRuntime} min</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {genres && genres.map(genre => (
                <span key={genre.id} className="px-3 py-1 bg-purple-600/50 text-purple-200 text-xs font-semibold rounded-full">
                  {genre.name}
                </span>
              ))}
            </div>
            {trailer && (
              <a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 mt-6 border border-transparent text-lg font-medium rounded-md text-black bg-white hover:bg-gray-200 transition-colors">
                <PlayCircle className="mr-2 h-6 w-6" />
                Watch Trailer
              </a>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`${activeTab === 'overview' ? 'border-purple-400 text-purple-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('cast')}
                className={`${activeTab === 'cast' ? 'border-purple-400 text-purple-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors`}
              >
                Cast
              </button>
              <button
                onClick={() => setActiveTab('similar')}
                className={`${activeTab === 'similar' ? 'border-purple-400 text-purple-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors`}
              >
                More Like This
              </button>
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'overview' && (
              <div className="prose prose-invert max-w-none text-gray-300">
                <p>{overview || 'No overview available.'}</p>
              </div>
            )}
            {activeTab === 'cast' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {credits && credits.cast && credits.cast.slice(0, 18).map(person => (
                  <div key={person.id} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gray-700 flex items-center justify-center">
                      {person.profile_path ? (
                        <img 
                          src={getImageUrl(person.profile_path, 'w185')} 
                          alt={person.name} 
                          className="w-full h-full rounded-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      {!person.profile_path && (
                        <Users className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <p className="font-semibold text-sm">{person.name}</p>
                    <p className="text-xs text-gray-400">{person.character}</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'similar' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {similarMovies.map(m => (
                  <MovieCard key={m.id} movie={m} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
