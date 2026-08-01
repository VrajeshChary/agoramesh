import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Terminal, Cpu, Activity } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

interface AgentCardProps {
  id: string;
  name: string;
  company: string; // Used as category in this context
  description: string;
  trustScore: number;
  model: string;
  price: number;
  onExecute: (id: string) => void;
}

const getCategoryTheme = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('finance')) return { color: 'text-emerald-400', bg: 'bg-emerald-500/10', glow: 'from-emerald-500/20', accentBg: 'bg-emerald-500', shadow: 'shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]' };
  if (cat.includes('vision')) return { color: 'text-cyan-400', bg: 'bg-cyan-500/10', glow: 'from-cyan-500/20', accentBg: 'bg-cyan-500', shadow: 'shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)]' };
  if (cat.includes('design')) return { color: 'text-pink-400', bg: 'bg-pink-500/10', glow: 'from-pink-500/20', accentBg: 'bg-pink-500', shadow: 'shadow-[0_0_20px_-5px_rgba(236,72,153,0.4)]' };
  if (cat.includes('legal')) return { color: 'text-gold', bg: 'bg-yellow-500/10', glow: 'from-yellow-500/20', accentBg: 'bg-yellow-500', shadow: 'shadow-[0_0_20px_-5px_rgba(234,179,8,0.4)]' };
  if (cat.includes('medical')) return { color: 'text-red-400', bg: 'bg-red-500/10', glow: 'from-red-500/20', accentBg: 'bg-red-500', shadow: 'shadow-[0_0_20px_-5px_rgba(239,68,68,0.4)]' };
  if (cat.includes('research')) return { color: 'text-purple-400', bg: 'bg-purple-500/10', glow: 'from-purple-500/20', accentBg: 'bg-purple-500', shadow: 'shadow-[0_0_20px_-5px_rgba(168,85,247,0.4)]' };
  return { color: 'text-accent', bg: 'bg-accent/10', glow: 'from-accent/20', accentBg: 'bg-accent', shadow: 'shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)]' }; // Default is Blue (Automation, etc)
};

export const AgentCard: React.FC<AgentCardProps> = ({
  id,
  name,
  company,
  description,
  trustScore: initialTrustScore,
  model,
  price,
  onExecute
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = getCategoryTheme(company);

  // Using provided trust score directly
  const trustScore = initialTrustScore;
  // API doesn't provide latency, so we show N/A to prevent faking data while keeping layout
  const latency = 'N/A';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: 'spring', bounce: 0.2 }}
      className="premium-card relative flex flex-col p-6 overflow-hidden cursor-pointer group h-full glass-panel focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
      role="button"
      tabIndex={0}
      aria-label={`Execute ${name} agent`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={() => onExecute(id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onExecute(id);
        }
      }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)' }}
    >
      {/* Background Shift on Hover */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${theme.glow} to-transparent transition-opacity duration-500 ease-out ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      {/* Top row: Logo & Title */}
      <div className="flex items-start gap-4 mb-4 relative z-10">
        <motion.div 
          animate={isHovered ? { rotate: 5, scale: 1.05 } : { rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className={`w-12 h-12 rounded-xl border border-white/[0.08] flex items-center justify-center shadow-inner overflow-hidden ${theme.bg}`}
        >
          <div className={`w-6 h-6 rounded-md ${theme.accentBg} shadow-inner opacity-80`} />
        </motion.div>
        <div>
          <h3 className="font-heading font-semibold text-lg text-primary">{name}</h3>
          <p className={`text-xs font-medium uppercase tracking-wider mt-0.5 ${theme.color}`}>{company}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-secondary leading-relaxed mb-6 flex-grow relative z-10 group-hover:text-secondary/90 transition-colors">
        {description}
      </p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-2 mb-8 relative z-10">
        <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-surface/40 border border-white/[0.04]">
          <div className="flex items-center gap-1 text-[10px] text-secondary/70 uppercase font-semibold tracking-wider">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Trust
          </div>
          <span className="number-font text-sm font-medium text-primary">{trustScore.toFixed(1)}%</span>
        </div>
        <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-surface/40 border border-white/[0.04]">
          <div className="flex items-center gap-1 text-[10px] text-secondary/70 uppercase font-semibold tracking-wider">
            <Activity className="w-3 h-3 text-purple-400" /> Latency
          </div>
          <span className="number-font text-sm font-medium text-secondary">{latency}</span>
        </div>
        <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-surface/40 border border-white/[0.04]">
          <div className="flex items-center gap-1 text-[10px] text-secondary/70 uppercase font-semibold tracking-wider">
            <Cpu className="w-3 h-3 text-accent" /> Model
          </div>
          <span className="number-font text-xs font-medium text-primary truncate" title={model}>{model}</span>
        </div>
        <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-surface/40 border border-white/[0.04]">
          <div className="flex items-center gap-1 text-[10px] text-secondary/70 uppercase font-semibold tracking-wider text-gold">
            Price
          </div>
          <span className="number-font text-sm font-medium text-primary shadow-[0_0_10px_rgba(251,191,36,0.3)]">${price} <span className="text-[10px] text-secondary">USDC</span></span>
        </div>
      </div>

      {/* Execute Button Overlay */}
      <div className="absolute bottom-6 left-6 right-6 h-12 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="w-full h-full pointer-events-auto"
            >
              <MagneticButton 
                className={`w-full h-full rounded-xl ${theme.accentBg} text-white font-semibold text-sm flex items-center justify-center gap-2 group-active:scale-95 transition-transform ${theme.shadow}`}
              >
                <Terminal className="w-4 h-4" />
                Initialize Execution
              </MagneticButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
