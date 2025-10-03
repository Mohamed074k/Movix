'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getTrendingMovies } from '@/lib/tmdb';
import { PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch trending movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTrendingMovies();
        if (data.results && data.results.length > 0) {
          setMovies(data.results.slice(0, 5)); // Limit to 5 for performance
        }
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Auto-advance every 3 seconds (only if more than 1 movie)
  useEffect(() => {
    if (movies.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % movies.length);
      setTimeout(() => setIsAnimating(false), 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  const nextSlide = useCallback(() => {
    if (isAnimating || movies.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % movies.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, movies.length]);

  const prevSlide = useCallback(() => {
    if (isAnimating || movies.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, movies.length]);

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (isLoading || movies.length === 0) {
    return (
      <div className="h-[60vh] md:h-[90vh] bg-transparent animate-pulse flex items-center justify-center">
      </div>
    );
  }

  const currentItem = movies[currentIndex];
  const { id, title, overview, backdrop_path, release_date, vote_average } = currentItem;

  // Fixed: no extra space in image URL
  const backgroundImageUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <div className="relative h-[60vh] md:h-[90vh] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12 md:pb-24">
        <div 
          key={currentIndex}
          className="max-w-xl text-white animate-[slideUp_0.6s_ease-out]"
          style={{
            animation: 'slideUp 0.6s ease-out'
          }}
        >
          <style jsx>{`
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
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
        </div>
          <div className="flex space-x-4">
            <Link 
              href={`/movie/${id}`}
              className="hero-btn-primary inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-200"
            >
              Read More
            </Link>
            <button className="hero-btn-secondary inline-flex items-center justify-center px-6 py-3 border border-purple-500 text-base font-medium rounded-md text-white bg-purple-600/30 hover:bg-purple-700/50 backdrop-blur-sm">
              <PlayCircle className="mr-2 h-6 w-6" />
              Watch Trailer
            </button>
          </div>
      </div>

      {/* Navigation Arrows - Hidden on mobile */}
      {movies.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 items-center justify-center text-white transition-all"
            aria-label="Previous movie"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 items-center justify-center text-white transition-all"
            aria-label="Next movie"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {movies.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${
                index === currentIndex ? 'w-8 bg-purple-500' : 'w-3 bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;

// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import Link from 'next/link';
// import { getTrendingMovies } from '@/lib/tmdb';
// import { PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';

// const Hero = () => {
//   const [movies, setMovies] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch trending movies
//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const data = await getTrendingMovies();
//         if (data.results && data.results.length > 0) {
//           setMovies(data.results.slice(0, 5)); // Limit to 5 for performance
//         }
//       } catch (error) {
//         console.error('Error fetching trending movies:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMovies();
//   }, []);

//   // Auto-advance every 8 seconds (only if more than 1 movie)
//   useEffect(() => {
//     if (movies.length <= 1) return;

//     const interval = setInterval(() => {
//       nextSlide();
//     }, 8000);

//     return () => clearInterval(interval);
//   }, [currentIndex, movies.length]);

//   const nextSlide = useCallback(() => {
//     if (isAnimating || movies.length <= 1) return;
//     setIsAnimating(true);
//     setCurrentIndex((prev) => (prev + 1) % movies.length);
//     setTimeout(() => setIsAnimating(false), 500);
//   }, [isAnimating, movies.length]);

//   const prevSlide = useCallback(() => {
//     if (isAnimating || movies.length <= 1) return;
//     setIsAnimating(true);
//     setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
//     setTimeout(() => setIsAnimating(false), 500);
//   }, [isAnimating, movies.length]);

//   const goToSlide = (index) => {
//     if (isAnimating || index === currentIndex) return;
//     setIsAnimating(true);
//     setCurrentIndex(index);
//     setTimeout(() => setIsAnimating(false), 500);
//   };

//   if (isLoading || movies.length === 0) {
//     return (
//       <div className="h-[60vh] md:h-[90vh] bg-transparent animate-pulse flex items-center justify-center">
//       </div>
//     );
//   }

//   const currentItem = movies[currentIndex];
//   const { id, title, overview, backdrop_path, release_date, vote_average } = currentItem;

//   // Fixed: no extra space in image URL
//   const backgroundImageUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;

//   return (
//     <div className="relative h-[60vh] md:h-[90vh] overflow-hidden">
//       {/* Background */}
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out"
//         style={{ backgroundImage: `url(${backgroundImageUrl})` }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
//         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent"></div>
//       </div>

//       {/* Content */}
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12 md:pb-24">
//         <div className="max-w-xl text-white animate-[fadeIn_0.5s_ease-in-out]">
//           <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
//             {title}
//           </h1>
//           <div className="flex items-center space-x-4 mb-4 text-gray-300">
//             <span>{release_date?.substring(0, 4)}</span>
//             <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
//             <span>{vote_average?.toFixed(1)}/10 IMDb</span>
//           </div>
//           <p className="text-gray-200 mb-8 line-clamp-3">
//             {overview}
//           </p>
//           <div className="flex space-x-4">
//             <Link 
//               href={`/movie/${id}`}
//               className="hero-btn-primary inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-200"
//             >
//               Read More
//             </Link>
//             <button className="hero-btn-secondary inline-flex items-center justify-center px-6 py-3 border border-purple-500 text-base font-medium rounded-md text-white bg-purple-600/30 hover:bg-purple-700/50 backdrop-blur-sm">
//               <PlayCircle className="mr-2 h-6 w-6" />
//               Watch Trailer
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Arrows */}
//       {movies.length > 1 && (
//         <>
//           <button
//             onClick={prevSlide}
//             className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-opacity"
//             aria-label="Previous movie"
//           >
//             <ChevronLeft className="h-8 w-8" />
//           </button>
//           <button
//             onClick={nextSlide}
//             className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-opacity"
//             aria-label="Next movie"
//           >
//             <ChevronRight className="h-8 w-8" />
//           </button>
//         </>
//       )}

//       {/* Slide Indicators */}
//       {movies.length > 1 && (
//         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//           {movies.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`h-1.5 rounded-full transition-all ${
//                 index === currentIndex ? 'w-8 bg-purple-500' : 'w-3 bg-gray-300'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Hero;