import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FiChevronDown } from 'react-icons/fi';

export default function HeaderMoreDropdown({ prefetch }) {
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
    <div className="relative" ref={containerRef}>
      {/* "More ▾" Button with subtle underline indicator */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative px-4 py-2 group flex items-center gap-1.5 focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="font-heading text-lg text-text-light dark:text-text-dark group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors">
          More
        </span>
        <FiChevronDown
          size={16}
          className={`text-accent-light dark:text-accent-dark transition-transform duration-300 ${
            isOpen ? 'rotate-180 scale-110' : 'rotate-0'
          }`}
        />
        {/* Subtle small underline on hover */}
        <span
          className={`underline absolute bottom-1 left-4 right-4 h-[2px] bg-accent-light dark:bg-accent-dark transition-transform duration-300 ${
            isOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
          style={{ transformOrigin: 'center' }}
        />
      </button>

      {/* Funky, Creative Animated Dropdown underneath */}
      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 z-50 min-w-[170px] bg-[#F9F6F1] dark:bg-[#212121] border-2 border-black dark:border-white rounded-2xl shadow-2xl p-2 flex flex-col gap-1.5"
          style={{
            transformOrigin: 'top right',
            animation: 'funkyPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          }}
        >
          <style>{`
            @keyframes funkyPop {
              0% {
                opacity: 0;
                transform: scale(0.7) translateY(-12px) rotate(-4deg);
              }
              70% {
                transform: scale(1.04) translateY(2px) rotate(1deg);
              }
              100% {
                opacity: 1;
                transform: scale(1) translateY(0) rotate(0deg);
              }
            }
          `}</style>

          {/* Docs Button */}
          <Link
            href="/engineering"
            prefetch={prefetch}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-heading font-semibold text-text-light dark:text-text-dark hover:bg-black/10 dark:hover:bg-white/10 hover:scale-[1.03] active:scale-95 transition-all cursor-pointer group"
          >
            <span className="p-1.5 rounded-lg bg-accent-light/15 dark:bg-accent-dark/20 text-accent-light dark:text-accent-dark group-hover:rotate-12 transition-transform">
              🛠️
            </span>
            <span className="tracking-wide">Docs</span>
          </Link>

          {/* Books Button */}
          <Link
            href="/books"
            prefetch={prefetch}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-heading font-semibold text-text-light dark:text-text-dark hover:bg-black/10 dark:hover:bg-white/10 hover:scale-[1.03] active:scale-95 transition-all cursor-pointer group"
          >
            <span className="p-1.5 rounded-lg bg-accent-light/15 dark:bg-accent-dark/20 text-accent-light dark:text-accent-dark group-hover:-rotate-12 transition-transform">
              📚
            </span>
            <span className="tracking-wide">Books</span>
          </Link>
        </div>
      )}
    </div>
  );
}
