import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaServer, FaLock, FaTimes, FaExternalLinkAlt, FaChevronDown } from 'react-icons/fa';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const labExPath = "M17.2 0a1.2 1.2 0 0 1 1.2 1.2v4a1.2 1.2 0 0 1-1.2 1.2h-.402v1.212l6.976 9.687a1.2 1.2 0 0 1 .22.576L24 18v4.8a1.2 1.2 0 0 1-1.2 1.2H1.2A1.2 1.2 0 0 1 0 22.8V18c0-.252.08-.497.226-.701l6.975-9.687V6.4H6.8a1.2 1.2 0 0 1-1.194-1.084L5.6 5.2v-4A1.2 1.2 0 0 1 6.8 0zM16 2.4H8V4h.4a1.2 1.2 0 0 1 1.195 1.084l.006.116v2.703c0 .315-.1.622-.283.877L2.4 18.386V21.6h19.2v-3.213L14.681 8.78a1.5 1.5 0 0 1-.277-.743l-.006-.134V5.2a1.2 1.2 0 0 1 1.2-1.2H16zm-.48 14.4a1.2 1.2 0 0 1 0 2.4h-2.88a1.2 1.2 0 0 1 0-2.4zm-6.137-4.449 2.135 2.135a1.2 1.2 0 0 1 0 1.697l-2.135 2.135a1.2 1.2 0 1 1-1.697-1.697l1.286-1.286-1.286-1.286a1.2 1.2 0 0 1-.078-1.612l.078-.086a1.2 1.2 0 0 1 1.697 0";

const LabMark = ({ animateLogo }) => (
  <span className="relative block h-14 w-14 flex-shrink-0 text-text-light dark:text-text-dark">
    <motion.svg
      viewBox="-1 -1 26 26"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full overflow-visible"
    >
      <motion.path
        d={labExPath}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 1 }}
        animate={animateLogo ? { pathLength: 1, opacity: 0 } : { pathLength: 0, opacity: 1 }}
        transition={{
          pathLength: { duration: 0.95, ease: 'easeInOut' },
          opacity: { delay: animateLogo ? 0.95 : 0, duration: 0.16 },
        }}
      />
    </motion.svg>
    <motion.img
      src="/labex.svg"
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-contain dark:invert"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={animateLogo ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
      transition={{ delay: animateLogo ? 0.96 : 0, duration: 0.2, ease: 'easeOut' }}
    />
  </span>
);

const HomeLabWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopoverReady, setIsPopoverReady] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const widgetRef = useRef(null);
  const listRef = useRef(null);

  // Read sandbox status directly from Environment Variable (defaults to true if not explicitly false)
  const isSandboxOnline = process.env.NEXT_PUBLIC_SANDBOX_ONLINE !== 'false';

  // Open the lab popup directly when visiting /#lab.
  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.toLowerCase();

      if (hash === '#lab' || hash === '#home-lab' || hash === '#homelab') {
        setIsOpen(true);
        setShowTooltip(false);
      }
    };

    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle auto-tooltip logic on view enter (only once per session)
  useEffect(() => {
    if (isSandboxOnline) {
      const timer = setTimeout(() => {
        setShowTooltip(true);

        const hideTimer = setTimeout(() => {
          setShowTooltip(false);
        }, 4000);
        return () => clearTimeout(hideTimer);
      }, 1000); // Animates in 1 second after landing

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setIsPopoverReady(false);
      return;
    }

    const logoTimer = setTimeout(() => setIsPopoverReady(true), 180);
    return () => clearTimeout(logoTimer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setIsPopoverReady(false);
      setShowScrollHint(false);
      return;
    }

    const listElement = listRef.current;
    if (!listElement) return;

    let hideTimer;

    const updateScrollHint = () => {
      const hasOverflow = listElement.scrollHeight > listElement.clientHeight + 1;
      const isAtBottom = listElement.scrollTop + listElement.clientHeight >= listElement.scrollHeight - 4;

      setShowScrollHint(hasOverflow && !isAtBottom);
      clearTimeout(hideTimer);

      if (hasOverflow && !isAtBottom) {
        hideTimer = setTimeout(() => setShowScrollHint(false), 3300);
      }
    };

    const frameId = requestAnimationFrame(updateScrollHint);
    window.addEventListener('resize', updateScrollHint);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(hideTimer);
      window.removeEventListener('resize', updateScrollHint);
    };
  }, [isOpen]);

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-[9999] font-heading font-medium"
    >

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-36 top-[calc(env(safe-area-inset-top)+1rem)] flex w-auto transform-gpu flex-col overflow-hidden rounded-lg border-2 border-slate-900 bg-hero-1-light p-4 font-sans text-slate-800 shadow-xl will-change-transform dark:border-slate-700 dark:bg-hero-1-dark dark:text-slate-200 md:absolute md:inset-x-auto md:top-auto md:bottom-16 md:right-0 md:max-h-[calc(100dvh-7.5rem)] md:w-[380px] md:shadow-2xl"
          >
            {/* Popover Header */}
            <div className="mb-3 flex flex-shrink-0 items-center justify-between border-b border-slate-200 pb-2.5 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <FaServer className="text-accent-light dark:text-accent-dark text-lg" />
                <span className="font-heading text-lg text-text-light dark:text-text-dark">Lab</span>
              </div>

              <button
                onClick={() => {
                  setIsPopoverReady(false);
                  setIsOpen(false);
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-100 transition-colors p-1"
              >
                <FaTimes size="1.1rem" />
              </button>
            </div>

            {/* List of Tunnels */}
            <div
              ref={listRef}
              onScroll={() => setShowScrollHint(false)}
              className="lab-popover-scroll -mr-[10px] min-h-0 flex-1 space-y-3 overflow-y-auto pr-[9px]"
            >
              {/* Dashboard */}
              <motion.a
                href="https://dash.sampreetpatil.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open home lab dashboard"
                className="group flex items-center gap-3 py-2 text-left text-text-light dark:text-text-dark outline-none focus-visible:ring-2 focus-visible:ring-accent-light dark:focus-visible:ring-accent-dark"
                whileTap={{ scale: 0.99 }}
              >
                <LabMark animateLogo={isPopoverReady} />
                <span className="min-w-0 flex-1 text-left">
                  <span className="block font-heading text-xl leading-none tracking-normal text-text-light dark:text-text-dark">
                    Dashboard
                  </span>
                  <span className="mt-1 block text-sm font-medium leading-snug text-slate-600 dark:text-slate-400">
                    Homelab control center
                  </span>
                </span>
                <span className="ml-auto flex h-7 w-7 flex-shrink-0 items-center justify-center rounded border-2 border-accent-light text-accent-light transition-colors hover:bg-accent-light/10 dark:border-accent-dark dark:text-accent-dark dark:hover:bg-accent-dark/10">
                  <FaExternalLinkAlt className="text-xs" />
                </span>
              </motion.a>

              <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />

              {/* Public Tunnel */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <a
                    href="https://public.sampreetpatil.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 underline-offset-2 decoration-accent-light dark:decoration-accent-dark hover:underline transition-all"
                  >
                    public.sampreetpatil.com
                  </a>
                  <span className={`w-3 h-3 rounded-full flex-shrink-0 ${isSandboxOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-snug">
                  {isSandboxOnline
                    ? "Code server sandbox container (5GB ephemeral node)."
                    : "Code server sandbox container (Offline)."}
                </p>
                <div>
                  {isSandboxOnline ? (
                    <a
                      href="https://public.sampreetpatil.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-base text-accent-light dark:text-accent-dark font-bold hover:underline"
                    >
                      Launch Sandbox <FaExternalLinkAlt className="text-xs" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center text-slate-400 dark:text-slate-600 text-lg font-semibold cursor-not-allowed select-none">
                      Offline
                    </span>
                  )}
                </div>
              </div>

              <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />

              {/* Private Tunnel */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <a
                    href="https://code.sampreetpatil.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 underline-offset-2 decoration-accent-light dark:decoration-accent-dark hover:underline transition-all flex items-center gap-2"
                  >
                    code.sampreetpatil.com
                    <FaLock className="text-amber-500 text-xs sm:text-sm flex-shrink-0" />
                  </a>
                  <span className={`w-3 h-3 rounded-full flex-shrink-0 ${isSandboxOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-snug">
                  {isSandboxOnline
                    ? "Personal code server environment hosted on home lab's node."
                    : "Personal code server environment hosted on home lab's node (Offline)."}
                </p>
                <div>
                  {isSandboxOnline ? (
                    <a
                      href="https://code.sampreetpatil.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-base text-accent-light dark:text-accent-dark font-bold hover:underline"
                    >
                      Access Console <FaExternalLinkAlt className="text-xs" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center text-slate-400 dark:text-slate-600 text-lg font-semibold cursor-not-allowed select-none">
                      Offline
                    </span>
                  )}
                </div>
              </div>

              <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />

              {/* Music Player */}
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-1">
                  <a
                    href="https://music.sampreetpatil.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 underline-offset-2 decoration-accent-light dark:decoration-accent-dark hover:underline transition-all"
                  >
                    music.sampreetpatil.com
                  </a>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-snug">
                    24-bit / 48 kHz FLAC library.{" "}
                    <em>(For anyone wondering: FLAC is music, not a breakfast cereal.)</em>
                    <br />
                    username: <code className="font-mono text-sm">guest</code>
                    <br />
                    password: <code className="font-mono text-sm">guest</code>
                  </p>
                </div>
                <a
                  href="https://music.sampreetpatil.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex h-7 w-7 flex-shrink-0 items-center justify-center rounded border-2 border-accent-light text-accent-light transition-colors hover:bg-accent-light/10 dark:border-accent-dark dark:text-accent-dark dark:hover:bg-accent-dark/10"
                >
                  <FaExternalLinkAlt className="text-xs" />
                </a>
              </div>

              <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />

              {/* Collaborative Drawing */}
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-1">
                  <a
                    href="https://draw.sampreetpatil.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 underline-offset-2 decoration-accent-light dark:decoration-accent-dark hover:underline transition-all"
                  >
                    draw.sampreetpatil.com
                  </a>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-snug">
                    Whiteboarding & diagramming
                  </p>
                </div>
                <a
                  href="https://draw.sampreetpatil.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex h-7 w-7 flex-shrink-0 items-center justify-center rounded border-2 border-accent-light text-accent-light transition-colors hover:bg-accent-light/10 dark:border-accent-dark dark:text-accent-dark dark:hover:bg-accent-dark/10"
                >
                  <FaExternalLinkAlt className="text-xs" />
                </a>
              </div>

              <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />

              {/* PDF Tools */}
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-1">
                  <a
                    href="https://pdf.sampreetpatil.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 underline-offset-2 decoration-accent-light dark:decoration-accent-dark hover:underline transition-all flex items-center gap-2"
                  >
                    pdf.sampreetpatil.com
                    <FaLock className="text-amber-500 text-xs sm:text-sm flex-shrink-0" />
                  </a>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-snug">
                    Private PDF tools and document workspace.
                  </p>
                </div>
                <a
                  href="https://pdf.sampreetpatil.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex h-7 w-7 flex-shrink-0 items-center justify-center rounded border-2 border-accent-light text-accent-light transition-colors hover:bg-accent-light/10 dark:border-accent-dark dark:text-accent-dark dark:hover:bg-accent-dark/10"
                >
                  <FaExternalLinkAlt className="text-xs" />
                </a>
              </div>

              <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />

              {/* Photos */}
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-1">
                  <a
                    href="https://photos.sampreetpatil.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 underline-offset-2 decoration-accent-light dark:decoration-accent-dark hover:underline transition-all flex items-center gap-2"
                  >
                    photos.sampreetpatil.com
                    <FaLock className="text-amber-500 text-xs sm:text-sm flex-shrink-0" />
                  </a>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-snug">
                    Private photo library (Shared with friends & family).
                  </p>
                </div>
                <a
                  href="https://photos.sampreetpatil.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex h-7 w-7 flex-shrink-0 items-center justify-center rounded border-2 border-accent-light text-accent-light transition-colors hover:bg-accent-light/10 dark:border-accent-dark dark:text-accent-dark dark:hover:bg-accent-dark/10"
                >
                  <FaExternalLinkAlt className="text-xs" />
                </a>
              </div>
            </div>

            <AnimatePresence>
              {showScrollHint && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center"
                >
                  <motion.div
                    className="text-accent-light drop-shadow-sm dark:text-accent-dark"
                    initial={{ opacity: 0, y: -4, scale: 0.94 }}
                    animate={{
                      opacity: [0, 1, 0.78, 1, 0.78, 1, 0],
                      y: [-4, 0, 4, 0, 4, 0, 8],
                      scale: [0.94, 1.1, 1, 1.1, 1, 1.1, 0.96],
                    }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 3.1, ease: 'easeInOut' }}
                  >
                    <FaChevronDown className="text-4xl [stroke:currentColor] [stroke-width:24]" />
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            <style jsx>{`
              .lab-popover-scroll {
                scrollbar-width: thin;
                scrollbar-color: rgba(15, 23, 42, 0.55) transparent;
              }

              .lab-popover-scroll::-webkit-scrollbar {
                width: 1px;
              }

              .lab-popover-scroll::-webkit-scrollbar-track {
                background: transparent;
              }

              .lab-popover-scroll::-webkit-scrollbar-thumb {
                background: rgba(15, 23, 42, 0.42);
                border-radius: 999px;
              }

              .lab-popover-scroll:hover::-webkit-scrollbar-thumb {
                background: rgba(15, 23, 42, 0.68);
              }

              :global(.dark) .lab-popover-scroll {
                scrollbar-color: rgba(226, 232, 240, 0.58) transparent;
              }

              :global(.dark) .lab-popover-scroll::-webkit-scrollbar-thumb {
                background: rgba(226, 232, 240, 0.42);
              }

              :global(.dark) .lab-popover-scroll:hover::-webkit-scrollbar-thumb {
                background: rgba(226, 232, 240, 0.68);
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button with Auto Tooltip */}
      <Tooltip open={showTooltip && !isOpen}>
        <TooltipTrigger
          render={
            <button
              onClick={() => {
                setIsPopoverReady(false);
                setIsOpen((current) => !current);
              }}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-2 border-slate-900 dark:border-slate-700 shadow-2xl flex items-center justify-center relative hover:scale-105 active:scale-95 transition-transform group"
            >
              <FaServer size="1.2rem" className="group-hover:rotate-6 transition-transform" />

              {/* Pulsing indicator dot */}
              <span className={`absolute top-0 right-0 w-3.5 h-3.5 border-2 border-slate-900 dark:border-white rounded-full flex items-center justify-center ${isSandboxOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            </button>
          }
        />
        <TooltipContent>
          <p>Check this out</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default HomeLabWidget;
