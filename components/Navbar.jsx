'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, Film, Tv } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { searchMulti } from '@/lib/tmdb';
import Image from 'next/image';

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w200'; // Adjust size as needed

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Debounced live search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const handler = setTimeout(async () => {
      setIsSearching(true);
      try {
        const data = await searchMulti(searchQuery.trim());
        const filtered = data.results?.filter(
          (item) => (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path
        ) || [];
        setSearchResults(filtered.slice(0, 6)); // Limit to 6 results for cleaner UI
        setShowDropdown(true);
      } catch (err) {
        console.error('Live search error:', err);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleResultClick = (item) => {
    setSearchQuery('');
    setShowDropdown(false);
    setIsMobileSearchOpen(false);
    if (item.media_type === 'movie') {
      router.push(`/movie/${item.id}`);
    } else if (item.media_type === 'tv') {
      router.push(`/tv/${item.id}`);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
      setIsMobileSearchOpen(false);
    }
  };

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    if (href === '/movies') return pathname.startsWith('/movies') || pathname.startsWith('/movie/');
    if (href === '/tv-shows') return pathname.startsWith('/tv-shows') || pathname.startsWith('/tv/');
    return false;
  };

  const navLinks = [
    { href: '/', label: 'Home', icon: null },
    { href: '/movies', label: 'Movies', icon: Film },
    { href: '/tv-shows', label: 'TV Shows', icon: Tv },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 top-0 transition-all duration-300 ${
        isScrolled ? 'bg-black/30 backdrop-blur-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" onClick={() => setShowDropdown(false)}>
              <span className="text-white font-bold text-2xl tracking-wider">
                Movi<span className="text-purple-400">x</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors text-lg relative flex items-center gap-2 ${
                      isActive(link.href)
                        ? 'text-purple-400'
                        : 'text-gray-300 hover:text-purple-400'
                    }`}
                    onClick={() => setShowDropdown(false)}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                    {link.label}
                    {isActive(link.href) && (
                      <span className="absolute left-0 -bottom-2 h-0.5 w-full bg-purple-400"></span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Search and Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Desktop Search with Live Results */}
              <div className="hidden md:flex items-center relative" ref={dropdownRef}>
                <form onSubmit={handleSearchSubmit} className="w-full">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search movies or TV shows..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => searchQuery && setShowDropdown(true)}
                      className="search-input w-full bg-transparent text-white placeholder-gray-400 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </form>

                {/* Live Search Dropdown with Images */}
                {showDropdown && (
                  <div className="absolute top-full mt-2 w-full bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto border border-gray-700">
                    {isSearching ? (
                      <div className="flex justify-center py-4">
                        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <ul>
                        {searchResults.map((item) => (
                          <li key={item.id}>
                            <button
                              onClick={() => handleResultClick(item)}
                              className="w-full text-left px-3 py-2 hover:bg-gray-800 transition-colors flex items-center gap-3"
                            >
                              <div className="relative w-12 h-16 flex-shrink-0 rounded overflow-hidden">
                                <Image
                                  src={`${POSTER_BASE_URL}${item.poster_path}`}
                                  alt={item.title || item.name}
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                />
                              </div>
                              <span className="text-white truncate font-medium">
                                {item.title || item.name}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="px-4 py-3 text-gray-400">No results found.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Buttons */}
              <div className="md:hidden flex items-center space-x-2">
                <button onClick={() => setIsMobileSearchOpen(true)} className="text-gray-300 hover:text-white p-2">
                  <Search className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-300 hover:text-white p-2"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden mobile-menu-enter">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-sm rounded-b-lg">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                        isActive(link.href)
                          ? 'bg-purple-500 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Search Overlay with Image Results */}
      {isMobileSearchOpen && (
        <div className="md:hidden fixed inset-0 bg-black/90 z-50 p-4 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-bold text-2xl tracking-wider">
              Movi<span className="text-purple-400">x</span>
            </span>
            <button onClick={() => setIsMobileSearchOpen(false)} className="text-gray-300 hover:text-white p-2 transition-all duration-200 hover:rotate-90">
              <X className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for movies or TV shows..."
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg pl-12 pr-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-4 top-3.5 h-6 w-6 text-gray-400" />
            </div>

            {/* Mobile Live Results with Images */}
            {searchQuery && (
              <div className="mt-4 bg-gray-800 rounded-lg max-h-96 overflow-y-auto">
                {isSearching ? (
                  <div className="flex justify-center py-4">
                    <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => handleResultClick(item)}
                          className="w-full text-left px-3 py-3 hover:bg-gray-700 transition-colors flex items-center gap-3"
                        >
                          <div className="relative w-12 h-16 flex-shrink-0 rounded overflow-hidden">
                            <Image
                              src={`${POSTER_BASE_URL}${item.poster_path}`}
                              alt={item.title || item.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <span className="text-white font-medium">
                            {item.title || item.name}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-3 text-gray-400">No results found.</p>
                )}
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default Navbar;