'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContentCard } from '@/components/ui';
import { useAppSelector, useAppDispatch } from '@/lib/store';
import { toggleCategory, setContentTypeFilter, toggleFavoritesOnly } from '@/features/preferences/preferencesSlice';
import {
  useGetNewsQuery,
  useGetRecommendationsQuery,
  useGetSocialContentQuery,
} from './contentApi';
import { Content, ContentCategory } from '@/types';
import { Loader2, AlertCircle } from 'lucide-react';

/**
 * ContentFeed aggregates and displays content from multiple sources
 * Handles loading states, errors, and empty states
 * Implements layered filtering: Category → Content Type → Favorites → Search
 */
export function ContentFeed() {
  const dispatch = useAppDispatch();
  const selectedCategories = useAppSelector((state) => state.preferences.categories);
  const contentTypeFilter = useAppSelector((state) => state.preferences.contentTypeFilter);
  const showFavoritesOnly = useAppSelector((state) => state.preferences.showFavoritesOnly);
  const favoriteItems = useAppSelector((state) => state.favorites.items);
  const favoriteIds = useMemo(() => favoriteItems.map(item => item.id), [favoriteItems]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRemoveCategory = (category: ContentCategory) => {
    dispatch(toggleCategory(category));
  };

  const handleClearAllFilters = () => {
    selectedCategories.forEach((category) => {
      dispatch(toggleCategory(category));
    });
  };

  // Fetch content from all sources
  // Note: In production, you'd fetch news for each selected category
  const primaryCategory = selectedCategories[0] || 'technology';
  
  const {
    data: newsData,
    isLoading: newsLoading,
    error: newsError,
  } = useGetNewsQuery({ category: primaryCategory, pageSize: 10 });

  const {
    data: moviesData,
    isLoading: moviesLoading,
    error: moviesError,
  } = useGetRecommendationsQuery({ type: 'movie', page: 1 });

  const {
    data: socialData,
    isLoading: socialLoading,
    error: socialError,
  } = useGetSocialContentQuery();

  // Combine and filter all content with layered filtering logic
  const allContent = useMemo(() => {
    const combined: Content[] = [];
    if (newsData) combined.push(...newsData);
    if (moviesData) combined.push(...moviesData);
    if (socialData) combined.push(...socialData);

    // Step 1: Filter by selected categories (if any are selected)
    let filtered = combined;
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) => 
        item.category && selectedCategories.includes(item.category)
      );
    }

    // Step 2: Filter by content type (news/movies/social)
    // Map content types to filter value: 'recommendation' type maps to 'movies' filter
    if (contentTypeFilter !== 'all') {
      filtered = filtered.filter((item) => {
        if (contentTypeFilter === 'movies') {
          return item.type === 'recommendation';
        }
        return item.type === contentTypeFilter;
      });
    }

    // Step 3: Filter by favorites (if favorites-only mode is active)
    if (showFavoritesOnly) {
      filtered = filtered.filter((item) => favoriteIds.includes(item.id));
    }

    // Step 4: Apply search query (case-insensitive matching on title and description)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [newsData, moviesData, socialData, selectedCategories, contentTypeFilter, showFavoritesOnly, favoriteIds, searchQuery]);

  const isLoading = newsLoading || moviesLoading || socialLoading;
  const hasError = newsError || moviesError || socialError;

  // Render filters and UI structure consistently
  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Content Type Filter - Always visible for navigation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white dark:bg-slate-900 rounded-xl p-3 md:p-2 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <div className="flex items-center gap-2 flex-wrap">
          {(['all', 'news', 'movies', 'social'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => dispatch(setContentTypeFilter(filter))}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                contentTypeFilter === filter
                  ? 'bg-emerald-500 text-white shadow-md hover:bg-emerald-600'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              aria-pressed={contentTypeFilter === filter}
              aria-label={`Filter by ${filter}`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Favorites Toggle */}
        <button
          onClick={() => dispatch(toggleFavoritesOnly())}
          className={`w-full sm:w-auto sm:ml-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
            showFavoritesOnly
              ? 'bg-amber-500 text-white shadow-md hover:bg-amber-600'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
          aria-pressed={showFavoritesOnly}
          aria-label={showFavoritesOnly ? 'Show all content' : 'Show favorites only'}
        >
          <svg className="w-4 h-4" fill={showFavoritesOnly ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <span className="hidden xs:inline">{showFavoritesOnly ? 'Favorites' : 'All Content'}</span>
          <span className="xs:hidden">{showFavoritesOnly ? 'Favs' : 'All'}</span>
        </button>
      </motion.div>

      {/* Category Filter Section - Always visible */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-3 md:p-4 border border-emerald-200 dark:border-slate-700 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 items-start sm:items-center">
          <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 w-full sm:w-auto">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="hidden xs:inline">{selectedCategories.length > 0 ? 'Active Filters:' : 'Filters:'}</span>
            <span className="xs:hidden">{selectedCategories.length > 0 ? 'Active:' : 'Filters:'}</span>
          </span>
          
          {selectedCategories.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-2 flex-1 w-full sm:w-auto">
                {selectedCategories.map((category) => (
                  <motion.button
                    key={category}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRemoveCategory(category)}
                    className="group px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 transition-all flex items-center gap-1 sm:gap-1.5 shadow-sm"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                    <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                ))}
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 px-2.5 sm:px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                  {allContent.length} {allContent.length === 1 ? 'result' : 'results'}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClearAllFilters}
                  className="text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 underline underline-offset-2 transition-colors whitespace-nowrap"
                >
                  Clear all
                </motion.button>
              </div>
            </>
          ) : (
            <span className="text-xs text-slate-500 dark:text-slate-400 w-full sm:w-auto">
              No filters applied. Go to Preferences to select categories.
            </span>
          )}
        </div>
      </motion.div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] gap-4 px-4">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 text-center">Loading your personalized feed...</p>
        </div>
      )}

      {/* Error state */}
      {!isLoading && hasError && (
        <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] gap-4 px-4">
          <AlertCircle className="h-10 w-10 sm:h-12 sm:w-12 text-red-500" />
          <div className="text-center max-w-md">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Failed to load content</h3>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mb-4">
              There was an error fetching your content. Please check your API configuration.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              API keys are required. Check environment variables configuration.
            </p>
          </div>
        </div>
      )}

      {/* Empty state with contextual messaging */}
      {!isLoading && !hasError && allContent.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] gap-4 px-4">
          <div className="text-center max-w-md">
            <div className="mb-4 text-slate-400 dark:text-slate-500">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">
              {showFavoritesOnly && favoriteIds.length === 0
                ? 'No favorites yet'
                : showFavoritesOnly
                ? 'No favorited content matches your filters'
                : searchQuery
                ? 'No results found'
                : contentTypeFilter !== 'all'
                ? `No ${contentTypeFilter} content available`
                : selectedCategories.length === 0
                ? 'No categories selected'
                : 'No content matches your selected categories'}
            </h3>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
              {showFavoritesOnly && favoriteIds.length === 0
                ? 'Star some content to see it here!'
                : showFavoritesOnly
                ? 'Try disabling some filters or add more favorites.'
                : searchQuery
                ? `No content matches "${searchQuery}". Try a different search term.`
                : contentTypeFilter !== 'all'
                ? 'Try selecting different filters or categories.'
                : selectedCategories.length === 0
                ? 'Go to Preferences to select categories to see content.'
                : 'Try selecting different categories in Preferences.'}
            </p>
          </div>
        </div>
      )}

      {/* Enhanced Search bar */}
      {!isLoading && !hasError && allContent.length > 0 && (
        <div className="sticky top-16 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur pb-3 md:pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
              <svg className="h-4 w-4 md:h-5 md:w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by title, description, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 md:pl-12 pr-10 md:pr-12 py-2.5 md:py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-400 text-sm md:text-base text-slate-900 dark:text-slate-100"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 md:pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Content grid */}
      {!isLoading && !hasError && allContent.length > 0 && (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {allContent.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
