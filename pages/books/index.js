import React, { useState, useMemo, useRef, useEffect } from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNav from '../../components/MobileNav';
import Seo from '../../components/Seo';
import BookCard from '../../components/books/BookCard';
import CollectionCard from '../../components/books/CollectionCard';
import CollectionModal from '../../components/books/CollectionModal';
import booksData from '../../data/books.json';
import collectionsData from '../../data/collections.json';

export async function getStaticProps() {
  const allBooks = booksData.map(({ summaryHtml, thoughtsHtml, ...rest }) => ({
    ...rest,
  }));

  // Strip heavy content from collections for the index page
  const allCollections = collectionsData.map(({ books, ...rest }) => ({
    ...rest,
    books: (books || []).map(({ summaryHtml, thoughtsHtml, ...b }) => b),
  }));

  return {
    props: {
      allBooks,
      allCollections,
    },
  };
}

const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Newest Read' },
  { value: 'date-asc', label: 'Oldest Read' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'title-asc', label: 'Title (A – Z)' },
];

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = SORT_OPTIONS.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="relative flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"
      ref={ref}
    >
      <span className="font-mono text-[11px] uppercase tracking-wider select-none">Sort:</span>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 border-b border-black/20 dark:border-white/20 py-1 px-0.5 text-xs text-text-light dark:text-text-dark font-medium focus:outline-none hover:border-accent-light dark:hover:border-accent-dark transition-colors cursor-pointer min-w-[110px] justify-between"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected?.label}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className={`flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path
            d="M2 3.5L5 6.5L8 3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1 z-50 min-w-[140px] bg-hero-1-light dark:bg-hero-1-dark border border-black/10 dark:border-white/10 shadow-lg rounded-sm overflow-hidden"
          role="listbox"
        >
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={value === opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-[11px] font-medium tracking-wide transition-colors cursor-pointer ${
                value === opt.value
                  ? 'text-accent-light dark:text-accent-dark bg-black/5 dark:bg-white/5'
                  : 'text-text-light dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BooksIndex({ allBooks = [], allCollections = [] }) {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [activeCollection, setActiveCollection] = useState(null);

  // Compute unique genres with counts (regular books only)
  const genres = useMemo(() => {
    const counts = {};
    allBooks.forEach((book) => {
      if (book.genre) {
        counts[book.genre] = (counts[book.genre] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [allBooks]);

  // Filter and sort regular books
  const filteredBooks = useMemo(() => {
    let result = [...allBooks];

    if (selectedGenre !== 'All') {
      result = result.filter((book) => book.genre === selectedGenre);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (book) =>
          book.title?.toLowerCase().includes(q) ||
          book.author?.toLowerCase().includes(q) ||
          book.subtitle?.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'date-desc') return (a.dateRead || '') < (b.dateRead || '') ? 1 : -1;
      if (sortBy === 'date-asc') return (a.dateRead || '') > (b.dateRead || '') ? 1 : -1;
      if (sortBy === 'rating-desc') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'title-asc') return (a.title || '').localeCompare(b.title || '');
      return 0;
    });

    return result;
  }, [allBooks, selectedGenre, searchQuery, sortBy]);

  // Filter collections by search query
  const filteredCollections = useMemo(() => {
    if (selectedGenre !== 'All') return []; // collections are not genre-filtered for simplicity
    if (!searchQuery.trim()) return allCollections;
    const q = searchQuery.toLowerCase().trim();
    return allCollections.filter(
      (col) =>
        col.title?.toLowerCase().includes(q) ||
        col.author?.toLowerCase().includes(q)
    );
  }, [allCollections, searchQuery, selectedGenre]);

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
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6 tracking-tight">
            Bookshelf &amp; Reading Notes
          </h1>
          <p className="font-vintage italic text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            A chronicle of books that shaped my worldview, engineering principles, and creative
            instincts. Complete with margin notes, reflections, and key takeaways.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-6xl mx-auto mb-12 space-y-6">
          {/* Top row: search + sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-black/10 dark:border-white/10">
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
            <div className="self-end sm:self-auto">
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>

          {/* Genre Filter Tabs */}
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
              All ({allBooks.length})
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

        {/* Book Grid */}
        <div className="max-w-6xl mx-auto">
          {/* Collections row — shown when genre is All or search matches */}
          {filteredCollections.length > 0 && (
            <div className="mb-10">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5">
                Series &amp; Collections
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
                {filteredCollections.map((col) => (
                  <CollectionCard
                    key={col.slug}
                    collection={col}
                    onClick={() => setActiveCollection(col)}
                  />
                ))}
              </div>
              {/* Thin separator before individual books */}
              {filteredBooks.length > 0 && (
                <div className="mt-10 border-t border-black/10 dark:border-white/10" />
              )}
            </div>
          )}

          {/* Individual books */}
          {filteredBooks.length > 0 ? (
            <>
              {filteredCollections.length > 0 && (
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5">
                  Individual Volumes
                </p>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
                {filteredBooks.map((book) => (
                  <BookCard key={book.slug} book={book} />
                ))}
              </div>
            </>
          ) : filteredCollections.length === 0 ? (
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
          ) : null}
        </div>
      </main>

      {/* Collection Modal — portal-like, renders over everything */}
      {activeCollection && (
        <CollectionModal
          collection={activeCollection}
          onClose={() => setActiveCollection(null)}
        />
      )}

      <Footer />
      <MobileNav />
    </div>
  );
}
