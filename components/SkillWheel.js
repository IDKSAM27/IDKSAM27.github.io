import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaBrain, FaGlobe, FaTools, FaBuilding, FaTimes } from 'react-icons/fa';
import { skillGroups } from './SkillsSection';

const SkillWheel = ({ isOpen, onClose }) => {
  const [activeSector, setActiveSector] = useState(null);

  // Set default sector to Programming (0) on mobile
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setActiveSector(0);
    }
  }, []);

  // Orchestrated close: Clear list first, then close component
  const initiateClose = () => {
    if (activeSector === null) {
      onClose();
      return;
    }
    
    setActiveSector(null);
    setTimeout(() => {
      onClose();
    }, 300); // Wait for list animation to finish
  };

  // Close on Escape key and Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleEsc = (e) => {
      if (e.key === 'Escape') initiateClose();
    };
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sectors = [
    { id: 0, icon: <FaCode />, ...skillGroups[0] },
    { id: 1, icon: <FaBrain />, ...skillGroups[1] },
    { id: 2, icon: <FaGlobe />, ...skillGroups[2] },
    { id: 3, icon: <FaTools />, ...skillGroups[3] },
    { id: 4, icon: <FaBuilding />, ...skillGroups[4] },
  ];

  const categoryCount = sectors.length;
  const radius = 260; 
  const innerRadius = 100;
  const cx = 300;
  const cy = 300;

  // Helper to calculate SVG path for a sector
  const getSectorPath = (startAngle, endAngle) => {
    const x1 = cx + radius * Math.cos((Math.PI * startAngle) / 180);
    const y1 = cy + radius * Math.sin((Math.PI * startAngle) / 180);
    const x2 = cx + radius * Math.cos((Math.PI * endAngle) / 180);
    const y2 = cy + radius * Math.sin((Math.PI * endAngle) / 180);
    const x3 = cx + innerRadius * Math.cos((Math.PI * endAngle) / 180);
    const y3 = cy + innerRadius * Math.sin((Math.PI * endAngle) / 180);
    const x4 = cx + innerRadius * Math.cos((Math.PI * startAngle) / 180);
    const y4 = cy + innerRadius * Math.sin((Math.PI * startAngle) / 180);

    return `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`;
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none p-4">
      {/* Dimmed Blurred Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={initiateClose}
        className="absolute inset-0 bg-slate-950/95 lg:bg-slate-950/70 lg:backdrop-blur-2xl pointer-events-auto"
      />

      {/* Main Responsive Wrapper */}
      <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-start lg:justify-center overflow-auto py-12 lg:py-0">
        
        {/* The Wheel Container */}
        <motion.div 
          initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ 
            scale: 0.5, 
            opacity: 0, 
            rotate: 45,
            transition: { duration: 0.3, delay: 0.15 } 
          }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          style={{ willChange: 'transform' }}
          className="relative w-full max-w-[320px] sm:max-w-[450px] lg:max-w-[600px] aspect-square flex-shrink-0 pointer-events-auto mb-6 lg:mb-0"
        >
          <svg viewBox="0 0 600 600" className="w-full h-full drop-shadow-[0_0_40px_rgba(0,0,0,0.7)] overflow-visible">
            {/* Sector segments */}
            {sectors.map((sector, i) => {
              const startAngle = (360 / categoryCount) * i - 90;
              const endAngle = startAngle + (360 / categoryCount);
              const isActive = activeSector === i;

              return (
                <g 
                  key={i}
                  onMouseEnter={() => setActiveSector(i)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSector(i);
                  }}
                  className="cursor-pointer group transition-all duration-300"
                >
                  <path
                    d={getSectorPath(startAngle, endAngle)}
                    className={`
                      transition-all duration-300
                      ${isActive 
                        ? 'fill-accent-light dark:fill-accent-dark stroke-white stroke-[3px] shadow-[0_0_30px_rgba(255,255,255,0.5)]' 
                        : 'fill-slate-900/70 dark:fill-slate-800/70 stroke-white/20 hover:fill-slate-800/90'}
                    `}
                  />
                  
                  {/* Icon Placement */}
                  <foreignObject
                    x={cx + (radius + innerRadius) / 2 * Math.cos((Math.PI * (startAngle + endAngle) / 2) / 180) - 25}
                    y={cy + (radius + innerRadius) / 2 * Math.sin((Math.PI * (startAngle + endAngle) / 2) / 180) - 25}
                    width="50"
                    height="50"
                    className="pointer-events-none"
                  >
                    <div className={`flex items-center justify-center w-full h-full text-3xl transition-all duration-300 ${isActive ? 'text-white scale-110 drop-shadow-[0_0_12px_rgba(255,255,255,1)]' : 'text-slate-400 group-hover:text-white'}`}>
                      {sector.icon}
                    </div>
                  </foreignObject>
                </g>
              );
            })}

            {/* Large Outer Ring (GTA Style) */}
            <circle cx={cx} cy={cy} r={radius + 15} className="fill-none stroke-white/10 stroke-[1px]" />
            <circle cx={cx} cy={cy} r={radius + 10} className="fill-none stroke-accent-light/40 dark:stroke-accent-dark/40 stroke-[4px]" />

            {/* Center Focus Area */}
            <circle cx={cx} cy={cy} r={innerRadius - 5} className="fill-slate-950 stroke-white/30 stroke-2 shadow-2xl" />
            <circle cx={cx} cy={cy} r={innerRadius - 20} className="fill-none stroke-accent-light/20 dark:stroke-accent-dark/20 stroke-[1px]" strokeDasharray="4 4" />

            {/* LARGE CENTER HEADING (SVG-BASED FOR PERFECT CENTERING) */}
            <AnimatePresence mode="wait">
              {activeSector !== null && (
                <motion.text
                  key={activeSector}
                  x={cx}
                  y={cy}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-white font-heading font-black text-[13px] lg:text-[16px] uppercase tracking-tighter"
                  style={{ pointerEvents: 'none' }}
                >
                  {sectors[activeSector].title.includes('&') ? (
                    <>
                      <tspan x={cx} dy="-1.2em">
                        {sectors[activeSector].title.split('&')[0]} &
                      </tspan>
                      <tspan x={cx} dy="1.2em">
                        {sectors[activeSector].title.split('&')[1].trim()}
                      </tspan>
                    </>
                  ) : sectors[activeSector].title.includes(' ') && sectors[activeSector].title.length > 10 ? (
                    <>
                      <tspan x={cx} dy="-0.6em">
                        {sectors[activeSector].title.split(' ')[0]}
                      </tspan>
                      <tspan x={cx} dy="1.2em">
                        {sectors[activeSector].title.split(' ').slice(1).join(' ')}
                      </tspan>
                    </>
                  ) : (
                    sectors[activeSector].title
                  )}
                </motion.text>
              )}
            </AnimatePresence>

            {activeSector === null && (
               <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" className="fill-slate-400 font-heading font-bold text-[12px] uppercase tracking-[0.3em]">
                  CHOOSE MODULE
               </text>
            )}
           </svg>
        </motion.div>

        {/* Skill List Readout (Responsive positioning) */}
        <div className="w-full max-w-[320px] lg:ml-12 pointer-events-auto min-h-[100px]">
          <AnimatePresence mode="wait">
            {activeSector !== null && (
              <motion.div
                key={activeSector}
                initial={{ opacity: 0, x: -30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -30, y: 10 }}
                className="w-full"
              >
                {/* Skewed Gaming Header */}
                <div className="relative mb-2">
                   <div className="bg-accent-light dark:bg-accent-dark py-1.5 px-4 lg:py-2 lg:px-6 transform -skew-x-12 inline-block shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                      <span className="text-slate-900 font-heading font-black text-sm lg:text-lg uppercase tracking-widest skew-x-12 block">
                        {sectors[activeSector].title}
                      </span>
                   </div>
                </div>

                {/* Main Block Content */}
                <div className="relative bg-slate-950/90 lg:bg-slate-950/60 lg:backdrop-blur-2xl border border-white/10 pt-4 px-6 pb-6 lg:pt-10 lg:px-8 lg:pb-10 rounded-tr-[50px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden font-heading text-slate-300">
                   {/* Scanline Effect */}
                   <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
                   
                   <ul className="grid grid-cols-1 gap-2 lg:gap-4">
                    {skillGroups[activeSector].skills.map((skill, i) => (
                      <motion.li 
                        key={`${activeSector}-${i}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 lg:gap-4 text-white font-medium text-sm lg:text-xl"
                      >
                        <span className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-accent-light dark:bg-accent-dark rotate-45 border border-white/30 mt-1.5 flex-shrink-0" />
                        <span className="tracking-tight leading-tight">{skill}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Mobile Close Button (Since Esc/Backdrop might be tricky on mobile) */}
      <button 
        onClick={initiateClose}
        className="absolute top-4 right-4 text-white/50 hover:text-white pointer-events-auto p-4 lg:hidden"
      >
        <FaTimes size="1.5rem" />
      </button>
    </div>
  );
};

export default SkillWheel;
