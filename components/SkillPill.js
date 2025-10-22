import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const SkillPill = ({ skill }) => {
  const pillRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: pillRef });

  const onEnter = contextSafe(() => {
    gsap.to(pillRef.current, {
      scale: 1.1,
      y: -5,
      duration: 0.3,
      ease: 'power3.out',
    });
  });

  const onLeave = contextSafe(() => {
    gsap.to(pillRef.current, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: 'bounce.out',
    });
  });

  return (
    <div
      ref={pillRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="skill-pill-container bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full px-5 py-2 text-md font-medium cursor-pointer"
    >
      {skill}
    </div>
  );
};

export default SkillPill;
