# Content Dashboard - Setup Guide

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Copy `.env.local.example` to `.env.local`
   - Add your API keys (see instructions below)

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Visit [http://localhost:3000](http://localhost:3000)

## Getting API Keys

### News API (Required)
1. Go to [https://newsapi.org/register](https://newsapi.org/register)
2. Sign up for a free account
3. Copy your API key
4. Add to `.env.local` as `NEXT_PUBLIC_NEWS_API_KEY`

**Note**: Free tier has limitations (100 requests/day, 1-month old articles)

### TMDB API (Required)
1. Go to [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup)
2. Create an account
3. Go to Settings → API
4. Request an API key (choose "Developer" option)
5. Copy your API key (v3 auth)
6. Add to `.env.local` as `NEXT_PUBLIC_TMDB_API_KEY`

**Note**: Free tier allows 40 requests per 10 seconds

## Environment Variables Template

Create a file named `.env.local` in the project root:

```env
# News API - Get your key from https://newsapi.org/register
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key_here

# TMDB API - Get your key from https://www.themoviedb.org/settings/api
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

## Without API Keys

If you don't want to set up API keys immediately:
- The app will still work with mock social media data
- News and movie recommendations will show an error state
- You can still test preferences, favorites, and dark mode features

## Troubleshooting

### Error: "Failed to load content"
- Check that your `.env.local` file exists
- Verify API keys are correct (no extra spaces)
- Restart the development server after adding env variables

### News API shows old articles
- Free tier only provides articles from the last month
- Consider upgrading or using mock data for testing

### Images not loading
- Some News API articles may have broken image URLs
- TMDB images should work consistently
- Check Next.js image domain configuration in `next.config.js`

## Project Structure

```
Content-Dashboard/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── features/            # Feature modules (content, preferences, favorites)
├── lib/                 # Utilities and store configuration
├── types/               # TypeScript type definitions
├── public/              # Static assets and mock data
└── __tests__/           # Test files
```

## Available Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest tests

## Features to Try

1. **Preferences**: Click "Preferences" in sidebar to select content categories
2. **Favorites**: Star any content card to save it
3. **Dark Mode**: Toggle theme with sun/moon icon in header
4. **Search**: Type in search bar to filter content
5. **Responsive**: Resize browser or use mobile device

## Next Steps

- Customize categories in `features/preferences/PreferencesPanel.tsx`
- Add more mock social content in `public/mock-data/social.json`
- Modify theme colors in `app/globals.css`
- Build additional features (drag-and-drop, pagination, etc.)

---

For detailed documentation, see [README.md](README.md)
