const Footer = () => {
  return (
    <footer className="bg-gray-900/50 mt-16 py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-white font-bold text-xl">
              Movei<span className="text-purple-400">Hub</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © 2024 MoveiHub. All rights reserved.
          </p>

          {/* Made by */}
          <p className="text-gray-400 text-sm">
            Made with <span className="text-red-500">♥</span> by{' '}
<a href="https://protfolio-v2-aa25.vercel.app/">          
      <span className="text-purple-400 font-semibold ">Mohamed Elsayed</span>
</a>          </p>

          {/* TMDB Attribution */}
          <p className="text-gray-500 text-xs mt-2">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;