import React from 'react';
import { motion } from 'framer-motion';
import { Star, Target, Sparkles, Heart, Zap, ChevronsRight, BookOpenText } from 'lucide-react';

// Animation variants for cascading entry
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each card appearing
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

// Reusable Number Card Component
const NumberCard = ({ icon: Icon, label, number, description, color, delay }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.02, translateY: -5 }}
    className="relative overflow-hidden group rounded-2xl border border-stone-700/50 bg-stone-900/60 p-6 backdrop-blur-lg shadow-2xl shadow-indigo-500/5"
  >
    {/* Animated Gradient Background on Hover */}
    <div className={`absolute -inset-px bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10`} />

    <div className="flex items-center gap-4 mb-4">
      <div className={`p-3 rounded-xl bg-stone-800 border border-stone-700/50 ${color.split(' ')[1]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">{label}</p>
        <p className="text-sm text-stone-500 italic">via Godwin System</p>
      </div>
    </div>

    <div className="flex items-baseline gap-3 mb-3">
      <motion.span 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: delay + 0.3, type: 'spring' }}
        className={`text-6xl font-extrabold tracking-tight bg-gradient-to-br ${color} bg-clip-text text-transparent`}
      >
        {number}
      </motion.span>
    </div>

    <p className="text-stone-300 leading-relaxed text-sm font-medium">
      {description}
    </p>
  </motion.div>
);

const NumerologyResults = ({ data }) => {
  if (!data) return null;

  // Mapping schema fields to display data (icons, labels, colors)
  const coreFour = [
    {
      ...data.life_path,
      label: 'Life Path',
      icon: Star,
      color: 'from-orange-400 to-amber-600 text-orange-400',
    },
    {
      ...data.expression,
      label: 'Expression',
      icon: Target,
      color: 'from-sky-400 to-indigo-500 text-sky-400',
    },
    {
      ...data.birthday_number,
      label: 'Birthday Number',
      icon: Sparkles,
      color: 'from-emerald-400 to-teal-600 text-emerald-400',
    },
    {
      ...data.soul_urge,
      label: 'Soul Urge',
      icon: Heart,
      color: 'from-rose-400 to-red-600 text-rose-400',
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-10"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="border-b border-stone-700/50 pb-6">
        <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-amber-400 animate-pulse" />
            <h2 className="text-3xl font-bold tracking-tight text-stone-100">Cosmic Analysis complete.</h2>
        </div>
        <p className="text-stone-400 mt-2 max-w-2xl">
          Your numbers have been calculated using the foundational logic of the Godwin Numerology system. 
          Here is your personalized energetic blueprint.
        </p>
      </motion.div>

      {/* Part 1: The Core Four (Grid Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coreFour.map((item, index) => (
          <NumberCard key={item.label} {...item} delay={index * 0.15} />
        ))}
      </div>

      {/* Part 2 & 3: Query Insight and Action Steps (Flex Layout) */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Query Insight - Left Side */}
        <motion.div 
          variants={itemVariants}
          className="lg:flex-1 p-8 rounded-2xl border border-stone-700/50 bg-stone-900/40 relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -z-10"/>
          
          <div className="flex items-center gap-3 mb-5">
            <BookOpenText className="w-7 h-7 text-indigo-400" />
            <h3 className="text-2xl font-semibold text-stone-100">Query Insight</h3>
          </div>
          <p className="text-stone-300 leading-relaxed font-medium whitespace-pre-line">
            {data.query_insight}
          </p>
        </motion.div>

        {/* Action Steps - Right Side */}
        <motion.div 
          variants={itemVariants}
          className="lg:w-2/5 p-8 rounded-2xl border border-amber-700/30 bg-stone-950/60 relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl -z-10"/>

          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-amber-950/50 border border-amber-700/50 text-amber-400">
                <ChevronsRight className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold text-stone-100">Next Action Steps</h3>
          </div>
          
          <ul className="space-y-4">
            {data.action_steps.map((step, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + (index * 0.1) }} // Appears after main entry
                className="flex items-start gap-3 bg-stone-800/50 p-4 rounded-xl border border-stone-700/50"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center text-xs font-bold mt-0.5">
                  {index + 1}
                </span>
                <span className="text-stone-200 text-sm font-medium leading-relaxed">
                  {step}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default NumerologyResults;