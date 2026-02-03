'use client';

import { motion } from 'framer-motion';
import { ContentCategory } from '@/types';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { toggleCategory } from '@/features/preferences/preferencesSlice';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories: { id: ContentCategory; label: string; emoji: string }[] = [
  { id: 'technology', label: 'Technology', emoji: '💻' },
  { id: 'business', label: 'Business', emoji: '💼' },
  { id: 'entertainment', label: 'Entertainment', emoji: '🎬' },
  { id: 'sports', label: 'Sports', emoji: '⚽' },
  { id: 'health', label: 'Health', emoji: '🏥' },
  { id: 'science', label: 'Science', emoji: '🔬' },
];

/**
 * PreferencesPanel allows users to select content categories
 * Updates are persisted to Redux store and localStorage
 */
export function PreferencesPanel() {
  const dispatch = useAppDispatch();
  const selectedCategories = useAppSelector((state) => state.preferences.categories);

  const handleCategoryToggle = (category: ContentCategory) => {
    dispatch(toggleCategory(category));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto p-6 space-y-8"
    >
      <div className="text-center space-y-2">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
        >
          Content Preferences
        </motion.h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Select categories to personalize your content feed ✨
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{categories.map((category) => {
          const isSelected = selectedCategories.includes(category.id);

          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryToggle(category.id)}
              className={cn(
                'relative flex items-center gap-4 p-5 rounded-2xl border-2 transition-all shadow-sm',
                isSelected
                  ? 'border-blue-500 bg-gradient-to-br from-blue-500/20 to-purple-500/10 dark:from-blue-500/30 dark:to-purple-500/20 shadow-blue-500/20'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md'
              )}
            >
              <motion.span 
                animate={{ 
                  scale: isSelected ? [1, 1.2, 1] : 1,
                  rotate: isSelected ? [0, -10, 10, 0] : 0
                }}
                transition={{ duration: 0.5 }}
                className="text-3xl"
              >
                {category.emoji}
              </motion.span>
              <span className="flex-1 text-left font-semibold text-slate-900 dark:text-slate-100">{category.label}</span>
              
              {isSelected && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="flex items-center justify-center h-7 w-7 rounded-full bg-blue-500 text-white shadow-lg"
                >
                  <Check className="h-5 w-5" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="pt-4 border-t">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {selectedCategories.length === 0
            ? 'Select at least one category to see personalized content.'
            : `You&apos;ve selected ${selectedCategories.length} ${
                selectedCategories.length === 1 ? 'category' : 'categories'
              }.`}
        </p>
      </div>
    </motion.div>
  );
}
