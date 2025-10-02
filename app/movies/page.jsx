'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MoviesPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/movies/popular');
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-white mt-4 text-lg">Redirecting...</p>
      </div>
    </div>
  );
} 