'use client';

import { motion } from 'framer-motion';
import { ContentCard } from '@/components/ui';
import { useAppSelector, useAppDispatch } from '@/lib/store';
import { clearFavorites } from './favoritesSlice';
import { Heart, Trash2 } from 'lucide-react';

/**
 * FavoritesList displays all saved favorite content
 * Allows users to clear all favorites
 */
export function FavoritesList() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all favorites?')) {
      dispatch(clearFavorites());
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Heart className="h-16 w-16 text-slate-400 dark:text-slate-500" />
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
          <p className="text-slate-500 dark:text-slate-400">
            Start adding content to your favorites to see them here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Favorites</h2>
          <p className="text-slate-500 dark:text-slate-400">
            {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {favorites.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearAll}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Clear All</span>
          </motion.button>
        )}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((content) => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>
    </div>
  );
}
