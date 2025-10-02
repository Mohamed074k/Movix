# 🎬 MoveiHub - Movie Streaming Website

A modern, responsive movie streaming website built with Next.js, featuring real-time data from TMDB API.

## ✨ Features

- 🎥 **Real-time Movie Data** - Powered by TMDB API
- 🎨 **Modern Dark UI** - Beautiful dark theme with purple accents
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- 🔍 **Advanced Search** - Search movies, TV shows, and people
- 🎭 **Movie Details** - Comprehensive movie information with cast, trailers, and similar movies
- 🎠 **Carousel Sliders** - Smooth carousel for movie collections
- 📄 **Pagination** - Navigate through large collections
- ⚡ **Fast Performance** - Optimized for speed and SEO
- 🤖 **MoveiBot AI Assistant** - Chatbot AI for movie recommendations

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Carousel**: React Responsive Carousel
- **Pagination**: React Paginate
- **API**: TMDB (The Movie Database)
- **AI Chatbot**: OpenAI GPT-3.5 Turbo

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- TMDB API Key
- OpenAI API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MoveiHub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```
   
   To get your TMDB API key:
   1. Go to [TMDB](https://www.themoviedb.org/)
   2. Create an account or sign in
   3. Go to Settings → API
   4. Request an API key
   5. Copy the API key to your `.env.local` file

   To get your OpenAI API key:
   1. Go to [OpenAI](https://platform.openai.com/)
   2. Create an account or sign in
   3. Go to API keys
   4. Request an API key
   5. Copy the API key to your `.env.local` file

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
MoveiHub/
├── app/
│   ├── layout.js              # Root layout with Navbar
│   ├── page.js                # Home page
│   ├── globals.css            # Global styles
│   ├── movie/
│   │   └── [id]/
│   │       └── page.jsx       # Movie detail page
│   └── search/
│       └── page.jsx           # Search results page
├── components/
│   ├── Navbar.jsx             # Navigation component
│   ├── Hero.jsx               # Hero section
│   ├── MovieCard.jsx          # Movie card component
│   ├── CarouselSlider.jsx     # Carousel component
│   └── Pagination.jsx         # Pagination component
├── lib/
│   └── tmdb.js                # TMDB API configuration
└── public/                    # Static assets
```

## 🎯 Key Features Explained

### Home Page
- **Hero Section**: Displays featured movie with backdrop, title, rating, and action buttons
- **Trending Movies**: Grid layout of trending movies
- **Popular Movies**: Carousel slider of popular movies
- **Top Rated**: Grid layout of top-rated movies
- **Coming Soon**: Carousel slider of upcoming movies

### Movie Detail Page
- **Movie Information**: Title, rating, year, runtime, genres
- **Action Buttons**: Watch trailer, add to watchlist, share
- **Tabbed Content**: Overview, cast, and additional details
- **Similar Movies**: Recommendations based on current movie

### Search Functionality
- **Multi-type Search**: Search movies, TV shows, and people
- **Real-time Results**: Instant search results with pagination
- **Media Type Indicators**: Visual indicators for different content types

## 🎨 Design Features

- **Dark Theme**: Modern dark UI with purple accent colors
- **Responsive Grid**: Adaptive grid layouts for different screen sizes
- **Smooth Animations**: Hover effects and transitions
- **Loading States**: Beautiful loading spinners and skeletons
- **Error Handling**: User-friendly error messages

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: 2 columns grid
- **Tablet**: 3-4 columns grid  
- **Desktop**: 5-6 columns grid
- **Large Desktop**: 6+ columns grid

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Add environment variable: `NEXT_PUBLIC_TMDB_API_KEY` and `OPENAI_API_KEY`
   - Deploy!

### Deploy to Other Platforms

The project is compatible with any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Customization

### Colors
Modify the color scheme in `app/globals.css`:
```css
:root {
  --background: #0a0a0a;
  --foreground: #ededed;
}
```

### API Configuration
Update API settings in `lib/tmdb.js`:
```javascript
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Note**: This project uses the TMDB API but is not endorsed or certified by TMDB.

## 🤖 MoveiBot AI Assistant

MoveiBot is an AI chatbot integrated with OpenAI GPT-3.5 Turbo to help users:

### MoveiBot Features:
- 💬 **Conversational AI** - Natural language chat in Indonesian
- 🎯 **Movie Recommendations** - Movie recommendations based on preferences
- 📺 **TV Show Suggestions** - TV show suggestions based on genre
- 🎭 **Actor Information** - Information about actors and directors
- 🎬 **Genre Guidance** - Guidance based on favorite genre
- ⭐ **Rating & Reviews** - Information about rating and reviews

### How to Use MoveiBot:
1. Click the chat button in the bottom right corner
2. Type your question or request for recommendation
3. MoveiBot will provide a relevant response
4. Use minimize feature to hide chat

### Example Questions:
- "Recommend an action movie"
- "What movie is similar to Inception?"
- "Who is the director of The Dark Knight?"
- "Best TV show of 2024"
- "Good romantic movie"

---

**MoveiHub** - Stream Your Favorite Movies & TV Shows 🎬✨
