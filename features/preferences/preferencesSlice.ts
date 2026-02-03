import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentCategory } from '@/types';

export type ContentTypeFilter = 'all' | 'news' | 'movies' | 'social';

interface PreferencesState {
  categories: ContentCategory[];
  darkMode: boolean;
  // Content type filter: allows filtering by news/movies/social or showing all
  contentTypeFilter: ContentTypeFilter;
  // Show only favorited content when true
  showFavoritesOnly: boolean;
}

// Use consistent initial state (no localStorage during initialization to avoid hydration errors)
const initialState: PreferencesState = {
  categories: ['technology', 'business'],
  darkMode: false,
  contentTypeFilter: 'all',
  showFavoritesOnly: false,
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ContentCategory[]>) => {
      state.categories = action.payload;
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferences', JSON.stringify(state));
      }
    },
    toggleCategory: (state, action: PayloadAction<ContentCategory>) => {
      const category = action.payload;
      const index = state.categories.indexOf(category);
      if (index > -1) {
        state.categories.splice(index, 1);
      } else {
        state.categories.push(category);
      }
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferences', JSON.stringify(state));
      }
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferences', JSON.stringify(state));
        // Update HTML class for Tailwind dark mode
        document.documentElement.classList.toggle('dark', state.darkMode);
      }
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferences', JSON.stringify(state));
        // Update HTML class for Tailwind dark mode
        document.documentElement.classList.toggle('dark', state.darkMode);
      }
    },
    // Set content type filter (all, news, movies, or social)
    setContentTypeFilter: (state, action: PayloadAction<ContentTypeFilter>) => {
      state.contentTypeFilter = action.payload;
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferences', JSON.stringify(state));
      }
    },
    // Toggle favorites-only filter
    toggleFavoritesOnly: (state) => {
      state.showFavoritesOnly = !state.showFavoritesOnly;
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferences', JSON.stringify(state));
      }
    },
    // Hydrate state from localStorage (call this on client mount)
    hydrateFromStorage: (state) => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('preferences');
        if (stored) {
          const parsed = JSON.parse(stored);
          state.categories = parsed.categories || state.categories;
          state.darkMode = parsed.darkMode || state.darkMode;
          state.contentTypeFilter = parsed.contentTypeFilter || state.contentTypeFilter;
          state.showFavoritesOnly = parsed.showFavoritesOnly || state.showFavoritesOnly;
          document.documentElement.classList.toggle('dark', state.darkMode);
        }
      }
    },
  },
});

export const { 
  setCategories, 
  toggleCategory, 
  toggleDarkMode, 
  setDarkMode, 
  setContentTypeFilter,
  toggleFavoritesOnly,
  hydrateFromStorage 
} = preferencesSlice.actions;
export default preferencesSlice.reducer;
