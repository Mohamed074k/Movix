'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
import { getTvShowDetails, getImageUrl, getBackdropUrl } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';
import CarouselSlider from '@/components/CarouselSlider';

export default function TvShowDetail() {
  const params = useParams();
  const router = useRouter();
  const tvId = params.id;
  
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        setIsLoading(true);
        const data = await getTvShowDetails(tvId);
        if (data) {
          setShow(data);
        } else {
          setError('TV show not found');
        }
      } catch (error) {
        console.error('Error fetching TV show details:', error);
        setError('Failed to load TV show details');
      } finally {
        setIsLoading(false);
      }
    };

    if (tvId) {
      fetchShowDetails();
    }
  }, [tvId]);

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsTransitioning(false);
    }, 200);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
   if (error || !show) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">TV Show Not Found</h1>
          <p className="text-gray-400 mb-6">{error || 'The TV show you are looking for does not exist.'}</p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  const {
    name,
    backdrop_path,
    poster_path,
    vote_average,
    vote_count,
    first_air_date,
    episode_run_time,
    overview,
    genres,
    production_companies,
    status,
    tagline,
    credits,
    videos,
    similar,
    number_of_seasons,
    number_of_episodes,
  } = show;

  const displayTitle = name;
  const year = first_air_date ? new Date(first_air_date).getFullYear() : '';
  const displayRuntime = episode_run_time && episode_run_time[0];
  const trailer = videos?.results?.find(video => video.type === 'Trailer');

  return (
    <div className="min-h-screen bg-black">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        .tab-content-enter {
          animation: fadeInUp 0.4s ease-out forwards;
        }
        .tab-content-exit {
          animation: fadeOut 0.2s ease-out forwards;
        }
      `}</style>

      {/* Backdrop */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={getBackdropUrl(backdrop_path, 'original')}
          alt={displayTitle}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/placeholder-backdrop.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        <div className="absolute top-20 left-4 z-10">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center space-x-2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:px-5 active:scale-95"
          >
            <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 -mt-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Poster */}
            <div className="md:col-span-1">
              <div className="relative">
                <img
                  src={getImageUrl(poster_path, 'w500')}
                  alt={displayTitle}
                  className="w-full rounded-lg shadow-2xl aspect-[2/3] object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder-movie.jpg';
                  }}
                />
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-2 lg:col-span-3 space-y-6 pt-16 md:pt-0">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {displayTitle}
                </h1>
                
                {tagline && (
                  <p className="text-xl text-gray-400 italic">
                    "{tagline}"
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-300">
                  {vote_average > 0 && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold">{vote_average.toFixed(1)}</span>
                      <span className="text-sm">({vote_count?.toLocaleString()} votes)</span>
                    </div>
                  )}
                  
                  {year && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{year}</span>
                    </div>
                  )}
                  
                  {displayRuntime && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{displayRuntime} min/episode</span>
                    </div>
                  )}

                  {status && (
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                      {status}
                    </span>
                  )}
                </div>

                {genres && (
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm border border-purple-600/30"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {trailer && (
                  <a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95">
                    <Play className="h-5 w-5" />
                    <span>Watch Trailer</span>
                  </a>
                )}
                
                <button className="inline-flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-700/50 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm hover:scale-105 active:scale-95">
                  <Heart className="h-5 w-5" />
                  <span>Add to Watchlist</span>
                </button>

                <button className="inline-flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-700/50 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm hover:scale-105 active:scale-95">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-700">
                <nav className="flex space-x-8">
                  {['overview', 'cast', 'details'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition-all duration-300 ${
                        activeTab === tab
                          ? 'border-purple-500 text-purple-400'
                          : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="py-6 min-h-[300px]">
                <div className={isTransitioning ? 'tab-content-exit' : 'tab-content-enter'}>
                  {activeTab === 'overview' && !isTransitioning && (
                    <div className="space-y-6">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {overview || 'No overview available.'}
                      </p>
                    </div>
                  )}

                  {activeTab === 'cast' && !isTransitioning && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Cast</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {credits?.cast?.slice(0, 10).map((person) => (
                          <div key={person.id} className="text-center">
                            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gray-700 flex items-center justify-center">
                              {person.profile_path ? (
                                <img
                                  src={getImageUrl(person.profile_path, 'w185')}
                                  alt={person.name}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <Users className="h-8 w-8 text-gray-400" />
                              )}
                            </div>
                            <p className="text-sm font-medium text-white">{person.name}</p>
                            <p className="text-xs text-gray-400">{person.character}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'details' && !isTransitioning && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-3">Show Information</h3>
                          <div className="space-y-2 text-gray-300">
                            <div className="flex justify-between">
                              <span>Status:</span>
                              <span>{status}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>First Air Date:</span>
                              <span>{first_air_date}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Seasons:</span>
                              <span>{number_of_seasons}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Episodes:</span>
                              <span>{number_of_episodes}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Runtime:</span>
                              <span>{displayRuntime} min/episode</span>
                            </div>
                          </div>
                        </div>
                        
                        {production_companies && production_companies.length > 0 && (
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-3">Production Companies</h3>
                            <div className="space-y-2">
                              {production_companies.map((company) => (
                                <div key={company.id} className="flex items-center space-x-2">
                                  {company.logo_path && (
                                    <img
                                      src={getImageUrl(company.logo_path, 'w92')}
                                      alt={company.name}
                                      className="h-6 object-contain"
                                    />
                                  )}
                                  <span className="text-gray-300">{company.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {similar?.results && similar.results.length > 0 && (
            <section className="mt-16">
              <CarouselSlider movies={similar.results.map(m => ({...m, media_type: 'tv'}))} title="Similar Shows" />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}