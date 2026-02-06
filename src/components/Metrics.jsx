import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// Specialized Hook for the "Data Stabilizing" Number Effect
const StabilizingNumber = ({ value, delay }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const [isStabilized, setIsStabilized] = useState(false);
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;
    const duration = 1500; // ms to stabilize
    // Parse value to separate number and suffix (e.g. "10x" -> 10, "x")
    const numericPart = parseFloat(value.replace(/[^0-9.]/g, ''));
    const suffix = value.replace(/[0-9.]/g, '');

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < delay * 1000) {
        // Waiting period
        animationFrame = requestAnimationFrame(animate);
        return;
      }
      
      const animationProgress = (progress - delay * 1000) / duration;

      if (animationProgress < 1) {
        // Scramble / Randomize effect
        const randomValue = (Math.random() * numericPart).toFixed(0);
        setDisplayValue(`${randomValue}${suffix}`);
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Finalize
        setDisplayValue(value);
        setIsStabilized(true);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, delay]);

  return (
    <motion.span 
        ref={elementRef}
        className={`inline-block transition-all duration-300 ${isStabilized ? 'blur-0 scale-100' : 'blur-sm scale-110 opacity-70'}`}
    >
      {displayValue}
    </motion.span>
  );
};

const MetricCard = ({ value, label, subtext, index }) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1 }
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-200/40 transition-shadow duration-300 overflow-hidden"
    >
      {/* Active Border Gradient on Hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 rounded-3xl transition-all duration-300 pointer-events-none" />
      
      {/* Top Label */}
      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 group-hover:text-primary transition-colors">
        {label}
      </h4>

      {/* Hero Number */}
      <div className="relative">
          <h3 className="font-heading text-5xl md:text-6xl font-extrabold text-[#1e293b] mb-4 tracking-tight tabular-nums group-hover:text-primary transition-colors duration-300">
             <StabilizingNumber value={value} delay={index * 0.15} />
          </h3>
          
          {/* Subtle glow behind number */}
          <div className="absolute -inset-4 bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
      </div>

      {/* Description */}
      <p className="text-gray-600 font-medium leading-relaxed">
        {subtext}
      </p>

      {/* Decorative Corner Accent */}
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-2 h-2 rounded-full bg-primary mb-1" />
        <div className="w-1 h-1 rounded-full bg-indigo-300 ml-auto" />
      </div>
    </motion.div>
  );
};

const Metrics = () => {
    const metricsData = [
        { 
            value: "10x", 
            label: "Faster Screening", 
            subtext: "AI parses and ranks 250+ applications per day vs 25 manually" 
        },
        { 
            value: "70%", 
            label: "Faster Time-to-Hire", 
            subtext: "Average hiring timeline drops from 42 days to just 12 days" 
        },
        { 
            value: "25x", 
            label: "More Interview Capacity", 
            subtext: "AI conducts 200+ automated screening interviews daily vs 8 manual calls" 
        },
        { 
            value: "95%", 
            label: "Application Completion", 
            subtext: "Smart application forms reduce candidate drop-off dramatically" 
        },
        { 
            value: "89%", 
            label: "More Qualified Applications", 
            subtext: "AI job description optimizer attracts higher-quality candidate pipelines" 
        },
        { 
            value: "80%", 
            label: "Lower Recruitment Costs", 
            subtext: "vs traditional recruiting agencies and multiple software subscriptions" 
        },
        { 
            value: "50%", 
            label: "Reduction in Bad Hires", 
            subtext: "AI skills assessment and matching improves hiring accuracy dramatically" 
        },
    ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Mesh (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#4F46E5 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />

      <div className="container mx-auto px-6 relative z-10">
         <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                The RecruiterAI Advantage
            </h2>
         </div>
         
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.15
                    }
                }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
            {metricsData.map((m, i) => (
                <MetricCard key={i} index={i} {...m} />
            ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Metrics;
