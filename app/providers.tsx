'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { hydrateFromStorage as hydratePreferences } from '@/features/preferences/preferencesSlice';
import { hydrateFromStorage as hydrateFavorites } from '@/features/favorites/favoritesSlice';

/**
 * Redux Provider wrapper with hydration from localStorage
 * Ensures localStorage data is loaded only on client mount (prevents hydration errors)
 */
export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hydrate Redux state from localStorage after mount (client-side only)
    store.dispatch(hydratePreferences());
    store.dispatch(hydrateFavorites());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
