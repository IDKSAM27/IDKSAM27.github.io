import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaServer, FaLock, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const HomeLabWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const widgetRef = useRef(null);

  // Read sandbox status directly from Environment Variable (defaults to true if not explicitly false)
  const isSandboxOnline = process.env.NEXT_PUBLIC_SANDBOX_ONLINE !== 'false';

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

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-[9999] font-heading font-medium"
    >

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 sm:w-[380px] bg-hero-1-light dark:bg-hero-1-dark border-2 border-slate-900 dark:border-slate-700 rounded-lg shadow-2xl p-6 overflow-hidden text-slate-800 dark:text-slate-200 font-sans"
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 dark:border-slate-800 mb-6">
              <div className="flex items-center gap-2.5">
                <FaServer className="text-accent-light dark:text-accent-dark text-lg" />
                <span className="font-heading text-lg text-text-light dark:text-text-dark">Lab</span>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-100 transition-colors p-1"
              >
                <FaTimes size="1.1rem" />
              </button>
            </div>

            {/* List of Tunnels */}
            <div className="space-y-8">
              {/* Public Tunnel */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <a
                    href="https://public.sampreetpatil.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg font-semibold tracking-tight text-text-light dark:text-text-dark underline-offset-2 decoration-accent-light dark:decoration-accent-dark hover:underline transition-all"
                  >
                    public.sampreetpatil.com
                  </a>
                  <span className={`w-3 h-3 rounded-full flex-shrink-0 ${isSandboxOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                </div>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isSandboxOnline
                    ? "Code server sandbox container (5GB ephemeral node)."
                    : "Code server sandbox container (Offline)."}
                </p>
                <div className="pt-1">
                  {isSandboxOnline ? (
                    <a
                      href="https://public.sampreetpatil.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-lg text-accent-light dark:text-accent-dark font-semibold hover:underline"
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
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <a
                    href="https://code.sampreetpatil.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg font-semibold tracking-tight text-text-light dark:text-text-dark underline-offset-2 decoration-accent-light dark:decoration-accent-dark hover:underline transition-all flex items-center gap-2"
                  >
                    code.sampreetpatil.com
                    <FaLock className="text-amber-500 text-xs sm:text-sm flex-shrink-0" />
                  </a>
                  <span className={`w-3 h-3 rounded-full flex-shrink-0 ${isSandboxOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                </div>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isSandboxOnline
                    ? "Personal code server environment hosted on home lab's node."
                    : "Personal code server environment hosted on home lab's node (Offline)."}
                </p>
                <div className="pt-1">
                  {isSandboxOnline ? (
                    <a
                      href="https://code.sampreetpatil.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-lg text-accent-light dark:text-accent-dark font-semibold hover:underline"
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

              {/* Collaborative Drawing */}
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <a
                    href="https://draw.sampreetpatil.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg font-semibold tracking-tight text-text-light dark:text-text-dark underline-offset-2 decoration-accent-light dark:decoration-accent-dark hover:underline transition-all"
                  >
                    draw.sampreetpatil.com
                  </a>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    Whiteboarding & diagramming
                  </p>
                </div>
                <a
                  href="https://draw.sampreetpatil.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded border-2 border-accent-light dark:border-accent-dark text-accent-light dark:text-accent-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors"
                >
                  <FaExternalLinkAlt className="text-xs" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button with Auto Tooltip */}
      <Tooltip open={showTooltip && !isOpen}>
        <TooltipTrigger
          render={
            <button
              onClick={() => setIsOpen(!isOpen)}
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
