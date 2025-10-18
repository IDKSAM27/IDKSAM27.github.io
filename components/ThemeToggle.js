'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SunIcon from './SunIcon';
import MoonIcon from './MoonIcon';

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const sunRef = useRef();
  const moonRef = useRef();

  // Wait for hydration to match client/server theme
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Set initial positions of icons based on current theme
  useGSAP(() => {
    if (!isMounted) return;

    const isDark = resolvedTheme === 'dark';
    gsap.set(sunRef.current, {
      opacity: isDark ? 0 : 1,
      scale: isDark ? 0 : 1,
      rotation: isDark ? -90 : 0,
    });
    gsap.set(moonRef.current, {
      opacity: isDark ? 1 : 0,
      scale: isDark ? 1 : 0,
      rotation: isDark ? 0 : 90,
    });
  }, [isMounted, resolvedTheme]);

  const toggleTheme = () => {
    if (isAnimating) return; // Prevent rapid clicks
    setIsAnimating(true);

    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    const isGoingDark = newTheme === 'dark';

    const tl = gsap.timeline({
      onComplete: () => {
        setTheme(newTheme); // Only set theme AFTER animation
        setIsAnimating(false);
      },
    });

    if (isGoingDark) {
      tl.to(sunRef.current, {
        duration: 0.4,
        opacity: 0,
        scale: 0,
        rotation: -90,
        ease: 'power3.inOut',
      }).to(
        moonRef.current,
        {
          duration: 0.4,
          opacity: 1,
          scale: 1,
          rotation: 0,
          ease: 'power3.out',
        },
        '<0.1' // Start slightly after sun fades
      );
    } else {
      tl.to(moonRef.current, {
        duration: 0.4,
        opacity: 0,
        scale: 0,
        rotation: 90,
        ease: 'power3.inOut',
      }).to(
        sunRef.current,
        {
          duration: 0.4,
          opacity: 1,
          scale: 1,
          rotation: 0,
          ease: 'power3.out',
        },
        '<0.1'
      );
    }
  };

  if (!isMounted) return <div className="w-16 h-16" />;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-16 h-16 mt-2 ml-2 text-text-light dark:text-text-dark"
      disabled={isAnimating}
    >
      <div ref={sunRef} className="absolute inset-0 p-2 pointer-events-none">
        <SunIcon />
      </div>
      <div ref={moonRef} className="absolute inset-0 p-3 pointer-events-none">
        <MoonIcon />
      </div>
    </button>
  );
};

export default ThemeToggle;
