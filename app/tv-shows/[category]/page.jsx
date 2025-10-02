'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { getPopularTvShows, getTopRatedTvShows, getTrendingTvShows } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';
import Pagination from '@/components/Pagination';

const categoryFetchers = {
  popular: getPopularTvShows,
  'top-rated': getTopRatedTvShows,
  trending: getTrendingTvShows,
};

const categoryTitles = {
  popular: 'Popular TV Shows',
  'top-rated': 'Top Rated TV Shows',
  trending: 'Trending TV Shows',
}

function CategoryPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const category = params?.category;
  const page = searchParams?.get('page') || 1;
  
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  const title = categoryTitles[category] || 'TV Shows';
  const fetcher = categoryFetchers[category] || getPopularTvShows;

  useEffect(() => {
    setCurrentPage(parseInt(page));
  }, [page]);

  useEffect(() => {
    const fetchData = async () => {
      if (!category) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetcher(currentPage);
        setItems(data.results || []);
        setTotalPages(data.total_pages || 0);
      } catch (error) {
        console.error(`Error fetching ${category} TV shows:`, error);
        setError(`Failed to load ${category} TV shows`);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category, currentPage, fetcher]);

  const handlePageChange = (newPage) => {
    const url = new URL(window.location);
    url.searchParams.set('page', newPage.toString());
    window.history.pushState({}, '', url);
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-white mb-4">Error Loading TV Shows</h1>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }
  
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">{title}</h1>
      
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded-lg bg-gray-800 animate-pulse aspect-[2/3]"></div>
          ))}
        </div>
      ) : items.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {items.map((show) => (
              <MovieCard key={show.id} movie={{...show, media_type: 'tv'}} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400">No TV shows found for this category.</p>
        </div>
      )}
    </>
  );
}

export default function TvShowsCategoryPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <Suspense fallback={<div className="flex items-center justify-center py-16"><div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div></div>}>
          <CategoryPageContent />
        </Suspense>
      </div>
    </div>
  );
} 