import { useRouter } from 'next/router';
import gsap from 'gsap';
import { useEffect } from 'react'; 

const ScrollLink = ({ children, href, ...props }) => {
  const router = useRouter();

  useEffect(() => {
    const registerScrollToPlugin = async () => {
      const { ScrollToPlugin } = await import('gsap/ScrollToPlugin');
      gsap.registerPlugin(ScrollToPlugin);
    };
    registerScrollToPlugin();
  }, []); // The empty dependency array ensures this runs only once on the client

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
