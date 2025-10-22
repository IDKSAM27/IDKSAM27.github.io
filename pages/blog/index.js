import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNav from '../../components/MobileNav';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getStaticProps() {
  // All the logic from lib/posts.js is now directly inside here
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      id,
      ...matterResult.data,
    };
  });

  const sortedPosts = allPostsData.sort((a, b) => (a.date > b.date ? 1 : -1));

  return {
    props: {
      allPostsData: sortedPosts,
    },
  };
}


const BlogHome = ({ allPostsData }) => {
  return (
    <div className="flex flex-col min-h-screen bg-secondary dark:bg-primary">
      <Head>
        <title>Blog | Sampreet Patil</title>
      </Head>
      <Header />

      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-12 text-center text-text-light dark:text-text-dark">My Blog</h1>
        <div className="max-w-3xl mx-auto space-y-8">
          {allPostsData.map(({ id, date, title, excerpt }) => (
            <Link href={`/blog/${id}`} key={id} legacyBehavior>
              <a className="block p-6 bg-white dark:bg-slate-800/50 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer">
                <h2 className="text-2xl font-bold text-accent-light dark:text-accent-dark mb-2">{title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{date}</p>
                <p className="text-slate-600 dark:text-slate-300">{excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

export default BlogHome;
