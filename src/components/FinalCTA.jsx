import React from 'react';
import { motion } from 'framer-motion';

const FinalCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden relative">
      {/* Decorative circles */}
      <motion.div 
         animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.08, 0.05] }}
         transition={{ duration: 10, repeat: Infinity }}
         className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"
      />
      <motion.div 
         animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
         transition={{ duration: 15, repeat: Infinity, delay: 2 }}
         className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"
      />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Ready to Hire Better, Faster?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join 500+ companies hiring smarter with AI
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button 
               whileHover={{ y: -2 }}
               whileTap={{ scale: 0.98 }}
               className="w-full sm:w-auto px-8 py-4 bg-white text-primary text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl hover:bg-white transition-all"
            >
              Start Free Trial
            </motion.button>
            <motion.button 
               whileHover={{ y: -2, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
               whileTap={{ scale: 0.98 }}
               className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/30 text-white text-lg font-bold rounded-xl transition-all backdrop-blur-sm"
            >
              Schedule Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
