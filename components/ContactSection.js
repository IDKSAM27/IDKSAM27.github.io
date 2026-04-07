import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InteractiveAvatar from './InteractiveAvatar';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa'; // Icon library
import { FaXTwitter } from 'react-icons/fa6'; // Latest X logo

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const container = useRef(null);
  const [isSurprised, setIsSurprised] = useState(false);

  const handleMouseEnter = () => setIsSurprised(true);
  const handleMouseLeave = () => setIsSurprised(false);

  useGSAP(() => {
    // Title animation
    gsap.from(container.current.querySelector('.section-title'), {
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
      },
      opacity: 0,
      x: -50,
      duration: 0.6,
      ease: "power4.out",
      force3D: true,
    });

    // Content animation - Targeted trigger
    const contactContent = container.current.querySelector('.contact-content');
    gsap.from(contactContent, {
      scrollTrigger: {
        trigger: contactContent,
        start: 'top 85%',
      },
      opacity: 0,
      y: 40,
      duration: 0.6,
      ease: 'power3.out',
      force3D: true,
    });

    // Avatar animation - Targeted trigger
    const avatar = container.current.querySelector('.avatar-wrapper');
    gsap.from(avatar, {
      scrollTrigger: {
        trigger: avatar,
        start: 'top 85%',
      },
      scale: 0.8,
      opacity: 0,
      rotate: -5,
      duration: 0.8,
      ease: 'power3.out',
      force3D: true,
    });
  }, { scope: container });

  return (
    <div ref={container} className="w-full pt-12 pb-10 sm:py-24 md:py-32 px-4 md:px-12 lg:px-20 overflow-hidden">
      <div className="w-full">
        {/* Header Section */}
        <div className="mb-4 sm:mb-20">
          <h2 
            className="section-title text-5xl sm:text-6xl md:text-8xl font-heading text-text-light dark:text-text-dark tracking-tighter"
            style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
          >
            Connect.
          </h2>
          <p 
            className="mt-4 md:mt-8 text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed"
            style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
          >
            I'm always up for a chat. Whether you have a question or just want to say hi, my inbox is always open.
          </p>
        </div>

        {/* Layout with Sidebar Label - Adjusted to stack until LG */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
            
            {/* Sidebar Label - Hidden on mobile/tablet for better stacking layout */}
            <div className="md:w-32 flex-shrink-0 pt-2 hidden lg:block">
               <div className="flex items-center gap-4">
                  <span 
                    className="font-fun text-2xl rotate-[-4deg] text-accent-light dark:text-accent-dark whitespace-nowrap"
                    style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
                  >
                    say hello
                  </span>
                  <div className="h-[2px] flex-grow bg-slate-300 dark:bg-slate-700 min-w-[30px]"></div>
               </div>
            </div>

            {/* Main Content Grid - Vertical until LG */}
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-24">
                
                {/* Left: Text and Socials */}
                <div className="contact-content text-center lg:text-left space-y-8">
                    <p className="text-lg md:text-2xl text-slate-700 dark:text-slate-300">
                      Pop me an email at{' '}
                      <br />
                      <a
                        href="mailto:sampreetpatil270@gmail.com"
                        className="font-bold underline text-xl sm:text-2xl lg:text-3xl break-all lg:break-normal hover:text-accent-light dark:hover:text-accent-dark transition-colors deco-underline"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        sampreetpatil270@gmail.com
                      </a>
                    </p>
                    
                    <div className="flex justify-center lg:justify-start space-x-8 pt-2">
                      <a href="https://x.com/OG_Sampreet" target="_blank" aria-label="X" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-transform hover:scale-110 duration-300">
                        <FaXTwitter size="2.5rem" />
                      </a>
                      <a href="https://www.linkedin.com/in/sampreet-patil-681015264/" aria-label="LinkedIn" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-transform hover:scale-110 duration-300">
                        <FaLinkedin size="2.5rem" />
                      </a>
                      <a href="mailto:sampreetpatil270@gmail.com" aria-label="Email" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-transform hover:scale-110 duration-300">
                        <FaEnvelope size="2.5rem" />
                      </a>
                      <a href="https://github.com/idksam27" aria-label="GitHub" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-transform hover:scale-110 duration-300">
                        <FaGithub size="2.5rem" />
                      </a>
                    </div>
                </div>

                {/* Right: Interactive Avatar - Margin-top added for mobile/tablet stack */}
                <div className="avatar-wrapper flex justify-center items-center mt-6 lg:mt-0">
                    <div className="w-full max-w-sm md:max-w-md">
                        <InteractiveAvatar isSurprised={isSurprised} />
                    </div>
                </div>

            </div>

        </div>
      </div>
    </div>
  );
};

export default ContactSection;
