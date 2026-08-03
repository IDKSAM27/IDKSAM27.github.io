import { createSearchAPI } from 'fumadocs-core/search/server';
import { indexedPages } from '@/lib/engineering';

const server = createSearchAPI('simple', { indexes: indexedPages });
export const GET = server.GET;
