import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Content } from '@/types';

interface FavoritesState {
  items: Content[];
}

// Use consistent initial state (no localStorage during initialization to avoid hydration errors)
const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Content>) => {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (!exists) {
        state.items.unshift(action.payload);
        // Persist to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('favorites', JSON.stringify(state));
        }
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(state));
      }
    },
    clearFavorites: (state) => {
      state.items = [];
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(state));
      }
    },
    // Hydrate state from localStorage (call this on client mount)
    hydrateFromStorage: (state) => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('favorites');
        if (stored) {
          const parsed = JSON.parse(stored);
          state.items = parsed.items || [];
        }
      }
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites, hydrateFromStorage } = favoritesSlice.actions;
export default favoritesSlice.reducer;
