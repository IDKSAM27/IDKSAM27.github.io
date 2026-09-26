import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FiGrid, FiCode, FiEdit3, FiSmile, FiChevronUp } from 'react-icons/fi';
import ScrollLink from './ScrollLink';

const MobileNavLink = ({ href, icon: Icon, label, smoothScroll = true, prefetch }) => {
  const isInternalLink = smoothScroll && href.startsWith('/#');
  const targetId = isInternalLink ? href.substring(1) : href;

  const linkContent = (
    <>
      <Icon size={20} />
      <span className="mt-1 text-[10px] font-heading uppercase tracking-wider">
        {label}
      </span>
    </>
  );

  const className = "flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400 hover:text-accent-light dark:hover:text-accent-dark transition-colors";

  return isInternalLink ? (
    <ScrollLink href={targetId} className={className}>
      {linkContent}
    </ScrollLink>
  ) : (
    <Link href={href} prefetch={prefetch} className={className}>
      {linkContent}
    </Link>
  );
};

/**
 * MobileNavMore — "More" button with FiChevronUp icon above.
 * Pops up the 2 buttons (Docs & Books) ABOVE the button.
 * Aligned in pixel-perfect sync with all other mobile nav buttons.
 */
const MobileNavMore = ({ prefetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-full" ref={containerRef}>
      {/* Funky Animated Popup ABOVE */}
      {isOpen && (
        <div
          className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-50 w-max min-w-[120px] bg-[#F9F6F1] dark:bg-[#212121] border-2 border-black dark:border-white rounded-2xl shadow-2xl p-1.5 flex flex-col gap-1"
          style={{
            transformOrigin: 'bottom center',
            animation: 'funkyPopUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          }}
        >
          <style>{`
            @keyframes funkyPopUp {
              0% {
                opacity: 0;
                transform: translateX(-50%) scale(0.7) translateY(12px) rotate(4deg);
              }
              70% {
                transform: translateX(-50%) scale(1.04) translateY(-2px) rotate(-1deg);
              }
              100% {
                opacity: 1;
                transform: translateX(-50%) scale(1) translateY(0) rotate(0deg);
              }
            }
          `}</style>

          {/* Docs link */}
          <Link
            href="/engineering"
            prefetch={prefetch}
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-xl text-center font-heading text-sm text-text-light dark:text-text-dark hover:bg-black/10 dark:hover:bg-white/10 hover:text-accent-light dark:hover:text-accent-dark active:scale-95 transition-all cursor-pointer"
          >
            Docs
          </Link>

          {/* Books link */}
          <Link
            href="/books"
            prefetch={prefetch}
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-xl text-center font-heading text-sm text-text-light dark:text-text-dark hover:bg-black/10 dark:hover:bg-white/10 hover:text-accent-light dark:hover:text-accent-dark active:scale-95 transition-all cursor-pointer"
          >
            Books
          </Link>
        </div>
      )}

      {/* Button with Arrow UP icon above — perfectly synced with other mobile nav buttons */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="flex flex-col items-center justify-center h-full w-full text-slate-500 dark:text-slate-400 hover:text-accent-light dark:hover:text-accent-dark transition-colors cursor-pointer focus:outline-none"
        aria-label="Toggle More menu"
        aria-expanded={isOpen}
      >
        <FiChevronUp
          size={20}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent-light dark:text-accent-dark' : ''}`}
        />
        <span className="mt-1 text-[10px] font-heading uppercase tracking-wider">
          More
        </span>
      </button>
    </div>
  );
};

const MobileNav = ({ homeHref = "/", smoothScroll = true, prefetch }) => {
  const homeBase = homeHref.endsWith("/") ? homeHref.slice(0, -1) : homeHref;
  const withHomeBase = (path) => homeBase === "" ? path : `${homeBase}${path}`;

  const navItems = [
    { href: withHomeBase("/#experience"), icon: FiCode, label: 'Exp' },
    { href: withHomeBase("/#projects"), icon: FiGrid, label: 'Projects' },
    { href: withHomeBase("/blog"), icon: FiEdit3, label: 'Blog' },
  ];

  return (
    <div className="mobile-nav-bar md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#F9F6F1] dark:bg-[#212121] border-t-2 border-black dark:border-white z-40">
      <div className="container mx-auto h-full">
        <div className="grid grid-cols-5 h-full">
          {navItems.map((item) => (
            <MobileNavLink
              key={item.label}
              {...item}
              prefetch={prefetch}
              smoothScroll={smoothScroll}
            />
          ))}
          <MobileNavMore prefetch={prefetch} />
          <Link
            href="https://fun.sampreetpatil.com"
            className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400 hover:text-accent-light dark:hover:text-accent-dark transition-colors"
          >
            <FiSmile size={20} />
            <span className="mt-1 text-[10px] font-fun uppercase tracking-wider text-accent-light dark:text-accent-dark">
              Fun Side
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
