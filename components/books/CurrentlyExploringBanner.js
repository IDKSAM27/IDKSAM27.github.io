import React from 'react';

/**
 * CurrentlyExploringBanner
 * 
 * Reusable component rendered when a book's status is "Reading" / "Currently Reading".
 * Displays a light, magical, floating animation of books, quill feather pens, bookmarks,
 * parchment scrolls, and sparkles floating gently around, topped with an editorial
 * "CURRENTLY EXPLORING" status header.
 */
export default function CurrentlyExploringBanner({ book }) {
  if (!book) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-amber-500/10 via-amber-100/30 to-transparent dark:from-amber-400/10 dark:via-amber-300/5 dark:to-transparent border border-amber-500/20 dark:border-amber-400/20 p-6 sm:p-8 mb-10 text-center shadow-sm select-none">
      
      {/* Dynamic Animated Floating Background Elements (Light & Airy Theme) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Floating Book 1 - Open Tome */}
        <div className="absolute top-[15%] left-[8%] animate-float-slow opacity-70 sm:opacity-85 text-amber-700 dark:text-amber-300 transform -rotate-12">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </div>

        {/* Floating Feather Quill Pen 1 */}
        <div className="absolute top-[25%] right-[10%] animate-float-reverse opacity-75 sm:opacity-90 text-amber-600 dark:text-amber-200 transform rotate-45">
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm">
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L3 13v5h5l12.24-12.24z" />
            <line x1="16" y1="8" x2="2" y2="22" />
            <line x1="17.5" y1="15" x2="9" y2="15" />
          </svg>
        </div>

        {/* Floating Bookmark 1 */}
        <div className="absolute bottom-[20%] left-[18%] animate-float-medium opacity-70 text-amber-600 dark:text-amber-400 transform rotate-6">
          <svg width="28" height="32" viewBox="0 0 24 24" fill="currentColor" opacity="0.8" className="drop-shadow-sm">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </div>

        {/* Floating Closed Book 2 */}
        <div className="absolute bottom-[15%] right-[20%] animate-float-slow opacity-65 sm:opacity-80 text-amber-800 dark:text-amber-300 transform rotate-12">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </div>

        {/* Floating Feather Quill 2 */}
        <div className="absolute top-[60%] left-[5%] animate-float-bob opacity-60 text-amber-500 dark:text-amber-400 transform -rotate-45">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L3 13v5h5l12.24-12.24z" />
            <line x1="16" y1="8" x2="2" y2="22" />
          </svg>
        </div>

        {/* Floating Sparkles & Mythic Stars */}
        <div className="absolute top-[10%] left-[45%] animate-pulse opacity-80 text-amber-500 dark:text-amber-300 text-xs">✦</div>
        <div className="absolute top-[70%] right-[35%] animate-pulse opacity-70 text-amber-400 dark:text-amber-200 text-sm">✧</div>
        <div className="absolute bottom-[10%] left-[40%] animate-ping opacity-50 text-amber-600 text-[10px]">✦</div>
        <div className="absolute top-[30%] right-[5%] animate-pulse opacity-80 text-amber-500 text-xs">✨</div>
        <div className="absolute top-[40%] left-[2%] animate-pulse opacity-80 text-amber-500 text-xs">✨</div>

        {/* Soft Ambient Light Glow Orbs */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-300/20 dark:bg-amber-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 left-1/3 w-48 h-48 bg-amber-200/20 dark:bg-amber-500/10 rounded-full blur-2xl" />
      </div>

      {/* Main Status Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 dark:bg-amber-400/15 border border-amber-500/30 dark:border-amber-400/30 text-amber-900 dark:text-amber-200 text-xs font-mono font-semibold uppercase tracking-widest mb-3 backdrop-blur-xs shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>✦ Currently Exploring ✦</span>
        </div>

        {/* Primary Banner Headline */}
        <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-amber-950 dark:text-amber-100 mt-1 mb-2">
          Currently Reading &amp; Annotating
        </h2>

        {/* Subtitle / Context Note */}
        <p className="font-vintage italic text-sm sm:text-base text-amber-900/80 dark:text-amber-200/80 max-w-xl leading-relaxed">
          I am actively journeying through this volume. Margin notes, reflections, and key takeaways are updated as chapters unfold.
        </p>
      </div>
    </div>
  );
}
