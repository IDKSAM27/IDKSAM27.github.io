import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

const booksDirectory = path.join(process.cwd(), 'books');
const dataDirectory = path.join(process.cwd(), 'data');
const outputFile = path.join(dataDirectory, 'books.json');

async function processMarkdownToHtml(markdownText) {
  if (!markdownText) return '';
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdownText);
  return processed.toString();
}

export async function compileBooks() {
  if (!fs.existsSync(booksDirectory)) {
    console.warn(`[Precompiler] Books directory does not exist at: ${booksDirectory}`);
    return;
  }

  const fileNames = fs.readdirSync(booksDirectory);
  const allBooksData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(booksDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        // Process main body markdown (summary & takeaways)
        const summaryHtml = await processMarkdownToHtml(matterResult.content);

        // Process personal thoughts markdown if present
        let thoughtsHtml = '';
        if (matterResult.data.thoughts) {
          thoughtsHtml = await processMarkdownToHtml(matterResult.data.thoughts);
        }

        return {
          slug,
          summaryHtml,
          thoughtsHtml,
          ...matterResult.data,
        };
      })
  );

  // Sort books by dateRead (descending)
  const sortedBooks = allBooksData.sort((a, b) => {
    const dateA = a.dateRead || '1970-01-01';
    const dateB = b.dateRead || '1970-01-01';
    return dateA < dateB ? 1 : -1;
  });

  // Ensure data directory exists
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }

  // Write to books.json
  fs.writeFileSync(outputFile, JSON.stringify(sortedBooks, null, 2), 'utf8');
  console.log(`[Precompiler] Compiled ${sortedBooks.length} books to ${outputFile}`);
}

compileBooks().catch((err) => {
  console.error('[Precompiler] Error compiling books:', err);
  process.exit(1);
});
