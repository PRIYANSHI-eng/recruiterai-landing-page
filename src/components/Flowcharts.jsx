import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, CheckCircle, Video, Play, Mail, Database, Clock, Zap, ArrowRight, UserCheck, Sparkles, MessageSquare, AlertCircle, GitBranch, UserPlus } from 'lucide-react';

const FlowConnector = ({ isActive }) => {
  return (
    <div className="hidden md:flex flex-1 items-center justify-center relative px-2 -mx-2 z-0">
      {/* Base Line */}
      <div className="h-[2px] w-full bg-slate-100 rounded-full overflow-hidden relative">
        {/* Animated Data Packet */}
        <motion.div
           animate={{ 
             x: ["-100%", "100%"],
             opacity: [0, 1, 0]
           }}
           transition={{ 
             duration: 2, 
             repeat: Infinity, 
             ease: "easeInOut",
             repeatDelay: 0.5
           }}
           className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        />
      </div>
      {/* Icon */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }} 
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute text-blue-400 bg-white rounded-full p-1"
      >
        <ArrowRight size={12} />
      </motion.div>
    </div>
  );
};

const FlowStep = ({ icon: Icon, label, type, content, isActive }) => {
    const isDecision = type === 'decision';
    
    return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 }
      }}
      className="relative z-10 flex flex-col items-center gap-3 group min-w-[100px]"
    >
      {/* Node Shape */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`
           relative flex items-center justify-center text-xl shadow-md border-2 transition-all duration-300
           ${isDecision ? 'w-16 h-16 rotate-45 rounded-xl' : 'w-16 h-16 rounded-2xl'}
           ${isActive 
             ? 'bg-white border-blue-500 text-blue-600 shadow-blue-200' 
             : 'bg-slate-50 border-slate-200 text-slate-400'}
        `}
      >
        <div className={isDecision ? '-rotate-45' : ''}>
             <Icon size={24} strokeWidth={isDecision ? 2 : 1.5} />
        </div>
        
        {/* Status Indicator Dot */}
        {isActive && (
            <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className={`absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center z-20 ${isDecision ? '-rotate-45 translate-x-1 -translate-y-1' : ''}`}
            >
                <CheckCircle size={12} className="text-white" />
            </motion.div>
        )}
      </motion.div>

      {/* Text Content */}
      <div className="text-center max-w-[140px]">
        <h4 className={`text-xs md:text-sm font-bold leading-tight mb-1 ${isActive ? 'text-slate-800' : 'text-slate-500'}`}>
            {content || label}
        </h4>
        {isDecision && (
             <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-1">
                Wait for Logic
             </span>
        )}
      </div>
    </motion.div>
  );
};

const FlowCard = ({ title, steps, benefit, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, delay: delay, staggerChildren: 0.1 }
        }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="w-full max-w-5xl mx-auto mb-10"
    >
      <motion.div
        whileHover={{ y: -4 }}
        className="
                relative overflow-hidden bg-white 
                rounded-2xl border border-slate-200 
                shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-500/10
                transition-all duration-300
            ">
            
            {/* Header */}
            <div className="bg-slate-50/50 border-b border-slate-100 p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                     <GitBranch className="text-blue-500" size={20} />
                     {title}
                  </h3>
               </div>
               <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Active Workflow
               </div>
            </div>

            {/* Canvas Area */}
            <div className="p-6 md:p-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-slate-50/30 overflow-x-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 min-w-[600px] md:min-w-0">
                    {steps.map((step, idx) => (
                        <React.Fragment key={idx}>
                            <FlowStep index={idx} {...step} isActive={true} /> 
                            {idx < steps.length - 1 && (
                                <React.Fragment>
                                    <FlowConnector isActive={true} />
                                    {/* Mobile Vertical Connector fallback if needed, but using flex-row for scroll */}
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Footer Benefit */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-center">
                <p className="text-white font-medium text-sm md:text-base flex items-center justify-center gap-2">
                   <Sparkles size={18} className="text-blue-200" />
                   {benefit}
                </p>
            </div>
        </motion.div>
    </motion.div>
  );
};

const Flowcharts = () => {
    // Flow Data
    const flow1 = [
        { label: "New Application", icon: FileText, type: 'action' },
        { label: "AI Screening", icon: Sparkles, type: 'action' },
        { label: "Send Questions", icon: Mail, type: 'action' },
        { label: "Qualified > 75%?", icon: AlertCircle, type: 'decision' },
        { label: "Auto-Schedule", icon: Calendar, type: 'action' },
    ];
    
    const flow2 = [
        { label: "Invite Accepted", icon: CheckCircle, type: 'action' },
        { label: "AI Video Interview", icon: Video, type: 'action' },
        { label: "AI Scoring", icon: UserCheck, type: 'action' },
        { label: "Score > 80%?", icon: AlertCircle, type: 'decision' },
        { label: "Schedule Round 2", icon: UserPlus, type: 'action' },
    ];

    const flow3 = [
        { label: "Candidate Rejected", icon: UserCheck, type: 'action' },
        { label: "Talent DB", icon: Database, type: 'action' },
        { label: "Wait 3 Months", icon: Clock, type: 'action' },
        { label: "New Tech Role?", icon: GitBranch, type: 'decision' },
        { label: "Re-engage Email", icon: Mail, type: 'action' },
    ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="how-it-works">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
             AI Recruiting Software That Works Like Your Own HR Team
          </h2>
          <p className="text-lg text-slate-600">
            Build custom hiring workflows in minutes. No coding required.
          </p>
        </div>

        {/* Flows Container */}
        <div className="flex flex-col gap-12">
             <FlowCard 
                title="Automated Candidate Screening & Interview Scheduling" // Cleaned title for display
                steps={flow1} 
                benefit="Screen 250+ applications in minutes vs. 8 hours manually"
                delay={0} 
             />
             <FlowCard 
                title="Multi-Stage Interview Process Automation" 
                steps={flow2} 
                benefit="Reduce time-to-hire from 42 days to 12 days"
                delay={0.2} 
             />
             <FlowCard 
                title="Passive Candidate Re-engagement System" 
                steps={flow3} 
                benefit="Build a qualified talent pipeline automatically - never start from zero"
                delay={0.4} 
             />
        </div>

      </div>
    </section>
  );
};

export default Flowcharts;
