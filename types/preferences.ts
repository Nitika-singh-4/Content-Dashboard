import { ContentCategory } from './content';

export interface UserPreferences {
  categories: ContentCategory[];
  darkMode: boolean;
}

export interface AppState {
  preferences: UserPreferences;
  favorites: string[]; // Array of content IDs
}
