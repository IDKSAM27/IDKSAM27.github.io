// components/ScrollLink.js

import { useRouter } from 'next/router';
import gsap from 'gsap';
import { useEffect } from 'react'; // 1. Import useEffect

// 2. DO NOT import or register the plugin here

const ScrollLink = ({ children, href, ...props }) => {
  const router = useRouter();

  // 3. Register the plugin only on the client-side, once the component mounts
  useEffect(() => {
    // We create a temporary async function to handle the dynamic import
    const registerScrollToPlugin = async () => {
      const { ScrollToPlugin } = await import('gsap/ScrollToPlugin');
      gsap.registerPlugin(ScrollToPlugin);
    };
    registerScrollToPlugin();
  }, []); // The empty dependency array ensures this runs only once on the client

  // All of your existing click handling logic remains the same
  const handleClick = (e) => {
    e.preventDefault();
    const targetId = href.substring(1); // Removes '#'

    if (router.pathname !== '/') {
      router.push('/').then(() => {
        setTimeout(() => {
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: `#${targetId}`, offsetY: 0 },
            ease: 'power2.inOut',
          });
        }, 100);
      });
    } else {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: `#${targetId}`, offsetY: 0 },
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export default ScrollLink;
