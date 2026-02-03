import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import preferencesReducer from '@/features/preferences/preferencesSlice';
import favoritesReducer from '@/features/favorites/favoritesSlice';
import { contentApi } from '@/features/content/contentApi';
import { ContentCard } from '@/components/ui/ContentCard';
import { NewsContent } from '@/types';

// Mock store for testing
const createMockStore = () =>
  configureStore({
    reducer: {
      preferences: preferencesReducer,
      favorites: favoritesReducer,
      [contentApi.reducerPath]: contentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(contentApi.middleware),
  });

describe('ContentCard', () => {
  const mockContent: NewsContent = {
    id: 'test-1',
    type: 'news',
    title: 'Test News Article',
    description: 'This is a test description',
    imageUrl: 'https://example.com/image.jpg',
    url: 'https://example.com',
    publishedAt: '2026-02-02T10:00:00Z',
    source: 'Test Source',
    author: 'Test Author',
  };

  it('renders content card with correct information', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <ContentCard content={mockContent} />
      </Provider>
    );

    expect(screen.getByText('Test News Article')).toBeInTheDocument();
    expect(screen.getByText(/This is a test description/)).toBeInTheDocument();
    expect(screen.getByText('Test Source')).toBeInTheDocument();
  });

  it('toggles favorite when star button is clicked', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <ContentCard content={mockContent} />
      </Provider>
    );

    const favoriteButton = screen.getByLabelText('Add to favorites');
    fireEvent.click(favoriteButton);

    // Check if the item was added to favorites
    const state = store.getState();
    expect(state.favorites.items).toHaveLength(1);
    expect(state.favorites.items[0].id).toBe('test-1');
  });

  it('displays "Read More" link with correct URL', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <ContentCard content={mockContent} />
      </Provider>
    );

    const link = screen.getByRole('link', { name: /Read More/i });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
