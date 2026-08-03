import type { MetadataRoute } from 'next';
import { flattenNavigation } from '@/lib/engineering/navigation';

const origin = 'https://sampreetpatil.com';
export default function sitemap(): MetadataRoute.Sitemap {
  const existing = ['/', '/blog', '/blog/graph-rag', '/blog/mcp', '/blog/my-first-post', '/blog/ownership_borrowing_in_rust', '/blog/ssh'];
  const engineering = [...new Set(flattenNavigation().map((item) => item.href))];
  return [...existing, ...engineering].map((path) => ({ url: `${origin}${path}`, lastModified: path.startsWith('/engineering') ? new Date('2026-08-03') : new Date('2026-04-22'), changeFrequency: path === '/' ? 'monthly' : path === '/blog' ? 'weekly' : 'monthly', priority: path === '/' ? 1 : path === '/engineering' ? .9 : .7 }));
}
