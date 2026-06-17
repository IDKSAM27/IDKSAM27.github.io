import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ComplexComputerGraphic from './ComplexComputerGraphic';
import SkillWheel from './SkillWheel';
import { AnimatePresence } from 'framer-motion';

const Hero = () => {
  const container = useRef(null);
  const [isWheelOpen, setIsWheelOpen] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from('.hero-label', {
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: 'power3.out',
      force3D: true,
    })
      .from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power4.out',
        force3D: true,
      }, '-=0.4')
      .from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        force3D: true,
      }, '-=0.6')
      .from('.hero-description', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
        force3D: true,
      }, '-=0.6')
      .from('.armory-btn', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5')
      .from('.hero-graphic', {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: 'power3.out',
        force3D: true,
      }, '-=1');
  }, { scope: container });

  return (
    <div ref={container} className="w-full px-4 md:px-12 lg:px-32">
      <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">

        {/* Sidebar Label (Hidden on mobile for better Hero spacing) */}
        <div className="hero-label md:w-32 flex-shrink-0 pt-4 hidden md:block">
          <div className="flex items-center gap-4">
            <span
              className="font-fun text-2xl rotate-[-4deg] text-accent-light dark:text-accent-dark whitespace-nowrap"
              style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
            >
              intro
            </span>
            <div className="h-[2px] flex-grow bg-slate-300 dark:bg-slate-700 min-w-[30px]"></div>
          </div>
        </div>

        {/* Main Content - Stacks vertically on Mobile/Tablet, side-by-side on LG Desktop */}
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Graphic Content - Centered above on small screens, left-aligned on LG. HIDDEN ON MOBILE/TABLET */}
          <div className="hero-graphic lg:col-span-5 hidden lg:flex justify-center lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-accent-light/10 dark:bg-accent-dark/5 blur-3xl rounded-full" />
              <div className="relative transition-transform duration-700">
                <ComplexComputerGraphic />
              </div>
            </div>
          </div>

          {/* Text Content - Centered on small screens, left-aligned on LG */}
          <div className="lg:col-span-7 space-y-6 order-last lg:order-none text-center lg:text-left">
            <div>
              <h1 className="hero-title text-6xl sm:text-7xl lg:text-9xl font-heading tracking-tighter leading-[0.85] text-text-light dark:text-text-dark">
                Sampreet <br />
                <span className="text-accent-light dark:text-accent-dark">Patil.</span>
              </h1>
              <h2 className="hero-subtitle text-4xl md:text-6xl font-heading text-slate-400 dark:text-slate-600 tracking-tighter mt-4">
                Backend & Security Engineer.
              </h2>
            </div>

            <p className="hero-description text-xl md:text-2xl font-medium leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl">
              A CS grad specializing in Backend Systems & ML Architecture.
              I also write about tech on my&nbsp;
              <a
                href="/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-light dark:text-text-dark underline decoration-accent-light dark:decoration-accent-dark underline-offset-4 hover:text-accent-light dark:hover:text-accent-dark transition-colors"
              >
                blog
              </a>.
            </p>

            {/* SKILLS ARMORY TRIGGER BUTTON */}
            <div className="armory-btn pt-1 pb-8 lg:pb-0 flex justify-center lg:justify-start">
              <button
                onClick={() => setIsWheelOpen(true)}
                className="group relative inline-flex items-center gap-3 px-6 py-3 lg:px-8 lg:py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-heading text-lg lg:text-xl rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-2xl"
              >
                <div className="absolute inset-0 bg-accent-light dark:bg-accent-dark translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">Skills Armory</span>
                <div className="relative z-10 w-8 h-8 rounded-full border-2 border-current flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                  <span className="text-xs">⇗</span>
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* THE GTA SKILL WHEEL POPUP */}
      <AnimatePresence>
        {isWheelOpen && (
          <SkillWheel
            isOpen={isWheelOpen}
            onClose={() => setIsWheelOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
