// 'use client';

// import { useState } from 'react';
// import { Search, Menu, X } from 'lucide-react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const pathname = usePathname();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
//     }
//   };

//   const navLinks = [
//     { href: '/', label: 'Home' },
//     { href: '/movies', label: 'Movies' },
//     { href: '/tv-shows', label: 'TV Shows' },
//   ];

//   return (
//     <>
//       <nav className="bg-black/30 backdrop-blur-md fixed w-full z-50 top-0">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             {/* Logo */}
//             <Link href="/" className="flex-shrink-0">
//               <span className="text-white font-bold text-2xl tracking-wider">
//                 Movi<span className="text-purple-400">x</span>
//               </span>
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-8">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className={`transition-colors text-lg relative ${
//                     pathname === link.href
//                       ? 'text-purple-400'
//                       : 'text-gray-300 hover:text-purple-400'
//                   }`}
//                 >
//                   {link.label}
//                   {pathname === link.href && (
//                      <span className="absolute left-0 -bottom-2 h-0.5 w-full bg-purple-400"></span>
//                   )}
//                 </Link>
//               ))}
//             </div>

//             {/* Search and Mobile Menu */}
//             <div className="flex items-center space-x-4">
//                {/* Desktop Search */}
//               <div className="hidden md:flex items-center">
//                 <form onSubmit={handleSearch} className="w-full">
//                   <div className="relative">
//                     <input
//                       type="text"
//                       placeholder="Search..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="w-full bg-transparent text-white placeholder-gray-400 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all"
//                     />
//                     <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                   </div>
//                 </form>
//               </div>

//               {/* Mobile Buttons */}
//               <div className="md:hidden flex items-center space-x-2">
//                  <button onClick={() => setIsMobileSearchOpen(true)} className="text-gray-300 hover:text-white p-2">
//                    <Search className="h-6 w-6" />
//                  </button>
//                  <button
//                   onClick={() => setIsMenuOpen(!isMenuOpen)}
//                   className="text-gray-300 hover:text-white p-2"
//                 >
//                   {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Mobile Navigation Menu */}
//           {isMenuOpen && (
//             <div className="md:hidden">
//               <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-sm">
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.href}
//                     href={link.href}
//                     className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
//                       pathname === link.href
//                         ? 'bg-purple-500 text-white'
//                         : 'text-gray-300 hover:bg-gray-700 hover:text-white'
//                     }`}
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     {link.label}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Mobile Search Overlay */}
//       {isMobileSearchOpen && (
//         <div className="md:hidden fixed inset-0 bg-black/90 z-50 p-4 animate-fade-in">
//            <div className="flex items-center justify-between mb-4">
//              <span className="text-white font-bold text-2xl tracking-wider">
//                 Movi<span className="text-purple-400">x</span>
//               </span>
//              <button onClick={() => setIsMobileSearchOpen(false)} className="text-gray-300 hover:text-white p-2">
//                <X className="h-6 w-6" />
//              </button>
//            </div>
//           <form onSubmit={handleSearch}>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search for movies, tv shows or people"
//                 autoFocus
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg pl-12 pr-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//               <Search className="absolute left-4 top-3.5 h-6 w-6 text-gray-400" />
//             </div>
//           </form>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;


'use client';

import { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    if (href === '/movies') return pathname.startsWith('/movies') || pathname.startsWith('/movie/');
    if (href === '/tv-shows') return pathname.startsWith('/tv-shows') || pathname.startsWith('/tv/');
    return false;
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/movies', label: 'Movies' },
    { href: '/tv-shows', label: 'TV Shows' },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 top-0 transition-all duration-300 ${
        isScrolled ? 'bg-black/30 backdrop-blur-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="text-white font-bold text-2xl tracking-wider">
                Movi<span className="text-purple-400">x</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors text-lg relative ${
                    isActive(link.href)
                      ? 'text-purple-400'
                      : 'text-gray-300 hover:text-purple-400'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                     <span className="absolute left-0 -bottom-2 h-0.5 w-full bg-purple-400"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Search and Mobile Menu */}
            <div className="flex items-center space-x-4">
               {/* Desktop Search */}
              <div className="hidden md:flex items-center">
                <form onSubmit={handleSearch} className="w-full">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-white placeholder-gray-400 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </form>
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
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-sm">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(link.href)
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="md:hidden fixed inset-0 bg-black/90 z-50 p-4 animate-fade-in">
           <div className="flex items-center justify-between mb-4">
             <span className="text-white font-bold text-2xl tracking-wider">
                Movi<span className="text-purple-400">x</span>
              </span>
             <button onClick={() => setIsMobileSearchOpen(false)} className="text-gray-300 hover:text-white p-2">
               <X className="h-6 w-6" />
             </button>
           </div>
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for movies, tv shows or people"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg pl-12 pr-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-4 top-3.5 h-6 w-6 text-gray-400" />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Navbar;

