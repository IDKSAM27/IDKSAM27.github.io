import { useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ResumeViewer, { ResumeButton } from './ResumeViewer';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

const externalSocials = [
  { href: 'https://github.com/idksam27', label: 'GitHub', icon: FaGithub },
  { href: 'https://www.linkedin.com/in/sampreet-patil-681015264/', label: 'LinkedIn', icon: FaLinkedin },
  { href: 'https://x.com/OG_Sampreet', label: 'X / Twitter', icon: FaXTwitter },
  { href: 'mailto:sampreetpatil270@gmail.com', label: 'Email', icon: FaEnvelope },
];

const SocialButton = ({ href, label, icon: Icon }) => {
  const buttonRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: buttonRef });

  const onEnter = contextSafe(() => {
    gsap.to(buttonRef.current, {
      scale: 1.2,
      y: -5,
      duration: 0.25,
      ease: 'power2.out',
    });
  });

  const onLeave = contextSafe(() => {
    gsap.to(buttonRef.current, {
      scale: 1,
      y: 0,
      duration: 0.25,
      ease: 'power2.out',
    });
  });

  return (
    <Tooltip>
      <TooltipTrigger
        render={(
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
        )}
      />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
};

const HeroSocials = () => {
  const resumeButtonRef = useRef(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [resumeOrigin, setResumeOrigin] = useState(null);
  const { contextSafe } = useGSAP({ scope: resumeButtonRef });

  const onResumeEnter = contextSafe(() => {
    gsap.to(resumeButtonRef.current, {
      scale: 1.2,
      y: -5,
      duration: 0.25,
      ease: 'power2.out',
    });
  });

  const onResumeLeave = contextSafe(() => {
    gsap.to(resumeButtonRef.current, {
      scale: 1,
      y: 0,
      duration: 0.25,
      ease: 'power2.out',
    });
  });

  const openResume = () => {
    const button = resumeButtonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    setResumeOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      width: rect.width,
      height: rect.height,
    });
    setResumeOpen(true);
  };

  const closeResume = () => {
    setResumeOpen(false);
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div
          className="hero-social-icons-container flex items-center space-x-4
                     bg-black/40 backdrop-blur-sm
                     border border-white/10
                     py-3 px-6 rounded-2xl
                     shadow-lg"
        >
          <SocialButton {...externalSocials[0]} />
          <SocialButton {...externalSocials[1]} />
          <Tooltip>
            <TooltipTrigger
              render={(
                <ResumeButton
                  buttonRef={resumeButtonRef}
                  onOpen={openResume}
                  onEnter={onResumeEnter}
                  onLeave={onResumeLeave}
                />
              )}
            />
            <TooltipContent>Resume</TooltipContent>
          </Tooltip>
          <SocialButton {...externalSocials[2]} />
          <SocialButton {...externalSocials[3]} />
        </div>
      </div>

      <ResumeViewer
        isOpen={resumeOpen}
        origin={resumeOrigin}
        onClose={closeResume}
      />
    </>
  );
};

export default HeroSocials;
