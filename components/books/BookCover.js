import React from 'react';

/**
 * An artistic, tactile book cover component inspired by 18th/19th century clothbound books
 * and modern clean typography. Includes realistic spine depth, foil accents, and micro-hover physics.
 */
export default function BookCover({
  title,
  subtitle,
  author,
  dateFormatted,
  genre,
  coverColor = '#1B2430',
  coverAccent = '#E5C158',
  spineColor = '#0F1620',
  coverImage,
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
}) {
  const sizeClasses = {
    sm: 'w-32 aspect-[2/3] text-[9px]',
    md: 'w-full aspect-[2/3] text-[11px]',
    lg: 'w-64 sm:w-72 aspect-[2/3] text-xs',
  }[size] || 'w-full aspect-[2/3]';

  // If user provided a custom image, render the image with realistic 3D book spine shadow
  if (coverImage) {
    return (
      <div
        className={`relative ${sizeClasses} rounded-r-md rounded-l-sm overflow-hidden book-spine-depth transition-all duration-300 ${className}`}
        style={{ backgroundColor: spineColor }}
      >
        <img
          src={coverImage}
          alt={`Cover of ${title}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Subtle spine highlight overlay */}
        <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 via-white/10 to-transparent pointer-events-none" />
      </div>
    );
  }

  // 1700s/1800s-inspired tactile bookcloth cover with foil stamping & ornate filigree
  return (
    <div
      className={`relative ${sizeClasses} rounded-r-md rounded-l-sm overflow-hidden book-spine-depth p-4 sm:p-5 flex flex-col justify-between select-none transition-all duration-300 ${className}`}
      style={{
        backgroundColor: coverColor,
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 60%),
          linear-gradient(to right, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.15) 3%, rgba(255, 255, 255, 0.05) 5%, transparent 12%),
          linear-gradient(135deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%),
          linear-gradient(225deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%)
        `,
        backgroundSize: '100% 100%, 100% 100%, 8px 8px, 8px 8px',
        color: coverAccent,
      }}
    >
      {/* Spine hinge line */}
      <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 left-3 w-[1px] bg-black/30 pointer-events-none" />

      {/* Ornate Inner Gold Foil Border */}
      <div
        className="absolute inset-2 sm:inset-3 border rounded pointer-events-none opacity-85 transition-opacity"
        style={{ borderColor: coverAccent }}
      >
        {/* Corner Ornaments */}
        <span className="absolute -top-1.5 -left-1.5 text-[10px] leading-none opacity-90">✦</span>
        <span className="absolute -top-1.5 -right-1.5 text-[10px] leading-none opacity-90">✦</span>
        <span className="absolute -bottom-1.5 -left-1.5 text-[10px] leading-none opacity-90">✦</span>
        <span className="absolute -bottom-1.5 -right-1.5 text-[10px] leading-none opacity-90">✦</span>
      </div>

      {/* Top Header / Imprint */}
      <div className="relative z-10 pt-2 text-center">
        <span className="inline-block uppercase tracking-[0.25em] text-[9px] sm:text-[10px] font-cinzel opacity-80 border-b border-current/30 pb-0.5">
          {genre || 'Volume'}
        </span>
      </div>

      {/* Centerpiece / Title & Motif */}
      <div className="relative z-10 text-center px-1 my-auto">
        {/* Vintage Vignette Ornament */}
        <div className="text-center opacity-75 mb-2 sm:mb-3">
          <span className="text-sm sm:text-base font-cinzel">❦ ✦ ❦</span>
        </div>

        <h3
          className="font-cinzel font-bold text-sm sm:text-base md:text-lg leading-tight tracking-wider uppercase drop-shadow-sm line-clamp-3"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}
        >
          {title}
        </h3>

        {subtitle && (
          <p className="mt-1.5 text-[10px] sm:text-[11px] font-vintage italic opacity-85 line-clamp-2 px-1">
            {subtitle}
          </p>
        )}

        <div className="w-8 h-[1px] mx-auto mt-2 sm:mt-3 bg-current opacity-40" />
      </div>

      {/* Bottom Imprint: Author & Date */}
      <div className="relative z-10 pb-2 text-center">
        <p className="font-vintage italic text-xs sm:text-sm tracking-wide opacity-95">
          {author}
        </p>
        {dateFormatted && (
          <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-cinzel opacity-70 mt-1">
            Read {dateFormatted}
          </p>
        )}
      </div>

      {/* Glossy Sheen Effect on Top Edge */}
      <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
    </div>
  );
}
