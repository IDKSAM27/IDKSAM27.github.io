import React from 'react';
import Link from 'next/link';
import BookCover from './BookCover';

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <svg
          key={`full-${i}`}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="#FACC15"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 1px 1px rgba(234,179,8,0.3))' }}
        >
          <path d="M12 2l2.9 6.26L22 9.27l-5 5.14 1.18 7.14L12 18.27l-6.18 3.28L7 14.41 2 9.27l7.1-1.01L12 2z" />
        </svg>
      ))}
      {half && (
        <svg
          key="half"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 1px 1px rgba(234,179,8,0.3))' }}
        >
          <defs>
            <linearGradient id="half-grad">
              <stop offset="50%" stopColor="#FACC15" />
              <stop offset="50%" stopColor="#CBD5E1" />
            </linearGradient>
          </defs>
          <path
            d="M12 2l2.9 6.26L22 9.27l-5 5.14 1.18 7.14L12 18.27l-6.18 3.28L7 14.41 2 9.27l7.1-1.01L12 2z"
            fill="url(#half-grad)"
          />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg
          key={`empty-${i}`}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="#CBD5E1"
          xmlns="http://www.w3.org/2000/svg"
          className="dark:opacity-30"
        >
          <path d="M12 2l2.9 6.26L22 9.27l-5 5.14 1.18 7.14L12 18.27l-6.18 3.28L7 14.41 2 9.27l7.1-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

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

        {/* Card details below cover */}
        <div className="mt-1 space-y-1.5 text-left px-0.5">
          {/* Genre & date — same line, no truncation */}
          <div className="flex items-center justify-between gap-2 text-[10px] font-mono tracking-wide text-slate-500 dark:text-slate-400">
            <span className="text-[10px] capitalize">{genre}</span>
            <span className="flex-shrink-0 opacity-75 text-[10px]">{dateFormatted}</span>
          </div>

          {/* Book title — full, multi-line, Syne font */}
          <h3 className="font-secondary text-sm sm:text-[15px] font-semibold text-text-light dark:text-text-dark group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors leading-snug">
            {title}
          </h3>

          {/* Author */}
          <p className="font-vintage italic text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
            {author}
          </p>

          {/* Stars + rating count */}
          {rating && (
            <div className="flex items-center gap-1.5 pt-0.5">
              <StarRating rating={rating} />
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                {rating}/5
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
