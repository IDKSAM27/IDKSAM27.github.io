import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import ScrollLink from './ScrollLink';

const HeaderButton = ({ children, href }) => {
  const router = useRouter(); 
  const buttonRef = useRef(null);
  const timeline = useRef();

  useGSAP(() => {
    timeline.current = gsap.timeline({ paused: true })
      .to(buttonRef.current.querySelector(".underline"), {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out"
      });
  }, { scope: buttonRef });

  const onEnter = () => {
    if (timeline.current) {
      timeline.current.kill();
      timeline.current.progress(0);
      timeline.current.play();
    }
  };

  const onLeave = () => {
    if (timeline.current) {
      timeline.current.kill();
      timeline.current.progress(1);
      timeline.current.reverse();
    }
  };

 const isInternalLink = href.startsWith('/#');
  const targetId = isInternalLink ? href.substring(1) : href;

  const buttonContent = (
    <>
      <span className="font-heading text-lg text-text-light dark:text-text-dark">
        {children}
      </span>
      <span
        className="underline absolute bottom-1 left-0 h-[2px] w-full bg-accent-light dark:bg-accent-dark"
        style={{ transformOrigin: 'center', transform: 'scaleX(0)' }}
      />
    </>
  );

  return (
    <div ref={buttonRef} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {isInternalLink ? (
        <ScrollLink href={targetId} className="relative px-4 py-2 group">
          {buttonContent}
        </ScrollLink>
      ) : (
        <Link href={href} className="relative px-4 py-2 group">
          {buttonContent}
        </Link>
      )}
    </div>
  );
};

export default HeaderButton;