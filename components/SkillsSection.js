import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Skills kept for future "creative pop-up" element
export const skillGroups = [
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
    skills: ["Next.js", "React", "FastAPI", "Flask", "Flutter", "Node.js"]
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

const ExperienceSection = () => {
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
    const items = container.current.querySelectorAll('.experience-item');
    items.forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 75%',
        },
        opacity: 0,
        y: 40,
        duration: 0.5,
        delay: index * 0.05,
        ease: 'power3.out',
        force3D: true,
      });
    });

    // Graphic pop-up animation - Targeted trigger for visibility
    const expGraphic = container.current.querySelector('.experience-graphic');
    gsap.from(expGraphic, {
      scrollTrigger: {
        trigger: expGraphic,
        start: 'top 85%',
      },
      scale: 0.6,
      opacity: 0,
      rotate: 15,
      x: 100,
      y: 50,
      duration: 0.7,
      ease: 'power3.out',
      force3D: true,
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
            Currently Building.
          </h2>
          <p
            className="mt-8 text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed"
            style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
          >
            I'm currently focused on developing AI-powered institutional intelligence at Angsys Tech,
            working on the next generation of academic operations.
          </p>
        </div>

        {/* Experience Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-12 space-y-24">

            {/* Internship Item */}
            <div className="experience-item relative group">
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">

                {/* Left Label in "Cassie Evans" style */}
                <div className="md:w-32 flex-shrink-0 pt-2">
                  <div className="flex items-center gap-4">
                    <span className="font-fun text-2xl rotate-[-4deg] text-accent-light dark:text-accent-dark whitespace-nowrap">
                      internship
                    </span>
                    <div className="hidden md:block h-[2px] flex-grow bg-slate-300 dark:bg-slate-700 min-w-[30px]"></div>
                  </div>
                </div>

                {/* Right Content */}
                <div className="flex-grow">
                  <h3 className="text-4xl md:text-5xl font-heading mb-8 text-text-light dark:text-text-dark">
                    Backend & ML Intern @ Angsys Tech
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                    <div className="space-y-6 text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                      <p>
                        Building <strong>Enstine</strong>—an all-in-one institutional intelligence platform.
                        My focus is on engineering the AI-Academic Operations backbone, from multimodal evaluation engines to adaptive learning systems.
                      </p>

                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="text-accent-light dark:text-accent-dark font-bold mt-1">▹</span>
                          <span>Developing <strong>Multimodal AI Evaluation</strong> (Typed, Handwritten, Audio) for smart examinations.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent-light dark:text-accent-dark font-bold mt-1">▹</span>
                          <span>Implementing <strong>Adaptive Learning Pathways</strong> using self-evolving AI agents.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent-light dark:text-accent-dark font-bold mt-1">▹</span>
                          <span>Architecting <strong>Research Copilots</strong> for automated literature mapping and cross-disciplinary discovery.</span>
                        </li>
                      </ul>

                      {/* Explore Button */}
                      <div className="pt-8 group/btn">
                        <a
                          href="https://www.angsystech.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative inline-block cursor-pointer"
                          onMouseEnter={() => {
                            gsap.to('.explore-face', { x: 4, y: 4, duration: 0.15, ease: 'power1.in' });
                          }}
                          onMouseLeave={() => {
                            gsap.to('.explore-face', { x: 0, y: 0, duration: 0.15, ease: 'power1.out' });
                          }}
                        >
                          <div className="absolute inset-0 bg-slate-900 dark:bg-slate-200 rounded transform translate-x-1 translate-y-1" />
                          <div className="explore-face relative bg-indigo-600 dark:bg-purple-500 py-3 px-8 rounded border-2 border-slate-900 dark:border-white transition-colors group-hover/btn:bg-indigo-700 dark:group-hover/btn:bg-purple-400">
                            <span className="font-heading text-xl md:text-2xl text-white dark:text-slate-900 tracking-tight flex items-center gap-3">
                              Explore Enstine
                              <span className="text-2xl transform group-hover/btn:translate-x-1 transition-transform">→</span>
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>


                    {/* Fun Graphic/Pop-up Element Card - Refined with safe zone and performance optimizations */}
                    <div className="experience-graphic relative mt-12 md:mt-24 px-6 md:px-0 md:pr-12 pb-20 md:pb-0">
                      <div
                        style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
                        className="max-w-sm mx-auto md:ml-auto bg-white dark:bg-slate-800 p-2 rounded-lg shadow-2xl border-4 border-slate-900 dark:border-slate-700 rotate-3 group-hover:rotate-0 transition-transform duration-500"
                      >

                        <div className="aspect-video bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded flex items-center justify-center p-6">
                          <div className="text-white text-center">
                            <div className="flex flex-col items-center justify-center gap-2 mb-2">
                              <img src="/enstine-mark.svg" alt="Enstine Mark" className="w-16 h-16" />
                              <h4 className="text-3xl font-heading">Enstine</h4>
                            </div>
                            <p className="text-[10px] font-body uppercase tracking-widest opacity-80">AI Academic Backbone</p>
                          </div>
                        </div>

                        {/* THE POP-UP LABEL - Adjusted to prevent clipping */}
                        <div className="absolute -top-6 -right-4 md:-right-8 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 font-fun text-xl shadow-xl border-2 border-current transform rotate-12 group-hover:rotate-6 transition-transform whitespace-nowrap z-10">
                          Enstine Notes
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>


            {/* Additional item placeholder (optional) */}
            <div className="experience-item opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 border-t border-slate-200 dark:border-slate-800 pt-16">
                <div className="md:w-32 flex-shrink-0 pt-2">
                  <div className="flex items-center gap-4">
                    <span className="font-fun text-2xl rotate-[-4deg]">next goal.</span>
                    <div className="hidden md:block h-[2px] flex-grow bg-slate-200 dark:bg-slate-800 min-w-[50px]"></div>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-4xl md:text-5xl font-heading text-slate-400 dark:text-slate-600">
                    Stay tuned for more updates...
                  </h3>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
