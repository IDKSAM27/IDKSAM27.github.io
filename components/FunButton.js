import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const FunButton = () => {
  const buttonRef = useRef(null);
  const timeline = useRef();

  useGSAP(() => {
    const buttonFace = buttonRef.current.querySelector('.button-face');
    timeline.current = gsap.timeline({ paused: true })
      .to(buttonFace, {
        x: 4,
        y: 4,
        duration: 0.15,
        ease: 'power1.in'
      });
  }, { scope: buttonRef });

  const onEnter = () => {
    if (timeline.current) timeline.current.play();
  };

  const onLeave = () => {
    if (timeline.current) timeline.current.reverse();
  };

  return (
    <a
      ref={buttonRef}
      href="https://fun.sampreetpatil.com"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative inline-block cursor-pointer group"
    >
      {/* The Shadow Element */}
      <div
        className="absolute inset-0 bg-text-light dark:bg-gray-300 rounded-md transform translate-x-1 translate-y-1"
      />

      {/* The Button Face with corrected border */}
      <div
        // THE FIX: Added dark:border-black to make it visible against the white shadow
        className="button-face relative bg-accent-light dark:bg-accent-dark rounded-md border-2 border-text-light dark:border-black"
      >
        <span
          className="block px-6 py-2 font-fun text-2xl tracking-wider text-text-light dark:text-text-light"
        >
          Fun Side
        </span>
      </div>
    </a>
  );
};

export default FunButton;
