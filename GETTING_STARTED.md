# 🚀 Getting Started - Content Dashboard

## Current Status
✅ **The development server is running at http://localhost:3000**

## ⚠️ Important: Set Up API Keys

Right now, the app will show errors for News and TMDB content because API keys are not configured. Follow these steps:

### Step 1: Create .env.local file

Create a file named `.env.local` in the project root (Content-Dashboard folder):

```env
# News API - Get from https://newsapi.org/register
NEXT_PUBLIC_NEWS_API_KEY=paste_your_key_here

# TMDB API - Get from https://www.themoviedb.org/settings/api
NEXT_PUBLIC_TMDB_API_KEY=paste_your_key_here
```

### Step 2: Get News API Key

1. Go to https://newsapi.org/register
2. Fill out the registration form
3. Verify your email
4. Copy your API key
5. Paste it in `.env.local` as `NEXT_PUBLIC_NEWS_API_KEY`

### Step 3: Get TMDB API Key

1. Go to https://www.themoviedb.org/signup
2. Create an account
3. Verify your email
4. Go to Settings → API
5. Request an API key (choose "Developer")
6. Fill out the form (use any website URL for demo)
7. Copy your API key (v3 auth)
8. Paste it in `.env.local` as `NEXT_PUBLIC_TMDB_API_KEY`

### Step 4: Restart the Server

After creating `.env.local`:

1. Stop the server (Ctrl+C in terminal)
2. Run `npm run dev` again
3. Refresh your browser

## 🎯 What You Can Do Right Now (Without API Keys)

Even without API keys, you can:

✅ **View mock social media content** - 8 sample posts are already working
✅ **Test dark mode** - Click the sun/moon icon in the header
✅ **Try favorites** - Star any mock social post
✅ **Use preferences** - Select categories (will work once APIs are set up)
✅ **Test search** - Search through the mock social content
✅ **Explore UI** - Fully responsive, try resizing your browser

## 📱 Features to Try

### 1. Navigation
- Click hamburger menu (mobile) or use sidebar (desktop)
- Switch between Feed, Favorites, and Preferences

### 2. Dark Mode
- Click sun/moon icon in top-right
- Theme persists across page reloads

### 3. Content Cards
- Hover over cards for animations
- Click star to add to favorites
- Click "Read More" to open original source

### 4. Preferences
- Go to Preferences view
- Click categories to select/deselect
- Once APIs are set up, feed will update automatically

### 5. Search
- Type in the search bar on Feed view
- Results filter in real-time
- Try: "AI", "photo", "leadership"

### 6. Favorites
- Star some social posts
- Go to Favorites view
- Click "Clear All" to remove all

## 🔧 Troubleshooting

### "Failed to load content" error
- **Cause**: Missing API keys
- **Solution**: Follow steps above to set up `.env.local`

### Changes not showing up
- **Solution**: Refresh browser (Ctrl+R or Cmd+R)

### Dark mode not working
- **Solution**: Check browser console for errors
- Try toggling a few times

### Server won't start
- **Solution**: 
  ```bash
  # Kill any running Node processes
  # Then restart
  npm run dev
  ```

## 📊 Project Commands

```bash
# Development
npm run dev          # Start dev server (already running!)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
```

## 🌐 Open the App

The app is currently running at:
**http://localhost:3000**

Just open this URL in your browser!

## 📝 What to Expect

### With Mock Data Only (No API Keys)
- 8 social media posts
- All UI features work
- Dark mode works
- Favorites work
- Search works (limited to mock data)

### With API Keys Configured
- 10-20 news articles per category
- 10 popular movies
- 8 social media posts
- Full search across all content
- Complete personalized feed

## 🎨 UI Overview

```
┌─────────────────────────────────────────┐
│  Logo    Content Dashboard    🔍 🌙     │  ← Header
├──────────┬──────────────────────────────┤
│  Feed    │                              │
│  ★ Faves │     Content Cards Grid       │
│  ⚙ Prefs │     (News, Movies, Social)   │
│          │                              │
└──────────┴──────────────────────────────┘
   Sidebar          Main Content
```

## 🎯 Next Steps

1. ✅ **Set up API keys** (see above)
2. ✅ **Test all features** (feed, favorites, preferences)
3. ✅ **Try on mobile** (responsive design)
4. ✅ **Check dark mode** (theme switching)
5. ✅ **Review code** (explore the clean architecture)

## 📚 Documentation

- **README.md**: Full documentation
- **SETUP.md**: Quick setup guide
- **PROJECT_SUMMARY.md**: Complete project overview

## 💡 Tips

- **Mock data is great for testing**: Even without API keys, you can test all UI features
- **API keys are free**: Both News API and TMDB offer free tiers
- **Dark mode persists**: Your theme choice is saved to localStorage
- **Favorites are saved**: They persist across page reloads
- **Search is debounced**: Wait 300ms after typing for results

## ✨ Have Fun!

This is a production-quality app built with modern best practices. Explore the code, try the features, and enjoy!

---

**Server Status**: ✅ Running at http://localhost:3000
**Next Step**: Set up API keys in `.env.local` (see above)
