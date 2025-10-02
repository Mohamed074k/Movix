// import { Film } from 'lucide-react';

// const Loader = () => {
//   return (
//     <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
//       {/* Animated background gradient */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-900/20 animate-pulse"></div>
      
//       {/* Main loader content */}
//       <div className="relative z-10 flex flex-col items-center space-y-8">
//         {/* Animated film icon */}
//         <div className="relative">
//           <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-2xl animate-ping"></div>
//           <div className="relative bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-full animate-bounce">
//             <Film className="h-12 w-12 text-white" />
//           </div>
//         </div>

//         {/* Logo with animation */}
//         <div className="flex flex-col items-center space-y-4">
//           <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wider animate-fade-in">
//             Movi<span className="text-purple-400">x</span>
//           </h1>
          
//           {/* Loading bar */}
//           <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
//             <div className="h-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 rounded-full animate-loading-bar"></div>
//           </div>
          
//           <p className="text-gray-400 text-sm animate-pulse">Loading your entertainment...</p>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes loading-bar {
//           0% {
//             transform: translateX(-100%);
//           }
//           100% {
//             transform: translateX(100%);
//           }
//         }
        
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-loading-bar {
//           animation: loading-bar 1.5s ease-in-out infinite;
//         }
        
//         .animate-fade-in {
//           animation: fade-in 0.6s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Loader;


import { Popcorn } from 'lucide-react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-900/20 animate-pulse"></div>
      
      {/* Main loader content */}
      <div className="relative z-10 flex flex-col items-center space-y-10">
        {/* Icon with rotating ring */}
        <div className="relative">
          {/* Rotating ring */}
          <div className="absolute inset-0 w-28 h-28 rounded-full border-4 border-transparent border-t-purple-500 border-r-purple-400 animate-spin"></div>
          
          {/* Icon container */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-5 rounded-full shadow-2xl shadow-purple-500/50">
              <Popcorn className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center space-y-5">
          <h1 className="text-5xl md:text-6xl font-bold tracking-wider">
            <span className="text-white">Movi</span>
            <span className="text-purple-400">x</span>
          </h1>
          
          {/* Loading bar */}
          <div className="w-56 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 rounded-full animate-loading"></div>
          </div>
          
          {/* Loading text */}
          <p className="text-gray-400 text-sm font-medium">
            Loading<span className="animate-dots"></span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-loading {
          animation: loading 1.5s ease-in-out infinite;
        }

        @keyframes dots {
          0%, 20% { content: '.'; }
          40% { content: '..'; }
          60%, 100% { content: '...'; }
        }

        .animate-dots::after {
          content: '...';
          animation: dots 1.5s steps(3, end) infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;