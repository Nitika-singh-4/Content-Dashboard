'use client';

import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { toggleDarkMode } from '@/features/preferences/preferencesSlice';
import { Moon, Sun, Menu, Search } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

/**
 * Header component with dark mode toggle and navigation controls
 * Responsive design with mobile menu trigger
 */
export function Header({ onMenuClick, onSearchClick }: HeaderProps) {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.preferences.darkMode);

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm"
    >
      <div className="flex h-16 md:h-18 items-center justify-between px-4 md:px-8 max-w-[1920px] mx-auto">
        {/* Left section: Mobile menu + Enhanced Logo */}
        <div className="flex items-center gap-3 md:gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-teal-50 dark:hover:from-slate-800 dark:hover:to-slate-700 rounded-xl transition-all duration-200 text-slate-700 dark:text-slate-300"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </motion.button>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3"
          >
            <motion.div 
              className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-500/30 dark:shadow-emerald-500/20"
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-[2px] rounded-[10px] bg-white dark:bg-slate-900 flex items-center justify-center">
                <div className="h-5 w-5 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600" />
              </div>
            </motion.div>
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent hidden sm:block">
                Content Dashboard
              </h1>
              <motion.span 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="hidden lg:block text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide"
              >
                Personalized Content Hub
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Right section: Enhanced Search + Dark mode toggle */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSearchClick}
            className="p-2.5 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-teal-50 dark:hover:from-slate-800 dark:hover:to-slate-700 rounded-xl transition-all duration-200 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDarkModeToggle}
            className="p-2.5 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-teal-50 dark:hover:from-slate-800 dark:hover:to-slate-700 rounded-xl transition-all duration-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-500 drop-shadow-sm" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700 dark:text-slate-300" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
