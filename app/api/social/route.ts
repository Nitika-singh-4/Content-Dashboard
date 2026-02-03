import { NextResponse } from 'next/server';

const mockSocialData = [
  {
    id: 'social-1',
    type: 'social',
    title: 'Building Modern Web Applications with Next.js 14',
    description: 'A comprehensive guide to building production-ready applications with the latest Next.js features including Server Components and App Router.',
    imageUrl: 'https://picsum.photos/seed/social1/800/600',
    url: '#',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    author: 'Sarah Chen',
    platform: 'Dev Community',
  },
  {
    id: 'social-2',
    type: 'social',
    title: 'The Future of AI in Software Development',
    description: 'Exploring how artificial intelligence is transforming the way we write, test, and deploy code in modern development workflows.',
    imageUrl: 'https://picsum.photos/seed/social2/800/600',
    url: '#',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    author: 'Marcus Johnson',
    platform: 'Tech Insights',
  },
  {
    id: 'social-3',
    type: 'social',
    title: 'Best Practices for React Performance Optimization',
    description: 'Learn essential techniques to optimize your React applications for better performance and user experience.',
    imageUrl: 'https://picsum.photos/seed/social3/800/600',
    url: '#',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    author: 'Emily Rodriguez',
    platform: 'React Weekly',
  },
];

export async function GET() {
  return NextResponse.json(mockSocialData);
}