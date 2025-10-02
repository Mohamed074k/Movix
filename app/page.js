// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Hero from '@/components/Hero';
// import CarouselSlider from '@/components/CarouselSlider';
// import MovieCard from '@/components/MovieCard';
// import { getTrendingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '@/lib/tmdb';

// export default function Home() {
//   const [trendingMovies, setTrendingMovies] = useState([]);
//   const [popularMovies, setPopularMovies] = useState([]);
//   const [topRatedMovies, setTopRatedMovies] = useState([]);
//   const [upcomingMovies, setUpcomingMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const [trending, popular, topRated, upcoming] = await Promise.all([
//           getTrendingMovies(1),
//           getPopularMovies(1),
//           getTopRatedMovies(1),
//           getUpcomingMovies(1)
//         ]);

//         setTrendingMovies(trending.results || []);
//         setPopularMovies(popular.results || []);
//         setTopRatedMovies(topRated.results || []);
//         setUpcomingMovies(upcoming.results || []);
//       } catch (error) {
//         console.error('Error fetching movies:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMovies();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="text-white mt-4 text-lg">Loading MoveiHub...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black">
//       <Hero />

//       <div className="space-y-16 py-16">
//         {/* Trending Movies Section */}
//         <section>
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center justify-between mb-8">
//               <h2 className="text-2xl md:text-3xl font-bold text-white">
//                 Trending Movies
//               </h2>
//               <Link href="/movies/trending" className="text-purple-400 hover:text-purple-300 transition-colors">
//                 Explore All
//               </Link>
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
//               {trendingMovies.slice(0, 12).map((movie) => (
//                 <MovieCard key={movie.id} movie={movie} />
//               ))}
//             </div>
//           </div>
//         </section>

//         <CarouselSlider 
//           movies={popularMovies.map(m => ({...m, media_type: 'movie'}))}
//           title="Popular Movies" 
//         />
        
//         <section>
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center justify-between mb-8">
//               <h2 className="text-2xl md:text-3xl font-bold text-white">
//                 Top Rated Movies
//               </h2>
//                <Link href="/movies/top-rated" className="text-purple-400 hover:text-purple-300 transition-colors">
//                 Explore All
//               </Link>
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
//               {topRatedMovies.slice(0, 12).map((movie) => (
//                 <MovieCard key={movie.id} movie={movie} />
//               ))}
//             </div>
//           </div>
//         </section>

//         <CarouselSlider 
//           movies={upcomingMovies.map(m => ({...m, media_type: 'movie'}))}
//           title="Upcoming Movies"
//         />
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-900/50 mt-16 py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <div className="flex items-center justify-center space-x-2 mb-4">
//               <span className="text-white font-bold text-xl">
//                 Movei<span className="text-purple-400">Hub</span>
//               </span>
//             </div>
//             <p className="text-gray-400 text-sm">
//               © 2024 MoveiHub. All rights reserved.
//             </p>
//             <p className="text-gray-500 text-xs mt-2">
//               This product uses the TMDB API but is not endorsed or certified by TMDB.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import CarouselSlider from '@/components/CarouselSlider';
import MovieCard from '@/components/MovieCard';
import Loader from '@/components/Loader';
import Footer from '@/components/Footer';
import { getTrendingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '@/lib/tmdb';

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trending, popular, topRated, upcoming] = await Promise.all([
          getTrendingMovies(1),
          getPopularMovies(1),
          getTopRatedMovies(1),
          getUpcomingMovies(1)
        ]);

        setTrendingMovies(trending.results || []);
        setPopularMovies(popular.results || []);
        setTopRatedMovies(topRated.results || []);
        setUpcomingMovies(upcoming.results || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        // Add a minimum loading time for smooth experience
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    fetchMovies();
  }, []);

  // Add scroll reveal animation
  useEffect(() => {
    if (!isLoading) {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      const sections = document.querySelectorAll('.scroll-reveal');
      sections.forEach(section => observer.observe(section));

      return () => observer.disconnect();
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-black">
      <Hero />

      <div className="space-y-16 py-16">
        {/* Trending Movies Section */}
        <section className="scroll-reveal opacity-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Trending Movies
              </h2>
              <Link href="/movies/trending" className="text-purple-400 hover:text-purple-300 transition-colors">
                Explore All
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {trendingMovies.slice(0, 12).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </section>

        <div className="scroll-reveal opacity-0">
          <CarouselSlider 
            movies={popularMovies.map(m => ({...m, media_type: 'movie'}))}
            title="Popular Movies" 
          />
        </div>
        
        <section className="scroll-reveal opacity-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Top Rated Movies
              </h2>
               <Link href="/movies/top-rated" className="text-purple-400 hover:text-purple-300 transition-colors">
                Explore All
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {topRatedMovies.slice(0, 12).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </section>

        <div className="scroll-reveal opacity-0">
          <CarouselSlider 
            movies={upcomingMovies.map(m => ({...m, media_type: 'movie'}))}
            title="Upcoming Movies"
          />
        </div>
      </div>
{!isLoading && <Footer />}

 
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .scroll-reveal {
          transition: opacity 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
