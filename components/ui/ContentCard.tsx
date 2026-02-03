'use client';

import { motion } from 'framer-motion';
import { Star, ExternalLink, Twitter, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';
import { Content } from '@/types';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { addFavorite, removeFavorite } from '@/features/favorites/favoritesSlice';
import { formatDate, truncateText } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  content: Content;
}

/**
 * ContentCard displays individual content items
 * Supports news, recommendations, and social content types
 * Includes favorite toggle and external link
 */
export function ContentCard({ content }: ContentCardProps) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((item) => item.id === content.id);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite) {
      dispatch(removeFavorite(content.id));
    } else {
      dispatch(addFavorite(content));
    }
  };

  const getPlatformIcon = () => {
    if (content.type !== 'social') return null;
    
    switch (content.platform) {
      case 'twitter':
        return <Twitter className="h-4 w-4 text-blue-400" />;
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case 'linkedin':
        return <Linkedin className="h-4 w-4 text-blue-600" />;
    }
  };

  const getContentBadge = () => {
    if (content.type === 'news') {
      return (
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-500/10 text-blue-500">
          News
        </span>
      );
    }
    if (content.type === 'recommendation') {
      return (
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-500/10 text-purple-500">
          {content.mediaType === 'movie' ? 'Movie' : 'TV Show'}
        </span>
      );
    }
    if (content.type === 'social') {
      return (
        <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-green-500/10 text-green-500">
          {getPlatformIcon()}
          <span className="capitalize">{content.platform}</span>
        </span>
      );
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      className="group relative overflow-hidden rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all hover:border-emerald-400 dark:hover:border-emerald-600 cursor-grab active:cursor-grabbing"
    >
      {/* Image */}
      {content.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
          <Image
            src={content.imageUrl}
            alt={content.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Header with badge and favorite */}
        <div className="flex items-start justify-between gap-2">
          {getContentBadge()}
          
          <motion.button
            whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteToggle}
            className={cn(
              'p-2 rounded-full transition-all shadow-sm',
              isFavorite
                ? 'bg-yellow-500 text-white shadow-yellow-500/50'
                : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-400 dark:text-slate-500'
            )}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star
              className={cn('h-5 w-5', isFavorite && 'fill-current')}
            />
          </motion.button>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold line-clamp-2 text-slate-900 dark:text-slate-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {content.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
          {truncateText(content.description, 150)}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            {content.type === 'news' && content.source && (
              <span className="font-medium">{content.source}</span>
            )}
            {content.type === 'social' && (
              <>
                <span className="font-medium">@{content.author}</span>
                <span>•</span>
                <span>{content.likes} likes</span>
              </>
            )}
            {content.type === 'recommendation' && content.rating && (
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                <span className="font-medium">{content.rating.toFixed(1)}</span>
              </span>
            )}
          </div>
          <span>{formatDate(content.publishedAt)}</span>
        </div>

        {/* CTA Button */}
        {content.url && (
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={content.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg bg-emerald-500 text-white font-medium text-sm transition-colors hover:bg-emerald-600 shadow-sm hover:shadow-md"
          >
            <span>Read More</span>
            <ExternalLink className="h-4 w-4" />
          </motion.a>
        )}
      </div>
    </motion.article>
  );
}
