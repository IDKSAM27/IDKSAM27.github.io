import { useRouter } from 'next/router';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const ScrollLink = ({ children, href, ...props }) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    const targetId = href.substring(1); // Removes '#'

    // If we're not on the home page, navigate there first.
    if (router.pathname !== '/') {
      router.push('/').then(() => {
        // After the page navigates, wait a moment for the DOM to update, then scroll.
        setTimeout(() => {
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: `#${targetId}`, offsetY: 0 },
            ease: 'power2.inOut',
          });
        }, 100); // A small delay ensures the element is available.
      });
    } else {
      // If we are already on the home page, just scroll.
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
