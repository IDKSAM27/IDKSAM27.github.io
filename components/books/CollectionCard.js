import React from 'react';

/**
 * CollectionCard — a reusable card for book franchise/series collections.
 * Shows a mosaic of up to 7 cover images arranged in a book-grid pattern.
 * Click opens a CollectionModal with the distribute animation.
 *
 * Props:
 *   collection  — one entry from collections.json
 *   onClick     — called when the card is clicked
 */
export default function CollectionCard({ collection, onClick }) {
  const { title, author, genre, dateFormatted, coverImages = [], coverColor = '#1A1040', coverAccent = '#FFD700' } = collection;
  // Show up to 7 covers in the mosaic
  const covers = coverImages.slice(0, 7);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group block focus:outline-none text-left w-full cursor-pointer"
      aria-label={`Open ${title} collection`}
    >
      <div className="flex flex-col">
        {/* Mosaic Cover */}
        <div
          className="relative mb-3 w-full aspect-[2/3] rounded-r-md rounded-l-sm overflow-hidden book-spine-depth transform transition-transform duration-300 ease-out group-hover:-translate-y-2"
          style={{ backgroundColor: coverColor }}
        >
          {/* Spine shadow */}
          <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none z-10" />

          {/* Mosaic grid of covers — 3 on top, 2 middle, 2 bottom */}
          <div className="absolute inset-0 grid grid-rows-3 gap-[2px] p-[6px]">
            {/* Row 1: 3 covers */}
            <div className="grid grid-cols-3 gap-[2px]">
              {[0, 1, 2].map((i) =>
                covers[i] ? (
                  <div key={i} className="relative overflow-hidden rounded-[2px] bg-black/20">
                    <img
                      src={covers[i]}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div key={i} className="rounded-[2px]" style={{ backgroundColor: coverAccent + '22' }} />
                )
              )}
            </div>
            {/* Row 2: 2 covers */}
            <div className="grid grid-cols-2 gap-[2px]">
              {[3, 4].map((i) =>
                covers[i] ? (
                  <div key={i} className="relative overflow-hidden rounded-[2px] bg-black/20">
                    <img
                      src={covers[i]}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div key={i} className="rounded-[2px]" style={{ backgroundColor: coverAccent + '22' }} />
                )
              )}
            </div>
            {/* Row 3: 2 covers */}
            <div className="grid grid-cols-2 gap-[2px]">
              {[5, 6].map((i) =>
                covers[i] ? (
                  <div key={i} className="relative overflow-hidden rounded-[2px] bg-black/20">
                    <img
                      src={covers[i]}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div key={i} className="rounded-[2px]" style={{ backgroundColor: coverAccent + '22' }} />
                )
              )}
            </div>
          </div>

          {/* Collection label overlay at bottom */}
          <div
            className="absolute bottom-0 inset-x-0 px-2 py-2 z-20"
            style={{ background: `linear-gradient(to top, ${coverColor}EE 60%, transparent)` }}
          >
            <span
              className="block text-center font-cinzel text-[9px] uppercase tracking-[0.2em] font-bold"
              style={{ color: coverAccent }}
            >
              Series Collection
            </span>
          </div>

          {/* Glossy sheen */}
          <div className="absolute top-0 inset-x-0 h-1/4 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-20" />
        </div>

        {/* Card details */}
        <div className="mt-1 space-y-1.5 text-left px-0.5">
          {/* Genre & date */}
          <div className="flex items-center justify-between gap-2 text-[10px] font-mono tracking-wide text-slate-500 dark:text-slate-400">
            <span className="capitalize">{genre}</span>
            <span className="flex-shrink-0 opacity-75">{dateFormatted}</span>
          </div>

          {/* Title */}
          <h3 className="font-secondary text-sm sm:text-[15px] font-semibold text-text-light dark:text-text-dark group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors leading-snug">
            {title}
          </h3>

          {/* Author */}
          <p className="font-vintage italic text-xs text-slate-600 dark:text-slate-400">
            {author}
          </p>

          {/* Book count badge */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
              {coverImages.length} books
            </span>
            <span className="text-[10px] text-slate-300 dark:text-slate-600">·</span>
            <span className="text-[10px] font-mono text-accent-light dark:text-accent-dark">
              Click to explore ↗
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
