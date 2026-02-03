# Content Dashboard

> A modern, production-quality personalized content dashboard built with Next.js 14, TypeScript, and Redux Toolkit.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=flat-square&logo=redux)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- 🎯 **Personalized Feed** - Aggregates content from News API, TMDB, and social media
- 🎨 **Modern UI/UX** - Emerald-teal theme with smooth Framer Motion animations
- 🌓 **Dark Mode** - System-aware theme switching with persistence
- ⭐ **Favorites** - Save and manage your favorite content
- 🔍 **Smart Search** - Debounced real-time search with filtering
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🎭 **Content Filters** - Filter by type (News/Movies/Social) and categories
- 💾 **Persistent State** - LocalStorage integration for preferences
- ⚡ **Performance** - Optimized images, code splitting, and caching
- ✅ **Type-Safe** - Strict TypeScript throughout

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- API keys (News API, TMDB)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Content-Dashboard

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Add your API keys to .env.local
# NEXT_PUBLIC_NEWS_API_KEY=your_key
# NEXT_PUBLIC_TMDB_API_KEY=your_key

# Run development server
npm run dev

# Open http://localhost:3000
```

### Getting API Keys

**News API** (Free): [newsapi.org/register](https://newsapi.org/register)  
**TMDB** (Free): [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript (Strict Mode) |
| **State Management** | Redux Toolkit + RTK Query |
| **Styling** | Tailwind CSS + CSS Variables |
| **Animations** | Framer Motion |
| **Testing** | Jest + React Testing Library |
| **Icons** | Lucide React |
| **Image Optimization** | Next.js Image + Picsum |

## 📁 Project Structure

```
content-dashboard/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Main dashboard page
│   └── providers.tsx        # Redux Provider wrapper
├── components/
│   ├── layout/              # Header, Sidebar
│   └── ui/                  # ContentCard, reusable components
├── features/                # Feature modules
│   ├── content/             # Content feed & API
│   ├── favorites/           # Favorites system
│   └── preferences/         # User preferences
├── lib/
│   ├── store/               # Redux configuration
│   └── utils/               # Helper functions
├── types/                   # TypeScript definitions
└── public/
    └── mock-data/           # Mock social content
```

## 📦 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run Jest tests
npm run test:watch   # Tests in watch mode
```

## 🎯 Key Features

### Content Filtering System
- **Content Type Tabs**: All / News / Movies / Social
- **Category Filters**: Technology, Business, Sports, Entertainment, Health, Science
- **Favorites Toggle**: Show only starred content
- **Search**: Real-time filtering across titles and descriptions

### State Management
- Redux Toolkit for global state (preferences, favorites)
- RTK Query for API data fetching and caching
- LocalStorage persistence for user data
- Hydration pattern to prevent SSR mismatches

### Responsive Design
- Mobile: Single column, drawer navigation
- Tablet (640px+): Two columns
- Desktop (1024px+): Three columns, fixed sidebar

### Performance
- Next.js Image optimization with lazy loading
- Debounced search (prevents excessive renders)
- RTK Query caching (automatic deduplication)
- Automatic code splitting

## 🎨 Design System

**Color Palette**:
- Primary: Emerald (500-600)
- Secondary: Teal (500-600)
- Accent: Amber (500-600)
- Neutral: Slate (50-900)

**Animations**:
- Card hover effects with elevation
- Filter tab transitions
- Smooth theme switching
- Drag-enabled content cards

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Deploy on Vercel
# 1. Import GitHub repository
# 2. Add environment variables
# 3. Deploy
```

### Manual Build

```bash
npm run build
npm run start
```

Ensure environment variables are set in your hosting platform.

## 🔒 Environment Variables

```env
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
```

**Note**: Never commit `.env.local` to version control.

## 🧪 Testing

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

Tests include:
- Component unit tests
- Redux slice tests
- API integration tests
- User interaction tests

## 📝 Architecture Decisions

**Why Redux Toolkit?**
- Simplified Redux setup with less boilerplate
- Built-in RTK Query for API management
- DevTools integration for debugging

**Why Tailwind CSS?**
- Utility-first approach for rapid development
- Built-in dark mode support
- Smaller bundle size (unused styles purged)

**Why App Router?**
- Server Components for better performance
- Simplified routing and layouts
- Streaming and Suspense support

## 🤝 Contributing

This is a portfolio project. Suggestions are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created as an internship assignment and is open for educational purposes.

## 👤 Author

**Nitika Singh**  
Built with ❤️ as a frontend internship assignment demonstrating modern React, Next.js, and Redux best practices.

---

⭐ Star this repository if you find it helpful!