import preferencesReducer, {
  toggleCategory,
  toggleDarkMode,
  setCategories,
} from '@/features/preferences/preferencesSlice';
import type { ContentCategory } from '@/types';

describe('preferencesSlice', () => {
  const initialState = {
    categories: ['technology', 'business'] as ContentCategory[],
    darkMode: false,
  };

  it('should handle toggleCategory - add category', () => {
    const actual = preferencesReducer(
      initialState,
      toggleCategory('sports')
    );
    expect(actual.categories).toContain('sports');
    expect(actual.categories).toHaveLength(3);
  });

  it('should handle toggleCategory - remove category', () => {
    const actual = preferencesReducer(
      initialState,
      toggleCategory('technology')
    );
    expect(actual.categories).not.toContain('technology');
    expect(actual.categories).toHaveLength(1);
  });

  it('should handle toggleDarkMode', () => {
    const actual = preferencesReducer(initialState, toggleDarkMode());
    expect(actual.darkMode).toBe(true);

    const toggled = preferencesReducer(actual, toggleDarkMode());
    expect(toggled.darkMode).toBe(false);
  });

  it('should handle setCategories', () => {
    const actual = preferencesReducer(
      initialState,
      setCategories(['health', 'science', 'entertainment'])
    );
    expect(actual.categories).toEqual(['health', 'science', 'entertainment']);
    expect(actual.categories).toHaveLength(3);
  });
});
