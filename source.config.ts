import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/engineering',
  docs: {
    schema: z.object({
      title: z.string(),
      description: z.string(),
      section: z.string().default('Engineering'),
      status: z.enum(['verified', 'inferred', 'proposed']).default('verified'),
      icon: z.string().optional(),
      full: z.boolean().default(false),
    }),
  },
});

export default defineConfig();
