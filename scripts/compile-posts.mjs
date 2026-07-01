import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), 'posts');
const dataDirectory = path.join(process.cwd(), 'data');
const outputFile = path.join(dataDirectory, 'posts.json');

export async function compilePosts() {
  if (!fs.existsSync(postsDirectory)) {
    console.warn(`[Precompiler] Posts directory does not exist at: ${postsDirectory}`);
    return;
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        // Process markdown to HTML at build time
        const processedContent = await remark()
          .use(remarkGfm)
          .use(remarkRehype)
          .use(rehypeHighlight)
          .use(rehypeStringify)
          .process(matterResult.content);
        const contentHtml = processedContent.toString();

        return {
          slug,
          contentHtml,
          ...matterResult.data,
        };
      })
  );

  // Sort posts by date (descending)
  const sortedPosts = allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));

  // Ensure data directory exists
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }

  // Write to posts.json
  fs.writeFileSync(outputFile, JSON.stringify(sortedPosts, null, 2), 'utf8');
  console.log(`[Precompiler] Compiled ${sortedPosts.length} posts to ${outputFile}`);
}

// If executed directly, run compilation
compilePosts().catch((err) => {
  console.error('[Precompiler] Error:', err);
  process.exit(1);
});
