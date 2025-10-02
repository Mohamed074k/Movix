'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TvShowsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/tv-shows/popular');
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