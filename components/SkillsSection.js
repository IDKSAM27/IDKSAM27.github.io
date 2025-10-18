// components/SkillsSection.js
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillPill from './SkillPill';

gsap.registerPlugin(ScrollTrigger);

// Organize skills into a structured object for easy mapping
const skillGroups = [
  {
    title: "Programming",
    skills: ["Python", "Java", "Dart", "C++", "Rust", "JavaScript", "SQL", "Go (Familiar)"]
  },
  {
    title: "AI & Machine Learning",
    skills: ["PyTorch", "TensorFlow", "LangChain", "GenAI (RAG, Fine-Tuning)", "Pandas", "NumPy", "Scikit-Learn"]
  },
  {
    title: "Frameworks & Web",
    skills: ["FastAPI", "Flask", "Flutter", "React", "Node.js"]
  },
  {
    title: "Tools & Platforms",
    skills: ["Docker", "Git", "AWS", "LLM APIs (Gemini, OpenAI)", "Vector DBs (ChromaDB)", "Firebase", "Jupyter Notebooks"]
  },
  {
    title: "Enterprise Software",
    skills: ["Product Lifecycle Management (PLM)", "Siemens Teamcenter"]
  }
];

const SkillsSection = () => {
  const container = useRef(null);

  useGSAP(() => {
    // Animate the main section title
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

    // Animate each skill group as it enters the view
    const groups = container.current.querySelectorAll('.skill-group');
    groups.forEach((group) => {
      gsap.from(group, {
        scrollTrigger: {
          trigger: group,
          start: 'top 85%',
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power2.out',
      });
    });
  }, { scope: container });

  return (
    <section ref={container} id="skills" className="py-24 md:py-32">
      <h2 className="section-title text-4xl font-heading text-center mb-16 text-text-light dark:text-text-dark tracking-tight">
        What I Work With
      </h2>
      
      <div className="max-w-4xl mx-auto space-y-12">
        {skillGroups.map((group, index) => (
          <div key={index} className="skill-group">
            <h3 className="text-2xl font-bold mb-6 text-slate-700 dark:text-slate-300">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {group.skills.map((skill, skillIndex) => (
                <SkillPill key={skillIndex} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
