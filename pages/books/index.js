import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNav from '../../components/MobileNav';
import Seo from '../../components/Seo';
import BookCard from '../../components/books/BookCard';
import booksData from '../../data/books.json';

export async function getStaticProps() {
  const allBooks = booksData.map(({ summaryHtml, thoughtsHtml, ...rest }) => ({
    ...rest,
  }));

  return {
    props: {
      allBooks,
    },
  };
}

export default function BooksIndex({ allBooks = [] }) {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');

  // Compute unique genres with counts
  const genres = useMemo(() => {
    const counts = {};
    allBooks.forEach((book) => {
      if (book.genre) {
        counts[book.genre] = (counts[book.genre] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [allBooks]);

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    let result = [...allBooks];

    // Filter by genre
    if (selectedGenre !== 'All') {
      result = result.filter((book) => book.genre === selectedGenre);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (book) =>
          book.title?.toLowerCase().includes(q) ||
          book.author?.toLowerCase().includes(q) ||
          book.subtitle?.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'date-desc') {
        return (a.dateRead || '') < (b.dateRead || '') ? 1 : -1;
      }
      if (sortBy === 'date-asc') {
        return (a.dateRead || '') > (b.dateRead || '') ? 1 : -1;
      }
      if (sortBy === 'rating-desc') {
        return (b.rating || 0) - (a.rating || 0);
      }
      if (sortBy === 'title-asc') {
        return (a.title || '').localeCompare(b.title || '');
      }
      return 0;
    });

    return result;
  }, [allBooks, selectedGenre, searchQuery, sortBy]);

  return (
    <div className="flex flex-col min-h-screen bg-hero-1-light dark:bg-hero-1-dark text-text-light dark:text-text-dark">
      <Seo
        title="Bookshelf & Reading Notes | Sampreet Patil"
        description="A curated record of books read, annotated, and reflected upon by Sampreet Patil."
        url="https://sampreetpatil.com/books"
      />
      <Head>
        <title>Bookshelf &amp; Reading Notes | Sampreet Patil</title>
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 lg:px-12 py-12 sm:py-20">
        {/* Header Hero Area */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
          <p className="font-cinzel text-xs uppercase tracking-[0.25em] text-accent-light dark:text-accent-dark font-bold mb-3">
            Ex Libris &bull; Curated Volumes
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6 tracking-tight">
            Bookshelf &amp; Reading Notes
          </h1>

          <p className="font-vintage italic text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            A chronicle of books that shaped my worldview, engineering principles, and creative instincts. Complete with margin notes, reflections, and key takeaways.
          </p>
        </div>

        {/* Sleek Search & Filter Bar (No clumsy boxes) */}
        <div className="max-w-6xl mx-auto mb-12 space-y-6">
          {/* Top row: search input and sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-black/10 dark:border-white/10">
            {/* Minimalist search input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title or author..."
                className="w-full bg-transparent border-b border-black/20 dark:border-white/20 focus:border-accent-light dark:focus:border-accent-dark py-1.5 pl-1 pr-6 text-sm text-text-light dark:text-text-dark placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-text-light dark:hover:text-text-dark text-sm cursor-pointer"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Sleek Sort dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-slate-500 dark:text-slate-400">
              <span className="font-mono text-[11px] uppercase tracking-wider">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-b border-black/20 dark:border-white/20 py-1 text-xs text-text-light dark:text-text-dark focus:outline-none focus:border-accent-light dark:focus:border-accent-dark cursor-pointer font-medium"
              >
                <option value="date-desc" className="bg-hero-1-light dark:bg-hero-1-dark">Newest Read</option>
                <option value="date-asc" className="bg-hero-1-light dark:bg-hero-1-dark">Oldest Read</option>
                <option value="rating-desc" className="bg-hero-1-light dark:bg-hero-1-dark">Highest Rated</option>
                <option value="title-asc" className="bg-hero-1-light dark:bg-hero-1-dark">Title (A &ndash; Z)</option>
              </select>
            </div>
          </div>

          {/* Bottom row: Sleek Genre Filter Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            <button
              type="button"
              onClick={() => setSelectedGenre('All')}
              className={`px-3 py-1.5 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer ${
                selectedGenre === 'All'
                  ? 'bg-accent-light text-white dark:bg-accent-dark dark:text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-text-light dark:hover:text-text-dark'
              }`}
            >
              All Volumes ({allBooks.length})
            </button>

            {genres.map(({ name, count }) => {
              const isSelected = selectedGenre === name;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setSelectedGenre(name)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-accent-light text-white dark:bg-accent-dark dark:text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-text-light dark:hover:text-text-dark'
                  }`}
                >
                  {name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Book Grid Area */}
        <div className="max-w-6xl mx-auto">
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
              {filteredBooks.map((book) => (
                <BookCard key={book.slug} book={book} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center max-w-md mx-auto">
              <p className="font-vintage italic text-base text-slate-500 dark:text-slate-400 mb-4">
                No volumes match your criteria.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedGenre('All');
                  setSearchQuery('');
                }}
                className="text-xs uppercase tracking-wider font-cinzel text-accent-light dark:text-accent-dark hover:underline font-bold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
