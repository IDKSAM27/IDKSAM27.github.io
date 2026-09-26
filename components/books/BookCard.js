import React from 'react';
import Link from 'next/link';
import BookCover from './BookCover';

export default function BookCard({ book }) {
  const {
    slug,
    title,
    author,
    dateFormatted,
    genre,
    rating,
    coverColor,
    coverAccent,
    coverImage,
    subtitle,
  } = book;

  return (
    <Link href={`/books/${slug}`} className="group block focus:outline-none">
      <div className="flex flex-col">
        {/* Book Cover with 3D physical lift on hover */}
        <div className="relative mb-3 flex justify-center transform transition-transform duration-300 ease-out group-hover:-translate-y-2">
          <BookCover
            title={title}
            subtitle={subtitle}
            author={author}
            dateFormatted={dateFormatted}
            genre={genre}
            coverColor={coverColor}
            coverAccent={coverAccent}
            coverImage={coverImage}
            size="md"
          />
        </div>

        {/* Minimalist Details directly below the cover (No box card wrapper) */}
        <div className="mt-1 space-y-1 text-left px-0.5">
          {/* Sleek editorial tag: genre & date */}
          <div className="flex items-center justify-between gap-1 text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
            <span className="truncate">{genre}</span>
            <span className="flex-shrink-0 opacity-75">{dateFormatted}</span>
          </div>

          {/* Book Title */}
          <h3 className="font-heading text-base sm:text-lg font-bold text-text-light dark:text-text-dark group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors line-clamp-1 leading-snug">
            {title}
          </h3>

          {/* Author & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <p className="font-vintage italic line-clamp-1">
              {author}
            </p>
            {rating && (
              <span className="text-amber-500 font-mono text-[11px] tracking-tight ml-2 flex-shrink-0" title={`${rating}/5`}>
                {'★'.repeat(Math.floor(rating))}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
