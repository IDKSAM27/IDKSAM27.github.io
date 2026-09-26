import React from 'react';
import Link from 'next/link';

export default function BookSidebar({
  books = [],
  genres = [],
  selectedGenre = 'All',
  onSelectGenre,
  searchQuery = '',
  onSearchChange,
  sortBy = 'date-desc',
  onSortChange,
}) {
  const totalBooks = books.length;
  const latestBook = books[0]; // Newest read book

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
      {/* 1. Artistic Ex-Libris Bookplate */}
      <div className="relative p-5 rounded-xl border border-black/15 dark:border-white/15 bg-white/70 dark:bg-[#2A2E35]/60 shadow-sm overflow-hidden">
        {/* Subtle vintage parchment accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent-light/10 dark:from-accent-dark/10 to-transparent rounded-bl-full pointer-events-none" />

        <div className="flex items-center gap-2 mb-2">
          <span className="text-accent-light dark:text-accent-dark font-cinzel text-base">✦</span>
          <h2 className="font-cinzel tracking-[0.2em] text-xs uppercase font-bold text-text-light dark:text-text-dark">
            Ex Libris Sampreet
          </h2>
        </div>

        <p className="font-vintage italic text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          &ldquo;I read not to pass time, but to build durable mental models, dismantle assumptions, and learn from those who engineered before us.&rdquo;
        </p>

        {/* Small artistic footer rule */}
        <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span className="font-cinzel text-[10px] tracking-wider uppercase">Field Notes</span>
          <span className="font-fun text-accent-light dark:text-accent-dark text-xs">Curated Shelf</span>
        </div>
      </div>

      {/* 2. Reading Metrics / Stats Card */}
      <div className="p-5 rounded-xl border border-black/15 dark:border-white/15 bg-white/70 dark:bg-[#2A2E35]/60 shadow-sm">
        <h3 className="font-cinzel tracking-wider text-xs uppercase font-semibold text-text-light dark:text-text-dark mb-4 flex items-center justify-between">
          <span>Cabinet Metrics</span>
          <span className="text-[10px] font-mono text-slate-500">2023 &ndash; 2025</span>
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-hero-1-light dark:bg-hero-1-dark border border-black/5 dark:border-white/5 text-center">
            <span className="block font-heading text-2xl font-bold text-text-light dark:text-text-dark">
              {totalBooks}
            </span>
            <span className="text-[10px] uppercase tracking-wider font-cinzel text-slate-500 dark:text-slate-400">
              Volumes Read
            </span>
          </div>

          <div className="p-3 rounded-lg bg-hero-1-light dark:bg-hero-1-dark border border-black/5 dark:border-white/5 text-center">
            <span className="block font-heading text-2xl font-bold text-accent-light dark:text-accent-dark">
              100%
            </span>
            <span className="text-[10px] uppercase tracking-wider font-cinzel text-slate-500 dark:text-slate-400">
              Annotated
            </span>
          </div>
        </div>
      </div>

      {/* 3. Search & Sort Controls */}
      <div className="p-5 rounded-xl border border-black/15 dark:border-white/15 bg-white/70 dark:bg-[#2A2E35]/60 shadow-sm space-y-4">
        <div>
          <label
            htmlFor="book-search"
            className="block font-cinzel text-xs uppercase tracking-wider font-semibold text-text-light dark:text-text-dark mb-2"
          >
            Search Volumes
          </label>
          <div className="relative">
            <input
              id="book-search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filter by title or author..."
              className="w-full px-3 py-2 text-xs rounded-lg bg-hero-1-light dark:bg-hero-1-dark border border-black/15 dark:border-white/15 focus:outline-none focus:ring-1 focus:ring-accent-light dark:focus:ring-accent-dark text-text-light dark:text-text-dark placeholder-slate-400 dark:placeholder-slate-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-text-light dark:hover:text-text-dark text-xs"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="book-sort"
            className="block font-cinzel text-xs uppercase tracking-wider font-semibold text-text-light dark:text-text-dark mb-2"
          >
            Chronology & Order
          </label>
          <select
            id="book-sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg bg-hero-1-light dark:bg-hero-1-dark border border-black/15 dark:border-white/15 focus:outline-none focus:ring-1 focus:ring-accent-light dark:focus:ring-accent-dark text-text-light dark:text-text-dark transition-all cursor-pointer"
          >
            <option value="date-desc">Newest Read First</option>
            <option value="date-asc">Oldest Read First</option>
            <option value="rating-desc">Highest Rated</option>
            <option value="title-asc">Title (A &ndash; Z)</option>
          </select>
        </div>
      </div>

      {/* 4. Interactive Genre Filter */}
      <div className="p-5 rounded-xl border border-black/15 dark:border-white/15 bg-white/70 dark:bg-[#2A2E35]/60 shadow-sm">
        <h3 className="font-cinzel tracking-wider text-xs uppercase font-semibold text-text-light dark:text-text-dark mb-3 flex items-center justify-between">
          <span>Filter by Genre</span>
          <span className="text-[10px] font-mono text-slate-500">{genres.length} Genres</span>
        </h3>

        <div className="flex flex-wrap lg:flex-col gap-1.5">
          <button
            type="button"
            onClick={() => onSelectGenre('All')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
              selectedGenre === 'All'
                ? 'bg-accent-light text-white dark:bg-accent-dark dark:text-slate-900 shadow-sm font-semibold'
                : 'bg-hero-1-light/70 dark:bg-hero-1-dark/70 hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
            }`}
          >
            <span className="font-cinzel text-[11px] tracking-wider uppercase">All Volumes</span>
            <span className="text-[10px] font-mono opacity-80">({books.length})</span>
          </button>

          {genres.map(({ name, count }) => {
            const isSelected = selectedGenre === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => onSelectGenre(name)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-accent-light text-white dark:bg-accent-dark dark:text-slate-900 shadow-sm font-semibold'
                    : 'bg-hero-1-light/70 dark:bg-hero-1-dark/70 hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="truncate pr-2">{name}</span>
                <span className="text-[10px] font-mono opacity-80 flex-shrink-0">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Latest Pickup Highlight */}
      {latestBook && (
        <div className="p-5 rounded-xl border border-black/15 dark:border-white/15 bg-white/70 dark:bg-[#2A2E35]/60 shadow-sm">
          <span className="text-[10px] font-cinzel uppercase tracking-[0.2em] text-accent-light dark:text-accent-dark font-bold block mb-1">
            Latest Volume Completed
          </span>
          <Link href={`/books/${latestBook.slug}`} className="group block">
            <h4 className="font-heading font-bold text-sm text-text-light dark:text-text-dark group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors line-clamp-1">
              {latestBook.title}
            </h4>
            <p className="text-xs font-vintage italic text-slate-600 dark:text-slate-400">
              {latestBook.author} &bull; {latestBook.dateFormatted}
            </p>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
              {latestBook.excerpt}
            </p>
          </Link>
        </div>
      )}
    </aside>
  );
}
