import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Seo from '../../components/Seo'; 

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

// This function tells Next.js which paths (pages) to generate
export async function getStaticPaths() {
  const fileNames = fs.readdirSync(postsDirectory);
  const paths = fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
  return {
    paths,
    fallback: false, // Means other routes should 404.
  };
}

// This function gets the data for a specific post
export async function getStaticProps({ params }) {
  const fullPath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into an HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the slug and contentHtml
  return {
    props: {
      postData: {
        slug: params.slug,
        contentHtml,
        ...matterResult.data,
      },
    },
  };
}

// This is the React component that renders the post
const Post = ({ postData }) => {
  return (
    <div className="flex flex-col min-h-screen bg-secondary dark:bg-primary">
      <Seo
        title={`${postData.title} | Sampreet Patil`}
        description={postData.excerpt} // Assuming you add 'excerpt' to your frontmatter
        url={`https://www.sampreetpatil.com/blog/${postData.slug}`}
      />
      <Header />

      <main className="flex-grow container mx-auto px-4 py-16">
        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-3">
              {postData.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">{postData.date}</p>
          </header>

          {/* We use dangerouslySetInnerHTML because remark generates HTML */}
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />

          <div className="mt-12">
            <Link href="/blog" legacyBehavior>
              <a className="text-accent hover:underline text-text-light dark:text-text-dark">
                &larr; Back to blog
              </a>
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default Post;
