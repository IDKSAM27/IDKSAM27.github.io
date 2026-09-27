import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/**
 * StarRating — compact SVG stars for modal book cards
 */
function StarRating({ rating, size = 13 }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="inline-flex items-center gap-[2px]">
      {Array.from({ length: full }).map((_, i) => (
        <svg
          key={`f${i}`}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="#FACC15"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(234,179,8,0.4))' }}
        >
          <path d="M12 2l2.9 6.26L22 9.27l-5 5.14 1.18 7.14L12 18.27l-6.18 3.28L7 14.41 2 9.27l7.1-1.01L12 2z" />
        </svg>
      ))}
      {half && (
        <svg
          key="h"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(234,179,8,0.4))' }}
        >
          <defs>
            <linearGradient id="hg-modal-bg">
              <stop offset="50%" stopColor="#FACC15" />
              <stop offset="50%" stopColor="#64748B" />
            </linearGradient>
          </defs>
          <path
            d="M12 2l2.9 6.26L22 9.27l-5 5.14 1.18 7.14L12 18.27l-6.18 3.28L7 14.41 2 9.27l7.1-1.01L12 2z"
            fill="url(#hg-modal-bg)"
          />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg
          key={`e${i}`}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="#64748B"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.5 }}
        >
          <path d="M12 2l2.9 6.26L22 9.27l-5 5.14 1.18 7.14L12 18.27l-6.18 3.28L7 14.41 2 9.27l7.1-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * A single book card inside the modal.
 * Bigger card, spring distribute animation on open.
 */
function ModalBookCard({ book, index, visible, onNavigate }) {
  const ref = useRef(null);
  const delay = index * 60; // ms stagger per card

  return (
    <Link
      href={`/books/${book.slug}`}
      onClick={onNavigate}
      ref={ref}
      className="group flex flex-col focus:outline-none w-44 sm:w-52 flex-shrink-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.85)',
        transition: `opacity 0.4s ease ${delay}ms, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
      }}
    >
      {/* Bigger Book Cover with 3D perspective animation */}
      <div className="relative w-full aspect-[2/3] book-3d-wrap">
        <div className="book-3d-inside" />
        <div className="book-3d-cover overflow-hidden rounded-r-md rounded-l-sm">
          <img
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Spine shadow */}
          <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />
          <div className="book-3d-effect" />
          <div className="book-3d-light" />
        </div>
        {/* Book number badge */}
        <div className="absolute top-2 right-2 z-20 bg-black/70 text-white font-mono text-[10px] px-2 py-0.5 rounded-sm leading-none backdrop-blur-md border border-white/10 pointer-events-none">
          #{book.number}
        </div>
      </div>

      {/* Details */}
      <div className="mt-2.5 space-y-1 text-center sm:text-left px-0.5">
        <h4 className="font-secondary text-sm sm:text-base font-semibold text-white group-hover:text-amber-300 transition-colors leading-snug">
          {book.shortTitle || book.title}
        </h4>
        <div className="flex items-center justify-center sm:justify-start gap-1.5 pt-0.5">
          <StarRating rating={book.rating} size={13} />
          <span className="text-xs font-mono text-slate-300">{book.rating}/5</span>
        </div>
      </div>
    </Link>
  );
}

/**
 * CollectionModal — floating blurred overlay without box container.
 * Max 3 books per row, centered in middle of screen.
 */
export default function CollectionModal({ collection, onClose }) {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
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
    setVisible(false);
    setTimeout(onClose, 320);
  }

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) handleClose();
  }

  if (!collection) return null;

  const { title, author, genre, dateFormatted, excerpt, collectionNote, books = [] } = collection;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-8"
      style={{
        backgroundColor: visible ? 'rgba(0, 0, 0, 0.82)' : 'rgba(0, 0, 0, 0)',
        backdropFilter: visible ? 'blur(16px)' : 'blur(0px)',
        WebkitBackdropFilter: visible ? 'blur(16px)' : 'blur(0px)',
        transition: 'background-color 0.35s ease, backdrop-filter 0.35s ease, -webkit-backdrop-filter 0.35s ease',
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} collection`}
    >
      {/* Floating Close Button */}
      <button
        type="button"
        onClick={handleClose}
        className="fixed top-5 right-5 sm:top-8 sm:right-8 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/15 focus:outline-none"
        aria-label="Close collection"
      >
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
          <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Main Content Container (No box container!) */}
      <div
        className="relative w-full max-w-4xl mx-auto text-center my-auto py-8 px-2"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
          transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.34,1.2,0.64,1)',
        }}
      >
        {/* Header Text directly on blurred background */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              {genre} Series
            </span>
            <span className="text-xs font-mono text-slate-300">{dateFormatted}</span>
          </div>

          <h2 className="font-secondary text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-2 tracking-tight">
            {title}
          </h2>

          <p className="font-vintage italic text-lg sm:text-xl text-slate-300 mb-4">
            {author}
          </p>

          {excerpt && (
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
              {excerpt}
            </p>
          )}

          {collectionNote && (
            <p className="mt-2 text-xs font-mono text-slate-400 italic">
              — {collectionNote}
            </p>
          )}
        </div>

        {/* Books Grid — max 3 books per row, leftover items centered */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 max-w-3xl mx-auto">
          {books.map((book, i) => (
            <ModalBookCard
              key={book.slug}
              book={book}
              index={i}
              visible={visible}
              onNavigate={handleClose}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
