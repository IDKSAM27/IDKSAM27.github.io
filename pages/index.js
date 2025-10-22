import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import HeroSocials from '../components/HeroSocials';
import Seo from '../components/Seo';
import MobileNav from '../components/MobileNav';


export default function Home() {
  return (
    <div className="flex flex-col">
      <Seo />

      <main>
        {/* HERO SECTION */}
        <section 
          id="home"
          className="relative min-h-screen flex flex-col"
        >
          <div className="absolute inset-0 -z-10">
            {/* Mobile background */}
            <div className="w-full h-full bg-hero-2-light dark:bg-hero-2-dark md:hidden" />
            
            {/* Desktop background */}
            <div className="hidden md:flex w-full h-full">
              <div className="w-[35%] bg-hero-1-light dark:bg-hero-1-dark" />
              <div className="w-[65%] bg-hero-2-light dark:bg-hero-2-dark" />
            </div>
          </div>
          
          <Header />
          
          <div className="container mx-auto px-4 flex-grow flex flex-col">
            {/* THIS IS THE CORRECTED LINE: `-mt-16` is removed */}
            <div className="flex-grow flex items-center justify-center">
                <Hero />
            </div>
            {/* This padding correctly pushes HeroSocials above the MobileNav */}
            <div className="pb-44 md:pb-12">
                <HeroSocials />
            </div>
          </div>
        </section>


        {/* SKILLS SECTION */}
        <section 
          id="skills" 
          className="relative min-h-screen flex flex-col justify-center bg-skills-light dark:bg-skills-dark scroll-mt-16"
        >
          <div className="container mx-auto px-4">
            <SkillsSection />
          </div>
        </section>


        {/* PROJECTS SECTION */}
        <section 
          id="projects" 
          className="relative min-h-screen flex flex-col justify-center items-center bg-projects-light dark:bg-projects-dark scroll-mt-16"
        >
          <div className="container mx-auto px-4">
            <ProjectsSection />
          </div>
        </section>


        {/* CONTACT SECTION */}
        <section 
          id="contact"
          className="relative min-h-screen flex flex-col justify-center bg-contact-light dark:bg-contact-dark scroll-mt-16">
          <div className="container mx-auto px-4">
            <ContactSection />
          </div>
          <Footer />
        </section>
      </main>
      
      {/* <HeroSocials /> */}
      <MobileNav />
    </div>
  );
}
