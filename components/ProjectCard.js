import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // This ensures event listeners are only attached on the client
    const card = cardRef.current;

    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        y: -8,
        duration: 0.3,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'bounce.out',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    // <a
    //   href={project.githubLink}
    //   target="_blank"
    //   rel="noopener noreferrer"
    //   className="block"
    // >
      <div
        ref={cardRef}
        className="project-card bg-slate-200 dark:bg-slate-800/50 rounded-lg shadow-lg overflow-hidden flex flex-col cursor-pointer"
      >
        <div className="p-6 flex-grow">
          <h3 className="text-xl font-bold mb-2 text-slate-700 dark:text-slate-300 tracking-wide">{project.title}</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">{project.description}</p>
        </div>
        <div className="p-6 pt-0">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, i) => (
              <span key={i} className="bg-accent-light/10 text-accent-light dark:bg-accent-dark/10 dark:text-accent-dark text-xs font-bold px-2.5 py-1 rounded-full">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark font-medium">
              GitHub
            </a>
            {/* <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark font-medium"> */}
              {/* Live Demo */}
            {/* </a> */}
          </div>
        </div>
      </div>
    //</a>
  );
};

export default ProjectCard;
