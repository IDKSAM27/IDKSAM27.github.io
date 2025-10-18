// components/ContactSection.js
import { useState } from 'react';
import InteractiveAvatar from './InteractiveAvatar';
import { FaTwitter, FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa'; // Icon library

const ContactSection = () => {
  // State to control the SVG's "oh" emotion
  const [isSurprised, setIsSurprised] = useState(false);

  const handleMouseEnter = () => setIsSurprised(true);
  const handleMouseLeave = () => setIsSurprised(false);

  return (
    // ADD RESPONSIVE PADDING HERE
    <div className="grid md:grid-cols-2 items-center gap-16 md:gap-8 px-4 lg:px-20">
      {/* Left side: Text and Socials */}
      <div className="text-center md:text-left">
        <h2 className="text-4xl lg:text-5xl font-bold text-text-light dark:text-text-dark mb-12 font-heading">
          I'm always up for a chat.
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
          Pop me an email at{' '}
          <a
            href="mailto:sampreetpatil270@gmail.com"
            className="font-bold underline hover:text-accent-light dark:hover:text-accent-dark transition-colors"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            sampreetpatil270@gmail.com
          </a>
          <br />
          or give me a shout on social media.
        </p>
        <div className="flex justify-center md:justify-start space-x-6">
          <a href="https://x.com/OG_Sampreet" target="_blank" aria-label="Twitter" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors">
            <FaTwitter size="2rem" />
          </a>
          <a href="https://www.linkedin.com/in/sampreet-patil-681015264/" aria-label="LinkedIn" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors">
            <FaLinkedin size="2rem" />
          </a>
          <a href="mailto:sampreetpatil270@gmail.com" aria-label="Email" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors">
            <FaEnvelope size="2rem" />
          </a>
          <a href="https://github.com/idksam27" aria-label="GitHub" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors">
            <FaGithub size="2rem" />
          </a>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="w-full max-w-5xl">
          <InteractiveAvatar isSurprised={isSurprised} />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
