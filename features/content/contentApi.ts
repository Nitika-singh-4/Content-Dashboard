import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Content, NewsContent, RecommendationContent } from '@/types';

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Array<{
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
  }>;
}

interface TMDBResponse {
  page: number;
  results: Array<{
    id: number;
    title?: string;
    name?: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
    media_type?: 'movie' | 'tv';
  }>;
}

export const contentApi = createApi({
  reducerPath: 'contentApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    // Fetch news from News API
    getNews: builder.query<NewsContent[], { category: string; pageSize?: number }>({
      query: ({ category, pageSize = 20 }) => {
        const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
        return {
          url: `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`,
        };
      },
      transformResponse: (response: NewsApiResponse): NewsContent[] => {
        return response.articles.map((article, index) => ({
          id: `news-${article.source.name}-${index}-${Date.now()}`,
          type: 'news' as const,
          title: article.title,
          description: article.description || 'No description available',
          imageUrl: article.urlToImage || undefined,
          url: article.url,
          publishedAt: article.publishedAt,
          source: article.source.name,
          author: article.author || undefined,
          category: undefined,
        }));
      },
    }),

    // Fetch recommendations from TMDB
    getRecommendations: builder.query<RecommendationContent[], { type: 'movie' | 'tv'; page?: number }>({
      query: ({ type, page = 1 }) => {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const endpoint = type === 'movie' ? 'movie/popular' : 'tv/popular';
        return {
          url: `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}&page=${page}`,
        };
      },
      transformResponse: (response: TMDBResponse, _meta, arg): RecommendationContent[] => {
        return response.results.slice(0, 10).map((item) => ({
          id: `tmdb-${arg.type}-${item.id}`,
          type: 'recommendation' as const,
          title: item.title || item.name || 'Untitled',
          description: item.overview || 'No description available',
          imageUrl: item.poster_path 
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : undefined,
          url: `https://www.themoviedb.org/${arg.type}/${item.id}`,
          publishedAt: item.release_date || item.first_air_date || new Date().toISOString(),
          rating: item.vote_average,
          mediaType: arg.type,
        }));
      },
    }),

    // Fetch mock social content (local JSON)
    getSocialContent: builder.query<Content[], void>({
      query: () => '/mock-data/social.json',
    }),
  }),
});

export const { 
  useGetNewsQuery, 
  useGetRecommendationsQuery, 
  useGetSocialContentQuery 
} = contentApi;
