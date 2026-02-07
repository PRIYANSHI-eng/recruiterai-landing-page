import React, { useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, useInView } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Rahul Mehta",
    role: "Founder",
    company: "TechStart Solutions",
    quote: "We went from 6 weeks to hire a developer to just 10 days. RecruiterAI handled everything from screening to scheduling. Game changer for our 5-person startup.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    role: "VP of People",
    company: "ScaleUp Inc.",
    quote: "The automated interview scheduling alone saved our team 20+ hours a week. We can finally focus on closing candidates instead of chasing calendars.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Hiring Manager",
    company: "DataFlow Systems",
    quote: "I was skeptical about AI screening, but the quality of candidates I see now is significantly higher. It filters out the noise so I only talk to the best.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
  }
];

// -----------------------------------------------------------------------------
// ORBIT ITEM (Desktop)
// -----------------------------------------------------------------------------
const OrbitCard = ({ item, index, count, rotation, onHoverStart, onHoverEnd }) => {
  const angleOffset = (360 / count) * index;
  
  // Map global rotation to this card's angle
  const angle = useTransform(rotation, (r) => r + angleOffset);
  
  // Calculate X position (Horizontal orbit)
  // Radius = 320px helps separate them nicely on desktop
  const x = useTransform(angle, (a) => Math.sin((a * Math.PI) / 180) * 320);
  
  // Calculate Z depth for scaling/opacity logic (Cos wave: 1=front, -1=back)
  const z = useTransform(angle, (a) => Math.cos((a * Math.PI) / 180));
  
  // Driven styles
  const scale = useTransform(z, [-1, 1], [0.8, 1.1]);
  const opacity = useTransform(z, [-1, 1], [0.6, 1]);
  const zIndex = useTransform(z, (v) => Math.round((v + 2) * 10)); // Ensure stable z-index
  const blur = useTransform(z, [-1, 1], [2, 0]); // Blur background items

  return (
    <motion.div
      style={{
        x,
        scale,
        opacity,
        zIndex,
        filter: useTransform(blur, (b) => `blur(${b}px)`),
        position: 'absolute',
      }}
      className="w-[300px] md:w-[380px] origin-center cursor-default will-change-transform"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col gap-4 relative overflow-hidden group hover:bg-white transition-colors duration-300">
        {/* Subtle gradient glow for premium feel */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] -mr-16 -mt-16 pointer-events-none" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden ring-2 ring-white shadow-sm shrink-0">
            <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 leading-tight">{item.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {item.company}
              </span>
              <span className="text-xs text-gray-500">{item.role}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 leading-relaxed italic relative z-10">
          "{item.quote}"
        </p>
      </div>
    </motion.div>
  );
};

// -----------------------------------------------------------------------------
// MOBILE CARD
// -----------------------------------------------------------------------------
const MobileCard = ({ item }) => (
  <div className="min-w-[85vw] md:min-w-[400px] snap-center">
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col justify-between">
      <p className="text-gray-600 leading-relaxed italic mb-6">"{item.quote}"</p>
      <div className="flex items-center gap-4 border-t border-gray-50 pt-4">
        <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden shadow-sm">
          <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
          <p className="text-xs text-gray-500">{item.role}, {item.company}</p>
        </div>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
    const containerRef = useRef(null);
    // Framer Motion shared value for rotation
    const rotation = useMotionValue(0);
    const isPaused = useRef(false);
    
    // Animation Loop
    useAnimationFrame((time, delta) => {
        if (!isPaused.current) {
            // Speed increased from 0.03 to 0.1
            const speed = 0.1; 
            const newRotation = rotation.get() + speed * (delta / 10);
            rotation.set(newRotation);
        }
    });

    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section className="py-24 bg-secondary overflow-hidden" id="testimonials" ref={containerRef}>
            <div className="container mx-auto px-6">
                
                {/* Header Entry Animation */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16 md:mb-24 relative z-10"
                >
                    <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                        Loved by Modern Hiring Teams
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Join hundreds of fast-growing companies using RecruiterAI to build their dream teams.
                    </p>
                </motion.div>

                {/* --- DESKTOP: ORBIT ANIMATION (Hidden on Mobile) --- */}
                <motion.div 
                    className="hidden md:flex relative h-[450px] items-center justify-center [perspective:1000px] w-full max-w-5xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    {/* Decorative Center Glow */}
                    <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                    {testimonials.map((item, index) => (
                        <OrbitCard 
                            key={item.id}
                            item={item}
                            index={index}
                            count={testimonials.length}
                            rotation={rotation}
                            onHoverStart={() => { isPaused.current = true; }}
                            onHoverEnd={() => { isPaused.current = false; }}
                        />
                    ))}
                </motion.div>

                {/* --- MOBILE: HORIZONTAL SCROLL (Hidden on Desktop) --- */}
                <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-8 no-scrollbar -mx-6 before:shrink-0 before:w-2 after:shrink-0 after:w-2">
                    {testimonials.map((item) => (
                        <MobileCard key={item.id} item={item} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
