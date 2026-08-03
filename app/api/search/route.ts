import { createSearchAPI } from 'fumadocs-core/search/server';
import { indexedPages } from '@/lib/engineering';

const server = createSearchAPI('simple', { indexes: indexedPages });

// Export the index once at build time. Search runs in the visitor's browser,
// avoiding an Orama indexing/query workload in the Cloudflare Worker.
export const revalidate = false;
export const GET = server.staticGET;
