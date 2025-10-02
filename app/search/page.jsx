'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchMulti } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
          const data = await searchMulti(query);
          // Filter out people from the search results, only show movies and tv shows
          const filteredResults = data.results?.filter(item => 
            item.media_type === 'movie' || item.media_type === 'tv'
          ) || [];
          setResults(filteredResults);
        } catch (err) {
          console.error('Error searching:', err);
          setError('Failed to search. Please try again.');
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchResults();
    } else {
      setResults([]);
      setError(null);
    }
  }, [query]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-white mb-4">Search Error</h1>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">
        Search results for: <span className="text-purple-400">{query}</span>
      </h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {results.map(item => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
      ) : (
        !isLoading && query && <p className="text-gray-400">No results found for "{query}".</p>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <Suspense fallback={<div className="flex items-center justify-center py-16"><div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div></div>}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
} 