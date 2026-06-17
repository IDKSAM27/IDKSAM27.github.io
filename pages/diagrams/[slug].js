import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Seo from '../../components/Seo';
import MobileNav from '../../components/MobileNav';
import diagramsData from '../../data/diagrams.json';

export default function DiagramPage({ diagram }) {
  if (!diagram) return <div>Diagram not found</div>;

  return (
    <div className="flex flex-col min-h-screen bg-secondary dark:bg-primary">
      <Seo
        title={`${diagram.title} | Cache Me If You Can`}
        description={diagram.description}
        url={`https://www.sampreetpatil.com/diagrams/${diagram.slug}`}
      />
      <Header />

      <main className="flex-grow container mx-auto px-4 py-6 md:py-16">
        <article className="max-w-4xl mx-auto">
          <header className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-3">
              {diagram.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">{diagram.date}</p>
          </header>

          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              {diagram.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {diagram.youtubeUrl && (
              <a 
                href={diagram.youtubeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold rounded-lg shadow-md transition-colors"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
                Watch on YouTube
              </a>
            )}
            <a 
              href={diagram.image} 
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Diagram
            </a>
          </div>

          <div className="mb-8 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg bg-white dark:bg-slate-900 flex justify-center">
            <img 
              src={diagram.image} 
              alt={diagram.title} 
              className="max-w-full h-auto object-contain"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://via.placeholder.com/1200x800?text=Image+Not+Found";
              }}
            />
          </div>

          <div className="mt-8">
            <Link href="/diagrams" legacyBehavior>
              <a className="text-accent hover:underline text-text-light dark:text-text-dark font-medium">
                &larr; Back to diagrams
              </a>
            </Link>
          </div>
        </article>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = diagramsData.map((diagram) => ({
    params: { slug: diagram.slug },
  }));

  return {
    paths,
    fallback: false, 
  };
}

export async function getStaticProps({ params }) {
  const diagram = diagramsData.find((d) => d.slug === params.slug);

  return {
    props: {
      diagram: diagram || null,
    },
  };
}
