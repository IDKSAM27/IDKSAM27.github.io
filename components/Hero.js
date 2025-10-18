// components/Hero.js
import ComplexComputerGraphic from './ComplexComputerGraphic';

const Hero = () => {
  return (
    <section>
      <div className="grid md:grid-cols-10 items-center w-full">
        {/* Graphic on the left */}
        <div className="hidden md:block md:col-span-4">
          <div className="flex justify-center items-center">
            {/* Sizing wrapper for the graphic */}
            <div className="w-full max-w-5xl md:max-w-5xl">
              <ComplexComputerGraphic />
            </div>
          </div>
        </div>

        {/* Text on the right */}
        <div className="col-span-10 md:col-span-6">
          <h1 className="hero-text text-6xl md:text-5xl font-heading tracking-tight leading-none text-text-light dark:text-text-dark">
            Hi, I'm <span className="text-accent-light dark:text-accent-dark">Sampreet Patil</span>
          </h1>
          <p className="hero-text mt-6 text-xl md:text-3xl font-bold leading-relaxed tracking-tight max-w-2xl text-slate-600 dark:text-slate-300">
            A CS grad who likes turning abstract problems into clean, scalable code, I also write about it on my&nbsp;
            <a
              href="/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-outline transition-colors duration-150 ease-linear hover:text-accent-light dark:hover:text-accent-dark"
            >
              blog
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
