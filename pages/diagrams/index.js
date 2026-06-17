import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNav from '../../components/MobileNav';
import diagramsData from '../../data/diagrams.json';

export default function DiagramsIndex() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary dark:bg-primary">
      <Head>
        <title>Architecture Diagrams | Cache Me If You Can</title>
        <meta name="description" content="Architecture diagrams from the Cache Me If You Can YouTube channel." />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-12 text-center text-text-light dark:text-text-dark">Architecture Diagrams</h1>
        
        <div className="max-w-3xl mx-auto space-y-8">
          {diagramsData.map((diagram) => (
            <Link key={diagram.slug} href={`/diagrams/${diagram.slug}`} legacyBehavior>
              <a className="block p-6 bg-white dark:bg-slate-800/50 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer">
                <h2 className="text-2xl font-bold text-accent-light dark:text-accent-dark mb-2">
                  {diagram.title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                  {diagram.date}
                </p>
                <div className="flex flex-col sm:flex-row gap-6 mt-4">
                  <div className="sm:w-1/3 flex-shrink-0">
                    <img 
                      src={diagram.image} 
                      alt={diagram.title} 
                      className="object-cover w-full h-32 rounded bg-gray-200 dark:bg-gray-800"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "https://via.placeholder.com/600x400?text=Diagram+Coming+Soon";
                      }}
                    />
                  </div>
                  <div className="sm:w-2/3">
                    <p className="text-slate-600 dark:text-slate-300">
                      {diagram.description}
                    </p>
                    <div className="mt-4 text-sm font-semibold text-accent hover:underline text-text-light dark:text-text-dark">
                      View full diagram &rarr;
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
