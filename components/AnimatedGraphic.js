// components/AnimatedGraphic.js
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const AnimatedGraphic = () => {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.8, ease: "power2.inOut" },
      delay: 0.8 // Start this animation after the hero text has appeared
    });

    // Animate the drawing of the main shapes
    tl.fromTo(".laptop-outline", { strokeDashoffset: 1500 }, { strokeDashoffset: 0 })
      // Animate the code lines appearing
      .fromTo(".code-line", { scaleX: 0 }, { scaleX: 1, stagger: 0.1, duration: 0.5 }, "-=0.2")
      // Animate the accent circle pulsing
      .fromTo(".accent-circle", { r: 0, opacity: 0 }, { r: 8, opacity: 1, ease: "back.out(1.7)" });

  }, { scope: container });

  return (
    <div ref={container} className="relative w-full max-w-lg mx-auto mt-8 md:mt-0">
      <svg viewBox="0 0 400 300" className="w-full h-auto">
        <defs>
          {/* Gradient for a subtle visual flair */}
          <linearGradient id="accent-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* Laptop Body & Screen Outline */}
        <path
          className="laptop-outline"
          d="M 50 250 L 350 250 L 380 280 L 20 280 Z M 60 80 H 340 V 250 H 60 Z"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeDasharray="1500" // A large value to cover the whole path length
          strokeDashoffset="1500" // Start with the path "undrawn"
        />

        {/* "Code" lines inside the screen */}
        <line className="code-line" x1="80" y1="110" x2="200" y2="110" strokeWidth="3" stroke="currentColor" style={{transformOrigin: 'left center'}}/>
        <line className="code-line" x1="80" y1="130" x2="280" y2="130" strokeWidth="3" stroke="currentColor" style={{transformOrigin: 'left center'}}/>
        <line className="code-line" x1="80" y1="150" x2="240" y2="150" strokeWidth="3" stroke="currentColor" style={{transformOrigin: 'left center'}}/>
        <line className="code-line" x1="80" y1="170" x2="180" y2="170" strokeWidth="3" stroke="currentColor" style={{transformOrigin: 'left center'}}/>

        {/* Pulsing accent circle */}
        <circle className="accent-circle" cx="320" cy="100" r="0" fill="url(#accent-gradient)" />
      </svg>
    </div>
  );
};

export default AnimatedGraphic;
