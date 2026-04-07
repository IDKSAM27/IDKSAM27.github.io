import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Agent-X: Personal AI Assistant",
    description: "A Flutter-based mobile application integrating a personal AI assistant with task management, calendar events, and news features.",
    technologies: ["Flutter", "Dart", "Firebase", "FastAPI"],
    liveLink: "#",
    githubLink: "https://github.com/IDKSAM27/Agent-X",
  },
  {
    title: "P.A.N.D-A",
    description: "Stands for Pandas Assistant for Natural Data-Analytics, It's an intelligent data analysis platform processing natural language queries into actionable insights",
    technologies: ["Python", "Pandas", "Websockets", "React.js", "FastAPI" ],
    liveLink: "#",
    githubLink: "https://github.com/IDKSAM27/P.A.N.D-A",
  },
    {
    title: "MirrOx: Android Screen Mirroring",
    description: "A high-performance Android screen mirroring application built with Rust, utilizing ADB for communication and SDL2 for rendering.",
    technologies: ["Rust", "Android", "ADB", "SDL2"],
    liveLink: "#",
    githubLink: "https://github.com/IDKSAM27/MirrOx",
  },
  {
    title: "Forge-Tree Package",
    description: "A CLI tool published to both crates.io (Rust) and PyPI (Python) for generating directory structures from simple text definitions.",
    technologies: ["Rust", "Python", "CLI", "Crates.io", "PyPI"],
    liveLink: "#",
    githubLink: "https://github.com/IDKSAM27/forge-tree",
  },
  {
    title: "Crowd detection using YOLOv5 and SORT",
    description: "A real-time crowd analysis system using YOLOv5 for head detection and SORT tracking, capable of processing video and webcam feeds.",
    technologies: ["Python", "PyTorch", "OpenCV"],
    liveLink: "#",
    githubLink: "https://github.com/IDKSAM27/crowd-analyser",
  },
  {
    title: "De-Mosaic",
    description: "Full-stack application designed to restore images affected by mosaic censorship. The project leverages a powerful Stable Diffusion inpainting model.",
    technologies: ["Python", "React.js", "PyTorch", "OpenCV", "Stable Diffusion"],
    liveLink: "#",
    githubLink: "https://github.com/IDKSAM27/De-Mosaic",
  },
  {
    title: "OWASP-Scanner",
    description: "An intelligent web application security scanner designed to identify critical OWASP Top 10 vulnerabilities.",
    technologies: ["Python", "requests", "Next.js", "TypeScript"],
    liveLink: "#",
    githubLink: "https://github.com/IDKSAM27/OWASP-Scanner",
  },
];

const ProjectsSection = () => {
  const container = useRef(null);

  useGSAP(() => {
    // Title animation
    gsap.from(container.current.querySelector('.section-title'), {
      scrollTrigger: {
        trigger: container.current,
        start: "top 65%",
      },
      opacity: 0,
      x: -50,
      duration: 0.6,
      ease: "power4.out",
      force3D: true,
    });

    // Content animation
    const items = container.current.querySelectorAll('.project-card-wrapper');
    items.forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 75%',
        },
        opacity: 0,
        y: 40,
        rotate: index % 2 === 0 ? -1 : 1,
        duration: 0.5,
        delay: index * 0.03,
        ease: 'power3.out',
        force3D: true,
      });
    });
  }, { scope: container });

  return (
    <div ref={container} className="w-full py-24 md:py-32 px-4 md:px-12 lg:px-20 overflow-hidden">
      <div className="w-full">
        {/* Header Section */}
        <div className="mb-20">
          <h2 
            className="section-title text-5xl sm:text-6xl md:text-8xl font-heading text-text-light dark:text-text-dark tracking-tighter"
            style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
          >
            Projects.
          </h2>
          <p 
            className="mt-8 text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed"
            style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
          >
            A small collection of projects I've built, ranging from AI applications to system-level tools. 
          </p>
        </div>

        {/* Layout with Sidebar Label */}
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
            
            {/* Sidebar Label in "Cassie Evans" style */}
            <div className="md:w-32 flex-shrink-0 pt-2">
               <div className="flex items-center gap-4">
                  <span 
                    className="font-fun text-2xl rotate-[-4deg] text-accent-light dark:text-accent-dark whitespace-nowrap"
                    style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
                  >
                    showcase
                  </span>
                  <div className="hidden md:block h-[2px] flex-grow bg-slate-300 dark:bg-slate-700 min-w-[30px]"></div>
               </div>
            </div>

            {/* Project Grid */}
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
               {projects.map((project, index) => (
                  <div key={index} className="project-card-wrapper">
                    <ProjectCard project={project} />
                  </div>
               ))}
               
               {/* "More coming" Placeholder card */}
               <a 
                  href="https://github.com/idksam27" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-card-wrapper block opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 group/more"
               >
                  <div className="h-full border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 flex flex-col items-center justify-center text-center space-y-4 group-hover/more:border-accent-light dark:group-hover/more:border-accent-dark transition-colors">
                     <span className="font-fun text-4xl text-slate-400 group-hover/more:text-accent-light dark:group-hover/more:text-accent-dark transition-colors">more.</span>
                     <p className="text-slate-500 dark:text-slate-400">
                        Visit my <span className="font-bold underline">GitHub</span> for more projects and experiments.
                     </p>
                  </div>
               </a>
            </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;