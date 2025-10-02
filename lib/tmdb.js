 import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// خذ المفتاح من env
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!TMDB_API_KEY) {
  console.warn("⚠️ TMDB API Key is missing! Add it in .env.local");
}
console.log("TMDB API KEY =>", TMDB_API_KEY);

// Create axios instance
const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

// Image URL helpers
export const getImageUrl = (path, size = "w500") =>
  path ? `${TMDB_IMAGE_BASE_URL}/${size}${path}` : "/placeholder-movie.jpg";

export const getBackdropUrl = (path, size = "original") =>
  path ? `${TMDB_IMAGE_BASE_URL}/${size}${path}` : "/placeholder-backdrop.jpg";

// ------------------ Movie APIs ------------------ //
export const getTrendingMovies = async (page = 1) => {
  try {
    const res = await tmdbApi.get("/trending/movie/week", { params: { page } });
    return res.data;
  } catch (err) {
    console.error("Error fetching trending movies:", err);
    return { results: [], total_pages: 0 };
  }
};

export const getPopularMovies = async (page = 1) => {
  try {
    const res = await tmdbApi.get("/movie/popular", { params: { page } });
    return res.data;
  } catch (err) {
    console.error("Error fetching popular movies:", err);
    return { results: [], total_pages: 0 };
  }
};

export const getTopRatedMovies = async (page = 1) => {
  try {
    const res = await tmdbApi.get("/movie/top_rated", { params: { page } });
    return res.data;
  } catch (err) {
    console.error("Error fetching top rated movies:", err);
    return { results: [], total_pages: 0 };
  }
};

export const getUpcomingMovies = async (page = 1) => {
  try {
    const res = await tmdbApi.get("/movie/upcoming", { params: { page } });
    return res.data;
  } catch (err) {
    console.error("Error fetching upcoming movies:", err);
    return { results: [], total_pages: 0 };
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const res = await tmdbApi.get(`/movie/${movieId}`, {
      params: { append_to_response: "videos,credits,similar" },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching movie details:", err);
    return null;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const res = await tmdbApi.get("/search/multi", {
      params: { query, page, include_adult: false },
    });
    return res.data;
  } catch (err) {
    console.error("Error searching movies:", err);
    return { results: [], total_pages: 0 };
  }
};

export const searchMulti = searchMovies;

export const getMovieCredits = async (movieId) => {
  try {
    const res = await tmdbApi.get(`/movie/${movieId}/credits`);
    return res.data;
  } catch (err) {
    console.error("Error fetching movie credits:", err);
    return { cast: [], crew: [] };
  }
};

export const getSimilarMovies = async (movieId, page = 1) => {
  try {
    const res = await tmdbApi.get(`/movie/${movieId}/similar`, {
      params: { page },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching similar movies:", err);
    return { results: [], total_pages: 0 };
  }
};

export const getMovieVideos = async (movieId) => {
  try {
    const res = await tmdbApi.get(`/movie/${movieId}/videos`);
    return res.data;
  } catch (err) {
    console.error("Error fetching movie videos:", err);
    return { results: [] };
  }
};

// ------------------ TV APIs ------------------ //
export const getPopularTvShows = async (page = 1) => {
  try {
    const res = await tmdbApi.get("/tv/popular", { params: { page } });
    return res.data;
  } catch (err) {
    console.error("Error fetching popular TV shows:", err);
    return { results: [], total_pages: 0 };
  }
};

export const getTopRatedTvShows = async (page = 1) => {
  try {
    const res = await tmdbApi.get("/tv/top_rated", { params: { page } });
    return res.data;
  } catch (err) {
    console.error("Error fetching top rated TV shows:", err);
    return { results: [], total_pages: 0 };
  }
};

export const getTrendingTvShows = async (page = 1) => {
  try {
    const res = await tmdbApi.get("/trending/tv/week", { params: { page } });
    return res.data;
  } catch (err) {
    console.error("Error fetching trending TV shows:", err);
    return { results: [], total_pages: 0 };
  }
};

export const getTvShowDetails = async (tvId) => {
  try {
    const res = await tmdbApi.get(`/tv/${tvId}`, {
      params: { append_to_response: "videos,credits,similar" },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching TV show details:", err);
    return null;
  }
};

export default tmdbApi;
