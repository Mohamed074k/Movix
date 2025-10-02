'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies, getTrendingMovies } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';
import Pagination from '@/components/Pagination';

const CategoryPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const category = params?.category;
  const page = searchParams?.get('page') || 1;
  
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setCurrentPage(parseInt(page));
  }, [page]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!category) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        let data;
        let pageTitle = '';

        const categoryMap = {
          popular: { fetch: getPopularMovies, title: 'Popular Movies' },
          'top-rated': { fetch: getTopRatedMovies, title: 'Top Rated Movies' },
          upcoming: { fetch: getUpcomingMovies, title: 'Upcoming Movies' },
          trending: { fetch: getTrendingMovies, title: 'Trending Movies' },
        };

        const selectedCategory = categoryMap[category];

        if (selectedCategory) {
          data = await selectedCategory.fetch(currentPage);
          pageTitle = selectedCategory.title;
        } else {
          // Handle invalid category
          data = await getPopularMovies(currentPage);
          pageTitle = 'Popular Movies';
        }

        if (data) {
          setMovies(data.results || []);
          setTotalPages(data.total_pages || 1);
        }
        setTitle(pageTitle);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies');
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [category, currentPage]);

  const handlePageChange = (newPage) => {
    const url = new URL(window.location);
    url.searchParams.set('page', newPage.toString());
    window.history.pushState({}, '', url);
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Error Loading Movies</h1>
            <p className="text-gray-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">{title}</h1>
        {movies.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400">No movies found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage; 