# Content Dashboard

A production-quality personalized content dashboard built with Next.js 14, TypeScript, Redux Toolkit, and Tailwind CSS.

## 🚀 Features

- **Personalized Feed**: Aggregates content from News API, TMDB, and mock social media
- **Category Preferences**: Select topics you care about (Technology, Business, Sports, etc.)
- **Favorites System**: Save and manage your favorite content
- **Dark Mode**: Toggle between light and dark themes with persistence
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Debounced Search**: Real-time search across all content
- **Smooth Animations**: Framer Motion for polished interactions
- **Type-Safe**: Strict TypeScript throughout the codebase
- **State Management**: Redux Toolkit + RTK Query for efficient data fetching
- **Testing Ready**: Jest + React Testing Library configured

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **State Management**: Redux Toolkit + RTK Query
- **Styling**: Tailwind CSS with dark mode support
- **Animations**: Framer Motion
- **Testing**: Jest + React Testing Library
- **Icons**: Lucide React
- **API Sources**: News API, TMDB API, Mock Social JSON

## 📁 Project Structure

```
content-dashboard/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Main dashboard page
│   ├── globals.css          # Global styles & CSS variables
│   └── providers.tsx        # Redux Provider wrapper
├── components/
│   ├── layout/              # Layout components
│   │   ├── Header.tsx       # Top navigation bar
│   │   └── Sidebar.tsx      # Side navigation drawer
│   └── ui/                  # Reusable UI components
│       └── ContentCard.tsx  # Content display card
├── features/                # Feature-based modules
│   ├── content/
│   │   ├── ContentFeed.tsx  # Main content feed
│   │   └── contentApi.ts    # RTK Query API endpoints
│   ├── favorites/
│   │   ├── FavoritesList.tsx
│   │   └── favoritesSlice.ts
│   └── preferences/
│       ├── PreferencesPanel.tsx
│       └── preferencesSlice.ts
├── lib/
│   ├── store/               # Redux store configuration
│   │   ├── store.ts
│   │   └── hooks.ts         # Typed Redux hooks
│   └── utils/               # Utility functions
│       └── helpers.ts       # Common helpers (debounce, formatDate, etc.)
├── types/                   # TypeScript type definitions
│   ├── content.ts
│   └── preferences.ts
├── public/
│   └── mock-data/
│       └── social.json      # Mock social media content
└── __tests__/               # Test files
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- API keys for News API and TMDB (see Configuration section)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Content-Dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key_here
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   ```

   **Get your API keys**:
   - News API: [https://newsapi.org/register](https://newsapi.org/register)
   - TMDB: [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode

## 🎨 Architecture Decisions

### State Management

- **Redux Toolkit**: Global state for preferences and favorites
- **RTK Query**: API data fetching with built-in caching
- **Local Component State**: UI-only state (sidebar open/close, etc.)
- **localStorage**: Persistence for user preferences and favorites

### Styling Approach

- **Tailwind CSS**: Utility-first styling
- **CSS Variables**: Dynamic theming for dark mode
- **Framer Motion**: Declarative animations
- **Responsive First**: Mobile-first design approach

### Component Architecture

- **Feature-Based Structure**: Organized by domain (content, preferences, favorites)
- **Separation of Concerns**: Clear boundaries between UI, state, and API logic
- **Composition Over Inheritance**: Reusable, composable components
- **TypeScript Strict Mode**: Maximum type safety

### Performance Optimizations

- **Image Optimization**: Next.js Image component with lazy loading
- **Debounced Search**: Prevents excessive re-renders
- **RTK Query Caching**: Automatic request deduplication
- **Code Splitting**: Automatic with Next.js App Router

## 🧪 Testing Strategy

The project includes test setup for:
- Component unit tests
- Redux slice logic tests
- API integration tests
- User interaction tests

Run tests with:
```bash
npm run test
```

## 🌐 API Integration

### News API
Fetches top headlines by category with configurable page size.

### TMDB API
Retrieves popular movies and TV shows with ratings and images.

### Mock Social API
Local JSON file simulating social media posts with engagement metrics.

## 🎯 Key Features Explained

### 1. Personalized Feed
Users select categories in Preferences, and the feed dynamically updates to show relevant content from all sources.

### 2. Favorites System
Click the star icon on any card to save it. Access all favorites from the sidebar navigation.

### 3. Dark Mode
Seamless theme switching with persistence. Uses Tailwind's dark mode with CSS variables.

### 4. Responsive Design
- Mobile: Drawer navigation
- Tablet: Two-column grid
- Desktop: Three-column grid with fixed sidebar

### 5. Search Functionality
Debounced search across all content titles and descriptions.

## 🔒 Security Considerations

- API keys stored in environment variables
- No sensitive data in client-side code
- Proper CORS handling for external APIs
- Input sanitization for search queries

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Build the production bundle:
```bash
npm run build
npm run start
```

Ensure environment variables are configured in your hosting platform.

## 📝 Future Enhancements

- [ ] Drag-and-drop card reordering
- [ ] Advanced filtering (date range, content type)
- [ ] User authentication
- [ ] Backend API for real social media integration
- [ ] Infinite scroll / pagination
- [ ] Content sharing functionality
- [ ] PWA support

## 🤝 Contributing

This is a portfolio/assignment project. If you'd like to suggest improvements:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📄 License

This project is created as an internship assignment and is open for educational purposes.

## 👨‍💻 Author

Built with ❤️ as a frontend internship assignment demonstrating modern React, Next.js, and Redux best practices.

---

**Note**: Make sure to add your API keys to `.env.local` before running the project. See `.env.local.example` for the required format.