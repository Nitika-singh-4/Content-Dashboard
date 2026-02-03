'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Home, Star, Settings, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: 'feed' | 'favorites' | 'preferences';
  onViewChange: (view: 'feed' | 'favorites' | 'preferences') => void;
}

const navItems = [
  { id: 'feed' as const, label: 'Feed', icon: Home },
  { id: 'favorites' as const, label: 'Favorites', icon: Star },
  { id: 'preferences' as const, label: 'Preferences', icon: Settings },
];

/**
 * Sidebar navigation component
 * Responsive: drawer on mobile, fixed sidebar on desktop
 */
export function Sidebar({ isOpen, onClose, activeView, onViewChange }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -280,
        }}
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-72 border-r bg-white dark:bg-slate-900',
          'md:fixed md:top-16 md:h-[calc(100vh-4rem)]'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Mobile header */}
          <div className="flex items-center justify-between border-b p-4 md:hidden">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onViewChange(item.id);
                    onClose();
                  }}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors',
                    isActive
                      ? 'bg-blue-500 text-white font-medium'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-50'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Built with Next.js & Redux
            </p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
