import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <span className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "How does AI screening work?",
      answer: "Our AI analyzes resumes against your job descriptions using natural language processing. It goes beyond simple keyword matching to understand context, skills, and experience, ranking candidates based on true fit. It then conducts a chat-based initial screening to verify qualifications before you even review."
    },
    {
      question: "Does RecruiterAI integrate with our existing ATS?",
      answer: "Yes! We integrate seamlessly with major ATS platforms including Greenhouse, Lever, Ashby, and Workable to sync candidate data automatically. If you don't have an ATS, RecruiterAI can serve as your primary candidate management system."
    },
    {
      question: "What's the pricing structure?",
      answer: "We offer flexible monthly pricing based on your volume of active job postings. Start with our 14-day free trial to see the value, then choose a plan that scales with your hiring needs. No hidden fees or long-term contracts required."
    },
    {
      question: "How long does setup take?",
      answer: "You can be up and running in less than 10 minutes. Simply connect your email, upload a job description, and our AI starts working immediately."
    },
    {
      question: "Is candidate data secure?",
      answer: "Absolutely. We are SOC2 compliant and use enterprise-grade encryption to ensure all candidate and company data remains private and secure."
    }
  ];

  return (
    <section className="py-20 bg-white" id="faq">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Got questions? We've got answers.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 md:p-8">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
