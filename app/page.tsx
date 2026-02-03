'use client';

import { useState } from 'react';
import { Header, Sidebar } from '@/components/layout';
import { ContentFeed } from '@/features/content';
import { FavoritesList } from '@/features/favorites';
import { PreferencesPanel } from '@/features/preferences';

type View = 'feed' | 'favorites' | 'preferences';

/**
 * Main dashboard page component
 * Orchestrates layout, navigation, and view switching
 */
export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<View>('feed');

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleViewChange = (view: View) => {
    setActiveView(view);
  };

  const handleSearchClick = () => {
    // Search functionality can be enhanced by passing state to ContentFeed
    console.log('Search clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <Header onMenuClick={handleMenuClick} onSearchClick={handleSearchClick} />
      
      <div className="flex">
        {/* Sidebar - only shows when open, doesn't take up space when closed */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={handleSidebarClose}
          activeView={activeView}
          onViewChange={handleViewChange}
        />

        {/* Main content - full width */}
        <main className="flex-1 w-full p-4 sm:p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {activeView === 'feed' && <ContentFeed />}
            {activeView === 'favorites' && <FavoritesList />}
            {activeView === 'preferences' && <PreferencesPanel />}
          </div>
        </main>
      </div>
    </div>
  );
}
