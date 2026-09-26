import React, { useRef, useState, useEffect } from 'react';

export default function ImageGallery({ book }) {
  const scrollRef = useRef(null);
  const [activeModalItem, setActiveModalItem] = useState(null);

  const { title, author, coverColor, coverAccent, gallery = [] } = book;

  // Default items if none specified
  const items = gallery && gallery.length > 0 ? gallery : [
    {
      title: "Title Page & Colophon",
      caption: `First edition imprint of ${title} by ${author}.`,
      type: "artifact",
      color: coverColor || "#1B2430",
    },
    {
      title: "Core Thesis & Margin Note",
      caption: "Essential passage annotated during the reading session.",
      type: "quote",
      color: "#2C3E50",
    },
    {
      title: "Structural Diagram",
      caption: "Mental model breakdown of the primary concepts.",
      type: "illustration",
      color: "#16222F",
    },
  ];

  // Intercept vertical mouse wheel scroll to horizontally scroll the gallery instead of the page
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // Check if horizontal scrolling is possible in the desired direction
      const canScrollLeft = el.scrollLeft > 0;
      const canScrollRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;

      if ((e.deltaY > 0 && canScrollRight) || (e.deltaY < 0 && canScrollLeft)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <div className="my-10">
      {/* Section Header: Consistent font, no star icon, no clutter text, no arrow buttons */}
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-light dark:text-text-dark font-secondary">
          Visual Plates &amp; Marginalia
        </h2>
      </div>

      {/* Horizontal Scroll Track: Sleek cards, no nested white box cards */}
      <div
        ref={scrollRef}
        className="gallery-scroll overflow-x-auto flex gap-4 sm:gap-6 pb-4 pt-1"
      >
        {items.map((item, index) => {
          const hasImage = Boolean(item.url);

          return (
            <div
              key={index}
              className="flex-shrink-0 w-[260px] sm:w-[320px] rounded-lg overflow-hidden border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 transition-all duration-300 flex flex-col group cursor-pointer hover:border-accent-light dark:hover:border-accent-dark"
              onClick={() => setActiveModalItem(item)}
            >
              {/* Visual Body */}
              <div
                className="relative h-48 sm:h-56 flex flex-col items-center justify-center p-5 text-center overflow-hidden"
                style={{
                  backgroundColor: item.color || coverColor || '#1B2430',
                  color: coverAccent || '#FDE047',
                }}
              >
                {hasImage ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <div
                      className="absolute inset-2.5 border rounded pointer-events-none opacity-30"
                      style={{ borderColor: coverAccent || '#FDE047' }}
                    />
                    <span className="font-cinzel text-[10px] uppercase tracking-[0.2em] opacity-75 mb-1.5">
                      Plate {index + 1}
                    </span>
                    <span className="font-vintage italic text-lg sm:text-xl font-bold px-2 line-clamp-2 leading-tight">
                      &ldquo;{item.title}&rdquo;
                    </span>
                    <div className="w-10 h-[1px] bg-current opacity-30 my-2.5" />
                    <span className="font-mono text-[9px] uppercase tracking-widest opacity-70">
                      {item.type || 'Field Note'}
                    </span>
                  </>
                )}
              </div>

              {/* Minimal caption directly underneath */}
              <div className="p-3 text-left">
                <h4 className="font-cinzel font-semibold text-xs text-text-light dark:text-text-dark line-clamp-1 mb-1">
                  {item.title}
                </h4>
                <p className="font-vintage italic text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="max-w-lg w-full bg-hero-1-light dark:bg-hero-1-dark rounded-xl border border-black/20 dark:border-white/20 shadow-2xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/10 dark:bg-white/10 text-text-light dark:text-text-dark hover:bg-black/20 dark:hover:bg-white/20 flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
            >
              &times;
            </button>

            <span className="font-mono text-[10px] uppercase tracking-widest text-accent-light dark:text-accent-dark block mb-2 font-bold">
              {activeModalItem.type || 'Visual Plate'}
            </span>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-light dark:text-text-dark mb-4">
              {activeModalItem.title}
            </h3>

            {activeModalItem.url ? (
              <img
                src={activeModalItem.url}
                alt={activeModalItem.title}
                className="w-full max-h-80 object-contain rounded-lg mb-4"
              />
            ) : (
              <div
                className="w-full h-48 rounded-lg flex flex-col items-center justify-center p-6 text-center mb-4"
                style={{
                  backgroundColor: activeModalItem.color || coverColor || '#1B2430',
                  color: coverAccent || '#FDE047',
                }}
              >
                <span className="font-vintage italic text-xl font-bold mb-2">
                  &ldquo;{activeModalItem.title}&rdquo;
                </span>
                <span className="font-cinzel text-xs uppercase tracking-wider opacity-80">
                  {book.title} &bull; {book.author}
                </span>
              </div>
            )}

            <p className="font-vintage text-base text-slate-700 dark:text-slate-300 leading-relaxed italic border-l-2 border-accent-light dark:border-accent-dark pl-3">
              {activeModalItem.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
