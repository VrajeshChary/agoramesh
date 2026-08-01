import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, Image as ImageIcon, Briefcase, Code, Scale, Stethoscope, Cpu, PenTool, Globe } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: Globe, color: 'text-primary', shadow: 'shadow-glow', line: 'bg-primary', glow: 'shadow-[0_-2px_8px_rgba(255,255,255,0.8)]' },
  { id: 'finance', label: 'Finance', icon: Briefcase, color: 'text-emerald-400', shadow: 'shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]', line: 'bg-emerald-400', glow: 'shadow-[0_-2px_8px_rgba(16,185,129,0.8)]' },
  { id: 'vision', label: 'Vision', icon: ImageIcon, color: 'text-purple-400', shadow: 'shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)]', line: 'bg-purple-400', glow: 'shadow-[0_-2px_8px_rgba(139,92,246,0.8)]' },
  { id: 'research', label: 'Research', icon: Globe, color: 'text-accent', shadow: 'shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]', line: 'bg-accent', glow: 'shadow-[0_-2px_8px_rgba(59,130,246,0.8)]' },
  { id: 'legal', label: 'Legal', icon: Scale, color: 'text-gold', shadow: 'shadow-[0_0_20px_-5px_rgba(251,191,36,0.3)]', line: 'bg-gold', glow: 'shadow-[0_-2px_8px_rgba(251,191,36,0.8)]' },
  { id: 'medical', label: 'Medical', icon: Stethoscope, color: 'text-red-400', shadow: 'shadow-[0_0_20px_-5px_rgba(248,113,113,0.3)]', line: 'bg-red-400', glow: 'shadow-[0_-2px_8px_rgba(248,113,113,0.8)]' },
  { id: 'automation', label: 'Automation', icon: Cpu, color: 'text-accent', shadow: 'shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]', line: 'bg-accent', glow: 'shadow-[0_-2px_8px_rgba(59,130,246,0.8)]' },
  { id: 'design', label: 'Design', icon: PenTool, color: 'text-pink-400', shadow: 'shadow-[0_0_20px_-5px_rgba(244,114,182,0.3)]', line: 'bg-pink-400', glow: 'shadow-[0_-2px_8px_rgba(244,114,182,0.8)]' },
  { id: 'code', label: 'Code', icon: Code, color: 'text-secondary', shadow: 'shadow-none', line: 'bg-secondary', glow: 'shadow-none' },
  { id: 'document', label: 'Document', icon: FileText, color: 'text-secondary', shadow: 'shadow-none', line: 'bg-secondary', glow: 'shadow-none' },
];

interface AppCategoriesProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const AppCategories: React.FC<AppCategoriesProps> = ({ activeCategory, onSelectCategory }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col mb-12 relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-primary tracking-tight">AI Modules</h2>
        <div className="flex gap-2">
          <button 
            onClick={scrollRight}
            aria-label="Scroll Categories Right"
            className="p-2 rounded-xl bg-surface border border-white/[0.08] hover:bg-white/[0.05] transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.33333 8H12.6667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 3.33334L12.6667 8.00001L8 12.6667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Scroll container with gradient fades on edges */}
      <div className="relative -mx-8 px-8 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 pt-2 scrollbar-hide snap-x" style={{ WebkitOverflowScrolling: 'touch' }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = cat.icon;
            
            return (
              <motion.button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex flex-col items-center justify-center min-w-[110px] h-[100px] rounded-2xl border transition-all duration-300 snap-start ${
                  isActive 
                    ? `bg-surface border-white/[0.12] ${cat.shadow}` 
                    : 'bg-surface/30 border-white/[0.04] hover:border-white/[0.12] hover:bg-surface/60 backdrop-blur-sm'
                }`}
              >
                <div className={`mb-3 transition-colors duration-300 ${isActive ? cat.color : 'text-secondary/60 group-hover:text-secondary'}`}>
                  <Icon className="w-7 h-7 stroke-[1.5]" />
                </div>
                <span className={`text-[11px] font-semibold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-primary' : 'text-secondary/70'}`}>
                  {cat.label}
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="active-category"
                    className={`absolute -bottom-px left-1/2 -translate-x-1/2 w-10 h-0.5 rounded-t-full ${cat.line} ${cat.glow}`}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
