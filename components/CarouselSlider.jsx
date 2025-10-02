'use client';

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import MovieCard from './MovieCard';
import Link from 'next/link';

const CarouselSlider = ({ movies, title }) => {
  // Validate movies prop
  if (!movies || !Array.isArray(movies) || movies.length === 0) {
    return null;
  }

  // Filter out invalid movie objects
  const validMovies = movies.filter(movie => 
    movie && 
    typeof movie === 'object' && 
    movie.id && 
    (movie.title || movie.name)
  );

  if (validMovies.length === 0) {
    return null;
  }

  const getChunkSize = () => {
    if (typeof window === 'undefined') return 5;
    if (window.innerWidth < 640) return 2;
    if (window.innerWidth < 768) return 3;
    if (window.innerWidth < 1024) return 4;
    return 5;
  };
  
  const [chunkSize, setChunkSize] = React.useState(getChunkSize());

  React.useEffect(() => {
    const handleResize = () => setChunkSize(getChunkSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const movieChunks = [];
  for (let i = 0; i < validMovies.length; i += chunkSize) {
    movieChunks.push(validMovies.slice(i, i + chunkSize));
  }

  // Generate category slug safely
  const categorySlug = title ? title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : '';

  return (
    <div className="py-8">
      {title && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {title}
            </h2>
            {categorySlug && (
              <Link href={`/movies/${categorySlug}`} className="text-purple-400 hover:text-purple-300 transition-colors">
                Explore All
              </Link>
            )}
          </div>
        </div>
      )}
      
      <div className="relative">
        <Carousel
          showArrows={true}
          showStatus={false}
          showIndicators={true}
          showThumbs={false}
          infiniteLoop={true}
          emulateTouch={true}
          className="movie-carousel"
        >
          {movieChunks.map((chunk, chunkIndex) => (
            <div key={chunkIndex} className="px-4 sm:px-6 lg:px-8">
              <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4`}>
                {chunk.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <style jsx global>{`
        .movie-carousel .carousel .control-arrow {
          background: rgba(17, 24, 39, 0.7);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 50%;
          transform: translateY(-50%);
          transition: all 0.3s ease;
          opacity: 0;
          z-index: 10;
        }
        .movie-carousel:hover .carousel .control-arrow {
          opacity: 1;
        }
        .movie-carousel .carousel .control-arrow:hover {
          background: rgba(17, 24, 39, 1);
        }
        .movie-carousel .carousel .control-next { right: 15px; }
        .movie-carousel .carousel .control-prev { left: 15px; }
        .movie-carousel .carousel .control-dots { margin-top: 20px; }
        .movie-carousel .carousel .control-dots .dot {
          background: #4b5563;
          box-shadow: none;
          width: 10px;
          height: 10px;
          margin: 0 5px;
          transition: all 0.3s ease;
        }
        .movie-carousel .carousel .control-dots .dot.selected {
          background: #a78bfa;
          transform: scale(1.2);
        }
        .movie-carousel .carousel .slide { background: transparent; }
      `}</style>
    </div>
  );
};

export default CarouselSlider;
