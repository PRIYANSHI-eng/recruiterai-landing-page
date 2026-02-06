import React from 'react';
import { motion } from 'framer-motion';

// Testimonial Data
const heroCardsLeft = [
  {
    name: "Sarah K.",
    role: "Founder at TechStart",
    text: "Candidates wait 3 weeks for replies while I'm juggling everything. We're losing great talent to competitors.",
    color: "bg-indigo-500",
    delay: 0,
  },
  {
    name: "Priya S.",
    role: "CEO at InnovateLabs",
    text: "I'm the CEO, product lead, AND now doing HR? There's zero time to read 200 resumes properly.",
    color: "bg-purple-500",
    delay: 0.6,
  },
];

const heroCardsRight = [
  {
    name: "Rahul M.",
    role: "Hiring Manager at GrowthCo",
    text: "Posted on LinkedIn. Got 200 applications. Skimmed through 20. Hired on gut feeling. They quit in 2 months.",
    color: "bg-blue-500",
    delay: 1.2,
  },
  {
    name: "Amit T.",
    role: "Head of HR at ScaleUp",
    text: "Our best candidate accepted another offer while we were still scheduling interviews. This keeps happening.",
    color: "bg-pink-500",
    delay: 1.8,
  },
];

const TestimonialCard = ({ name, role, text, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: delay * 0.2, // Staggered entry
        ease: "easeOut" 
      }}
      className="w-full relative pointer-events-auto"
    >
      {/* Floating Animation Inner Container */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 4 + Math.random() * 2, // Random duration between 4-6s
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: Math.random() * 2, // Random start time offset
        }}
        className="
          flex flex-col gap-3 p-4 md:p-5
          bg-white/80 backdrop-blur-md
          border border-white/60 shadow-lg shadow-indigo-100/50
          rounded-2xl
          hover:shadow-xl hover:bg-white transition-all duration-300
        "
      >
        {/* Card Header */}
        <div className="flex items-center gap-3">
          <div className={`
             w-10 h-10 shrink-0 rounded-full 
             flex items-center justify-center 
             text-white font-bold text-sm shadow-sm
             ${color}
          `}>
             <img 
               src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} 
               alt={name} 
               className="w-full h-full rounded-full object-cover" 
             />
          </div>
          <div className="flex flex-col text-left">
            <h4 className="text-sm font-bold text-gray-900 leading-tight">{name}</h4>
            <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-wide">{role}</p>
          </div>
        </div>

        {/* Card Body */}
        <div className="relative bg-slate-50/80 p-3 rounded-xl rounded-tl-none border border-slate-100">
           <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-medium">
            "{text}"
          </p>
           {/* Speech bubble arrow */}
           <div className="absolute top-0 left-[-6px] w-0 h-0 border-t-[8px] border-t-slate-100 border-l-[8px] border-l-transparent"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-gradient-to-b from-indigo-50/30 via-white to-white min-h-[90vh] flex items-center">
      
      {/* Dynamic Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div 
           animate={{ 
             scale: [1, 1.1, 1],
             opacity: [0.3, 0.5, 0.3], 
             x: [0, 50, 0] 
           }} 
           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[120px]" 
        />
        <motion.div 
           animate={{ 
             scale: [1, 1.2, 1],
             opacity: [0.3, 0.5, 0.3], 
             x: [0, -30, 0] 
           }} 
           transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
           className="absolute bottom-[0%] right-[-10%] w-[40%] h-[60%] bg-purple-100/40 rounded-full blur-[120px]" 
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        
        {/* 
            Desktop Layout: 3 Columns
            Left: Reviews | Center: Content | Right: Reviews
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            
            {/* Left Column - Desktop Only (Hidden on mobile/tablet initially, moved to bottom) */}
            <div className="hidden lg:flex lg:col-span-3 flex-col gap-6 mt-12">
               {heroCardsLeft.map((card, index) => (
                  <TestimonialCard key={`left-${index}`} {...card} />
               ))}
            </div>

            {/* Center Column - Main Content */}
            <div className="lg:col-span-6 flex flex-col items-center text-center z-10 mx-auto max-w-2xl lg:max-w-none">
                
                {/* Tagline */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full mb-6 shadow-sm"
                >
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">AI-Powered Recruiting</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#111827] leading-[1.1] mb-6 tracking-tight"
                >
                  Every Hire, <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">Faster</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">Better</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="text-lg text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto font-medium"
                >
                  Stop losing great candidates to slow, manual hiring processes. Let AI handle the heavy lifting while you focus on building your team.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
                >
                  <motion.button 
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-4 bg-primary text-white text-lg font-bold rounded-xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all"
                  >
                    Start Hiring Smarter
                  </motion.button>
                  <motion.button 
                    whileHover={{ y: -2, backgroundColor: "#F9FAFB" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border-2 border-gray-100 text-lg font-bold rounded-xl hover:border-gray-200 transition-all"
                  >
                    See How It Works
                  </motion.button>
                </motion.div>
            </div>

            {/* Right Column - Desktop Only (Hidden on mobile/tablet) */}
            <div className="hidden lg:flex lg:col-span-3 flex-col gap-6 mt-12">
               {heroCardsRight.map((card, index) => (
                  <TestimonialCard key={`right-${index}`} {...card} />
               ))}
            </div>
            
            {/* Mobile/Tablet View - All Cards Stacked Below Content */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-12">
                {[...heroCardsLeft, ...heroCardsRight].map((card, index) => (
                    <TestimonialCard key={`mobile-${index}`} {...card} delay={index} />
                ))}
            </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
