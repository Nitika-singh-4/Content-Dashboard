export type ContentType = 'news' | 'recommendation' | 'social';

export type ContentCategory = 
  | 'technology'
  | 'business'
  | 'entertainment'
  | 'sports'
  | 'health'
  | 'science';

export interface BaseContent {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
  publishedAt: string;
  category?: ContentCategory;
}

export interface NewsContent extends BaseContent {
  type: 'news';
  source: string;
  author?: string;
}

export interface RecommendationContent extends BaseContent {
  type: 'recommendation';
  rating?: number;
  mediaType: 'movie' | 'tv';
}

export interface SocialContent extends BaseContent {
  type: 'social';
  platform: 'twitter' | 'instagram' | 'linkedin';
  author: string;
  likes: number;
  comments: number;
}

export type Content = NewsContent | RecommendationContent | SocialContent;
