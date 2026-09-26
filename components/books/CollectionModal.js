import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/**
 * StarRating — compact SVG stars for modal book cards
 */
function StarRating({ rating, size = 12 }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="inline-flex items-center gap-[2px]">
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} width={size} height={size} viewBox="0 0 24 24" fill="#FACC15" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 1px 1px rgba(234,179,8,0.3))' }}>
          <path d="M12 2l2.9 6.26L22 9.27l-5 5.14 1.18 7.14L12 18.27l-6.18 3.28L7 14.41 2 9.27l7.1-1.01L12 2z" />
        </svg>
      ))}
      {half && (
        <svg key="h" width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 1px 1px rgba(234,179,8,0.3))' }}>
          <defs><linearGradient id={`hg-modal`}><stop offset="50%" stopColor="#FACC15" /><stop offset="50%" stopColor="#CBD5E1" /></linearGradient></defs>
          <path d="M12 2l2.9 6.26L22 9.27l-5 5.14 1.18 7.14L12 18.27l-6.18 3.28L7 14.41 2 9.27l7.1-1.01L12 2z" fill={`url(#hg-modal)`} />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} width={size} height={size} viewBox="0 0 24 24" fill="#CBD5E1" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.4 }}>
          <path d="M12 2l2.9 6.26L22 9.27l-5 5.14 1.18 7.14L12 18.27l-6.18 3.28L7 14.41 2 9.27l7.1-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * A single book mini-card inside the modal.
 * Animates from the centre to its final position (distribute effect).
 */
function ModalBookCard({ book, index, total, visible, onNavigate }) {
  const ref = useRef(null);

  // Compute staggered transform for entrance animation
  // Cards fan out from center like cards being dealt
  const delay = index * 55; // ms stagger per card

  return (
    <Link
      href={`/books/${book.slug}`}
      onClick={onNavigate}
      ref={ref}
      className="group flex flex-col focus:outline-none"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.88)',
        transition: `opacity 0.38s ease ${delay}ms, transform 0.38s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
      }}
    >
      {/* Cover */}
      <div className="relative w-full aspect-[2/3] rounded-r-md rounded-l-sm overflow-hidden book-spine-depth transform transition-transform duration-300 group-hover:-translate-y-1.5">
        <img
          src={book.coverImage}
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Spine shadow */}
        <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/50 via-black/15 to-transparent pointer-events-none" />
        {/* Book number badge */}
        <div className="absolute top-1.5 right-1.5 bg-black/60 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-sm leading-none backdrop-blur-sm">
          #{book.number}
        </div>
      </div>

      {/* Details */}
      <div className="mt-2 space-y-1 px-0.5">
        <h4 className="font-secondary text-[12px] sm:text-[13px] font-semibold text-text-light dark:text-text-dark group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors leading-snug">
          {book.shortTitle || book.title}
        </h4>
        <div className="flex items-center gap-1.5">
          <StarRating rating={book.rating} size={11} />
          <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400">{book.rating}</span>
        </div>
      </div>
    </Link>
  );
}

/**
 * CollectionModal — reusable modal that "distributes" collection books with animation.
 *
 * Props:
 *   collection  — one entry from collections.json
 *   onClose     — called to dismiss the modal
 */
export default function CollectionModal({ collection, onClose }) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const overlayRef = useRef(null);

  // Trigger entrance animation after mount
  useEffect(() => {
    // Small delay so the CSS transition fires after paint
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Keyboard: Escape to close
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') handleClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function handleClose() {
    setClosing(true);
    setVisible(false);
    setTimeout(onClose, 320);
  }

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) handleClose();
  }

  if (!collection) return null;

  const { title, author, genre, dateFormatted, excerpt, collectionNote, books = [], coverColor = '#1A1040', coverAccent = '#FFD700' } = collection;

  return (
    /* Backdrop */
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      style={{
        backgroundColor: visible ? 'rgba(0,0,0,0.72)' : 'rgba(0,0,0,0)',
        backdropFilter: visible ? 'blur(6px)' : 'blur(0px)',
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} collection`}
    >
      {/* Modal Panel */}
      <div
        className="relative w-full max-w-5xl mx-auto my-8 rounded-xl overflow-hidden shadow-2xl bg-[#faf8f5] dark:bg-[#1e1e1e]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
          transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.2,0.64,1)',
        }}
      >
        <div>
          {/* Header bar with collection accent colour */}
          <div
            className="relative px-6 sm:px-8 pt-7 pb-6"
            style={{ borderBottom: `1px solid ${coverAccent}28` }}
          >
            {/* Collection accent strip at top */}
            <div className="absolute top-0 inset-x-0 h-1 rounded-t-xl" style={{ background: `linear-gradient(to right, ${coverAccent}, ${coverColor})` }} />

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Meta row */}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: coverAccent + '22', color: coverAccent }}
                  >
                    {genre} Series
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{dateFormatted}</span>
                  <span className="text-[10px] font-mono text-slate-400">·</span>
                  <span className="text-[10px] font-mono text-slate-400">{books.length} books</span>
                </div>

                {/* Title */}
                <h2 className="font-secondary text-2xl sm:text-3xl font-bold text-text-light dark:text-text-dark leading-tight mb-1">
                  {title}
                </h2>
                <p className="font-vintage italic text-sm text-slate-600 dark:text-slate-400 mb-0">
                  {author}
                </p>

                {/* Excerpt */}
                {excerpt && (
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                    {excerpt}
                  </p>
                )}
                {collectionNote && (
                  <p className="mt-1.5 text-xs font-mono text-slate-400 dark:text-slate-500 italic">
                    — {collectionNote}
                  </p>
                )}
              </div>

              {/* Close button */}
              <button
                type="button"
                onClick={handleClose}
                className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-text-light dark:hover:text-text-dark hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer focus:outline-none"
                aria-label="Close collection"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Books grid — distributes with stagger animation */}
          <div className="px-6 sm:px-8 py-7">
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-5">
              Click any book to read notes →
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 sm:gap-5">
              {books.map((book, i) => (
                <ModalBookCard
                  key={book.slug}
                  book={book}
                  index={i}
                  total={books.length}
                  visible={visible}
                  onNavigate={handleClose}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
