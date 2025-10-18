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
    // Animate the main section title (same as SkillsSection)
    gsap.from(container.current.querySelector('.section-title'), {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
    });

    // THE FIX: Animate each project card individually (matching SkillsSection pattern)
    const cards = container.current.querySelectorAll('.project-card');
    cards.forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%', // Same as skill groups
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power2.out',
      });
    });
  }, { scope: container });

  return (
    <section ref={container} id="projects" className="py-24 md:py-32">
      <div className="w-full">
        {/* Add section-title class to match SkillsSection */}
        <h2 className="section-title text-4xl font-heading text-center mb-16 tracking-tight">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
