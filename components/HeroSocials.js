import { useRef } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const socials = [
  { href: 'https://github.com/idksam27', label: 'GitHub', icon: FaGithub },
  { href: 'https://linkedin.com/in/your-username', label: 'LinkedIn', icon: FaLinkedin },
  { href: 'https://twitter.com/your-username', label: 'Twitter / X', icon: FaTwitter },
  { href: 'mailto:youremail@example.com', label: 'Email', icon: FaEnvelope },
];

const SocialButton = ({ href, label, icon: Icon }) => {
  const buttonRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: buttonRef });

  const onEnter = contextSafe(() => {
    gsap.to(buttonRef.current, {
      scale: 1.2,
      y: -5,
      duration: 0.25,
      ease: 'power2.out'
    });
  });

  const onLeave = contextSafe(() => {
    gsap.to(buttonRef.current, {
      scale: 1,
      y: 0,
      duration: 0.25,
      ease: 'power2.out'
    });
  });

  return (
    <a
      ref={buttonRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="p-2"
    >
      <Icon className="w-6 h-6 text-slate-400 hover:text-white transition-colors duration-300" />
    </a>
  );
};

const HeroSocials = () => {
  return (
    // THE FIX:
    // 1. All absolute positioning classes have been removed.
    // 2. We add `w-full flex justify-center` so that it takes up the full width
    //    and centers the icon bar within it.
    <div className="w-full flex justify-center">
      <div
        className="hero-social-icons-container flex items-center space-x-4 
                   bg-black/40 backdrop-blur-sm 
                   border border-white/10 
                   py-3 px-6 rounded-2xl 
                   shadow-lg"
      >
        {socials.map((social, index) => (
          <SocialButton key={index} {...social} />
        ))}
      </div>
    </div>
  );
};

export default HeroSocials;