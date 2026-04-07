import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);

  useGSAP(() => {
    // Only hover logic here, entrance is handled by the parent
  }, { scope: cardRef });

  const onEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.015,
      y: -4,
      duration: 0.3,
      ease: 'power3.out',
      force3D: true,
      overwrite: 'auto',
    });
  };

  const onLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
      force3D: true,
      overwrite: 'auto',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
      className="project-card h-full bg-white dark:bg-slate-800 p-2 rounded-lg shadow-xl border-2 border-slate-900 dark:border-slate-700 transition-[border-color,background-color] duration-300 cursor-pointer group"
    >

      <div className="h-full bg-slate-50 dark:bg-slate-900/50 rounded p-6 flex flex-col">
        <div className="flex-grow">
          <h3 className="text-2xl font-heading mb-3 text-text-light dark:text-text-dark tracking-tight">
            {project.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            {project.description}
          </p>
        </div>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, i) => (
              <span key={i} className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] uppercase font-bold px-2 py-1 rounded tracking-widest border border-slate-300 dark:border-slate-600">
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-accent-light dark:text-accent-dark font-fun text-xl hover:underline flex items-center gap-2"
            >
              GitHub <span>↗</span>
            </a>
            <a 
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 hover:scale-110 duration-200"
            >
               <span className="text-white dark:text-black">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
