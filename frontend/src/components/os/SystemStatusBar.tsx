import React from 'react';
import { Zap, Server, ActivitySquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const SystemStatusBar: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-6 px-6 py-2.5 glass-panel rounded-full text-xs font-mono text-secondary/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-white/[0.08]"
    >
      <div className="flex items-center gap-2 group cursor-default">
        <div className="relative flex items-center justify-center w-2 h-2">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        </div>
        <span className="group-hover:text-primary transition-colors">Algorand Testnet Connected</span>
      </div>
      
      <div className="w-px h-3 bg-white/[0.08]" />
      
      <div className="flex items-center gap-2 text-primary group cursor-default">
        <Server className="w-3.5 h-3.5 text-accent" />
        <span className="group-hover:text-white transition-colors">OpenRouter: Optimal</span>
      </div>
      
      <div className="w-px h-3 bg-white/[0.08]" />
      
      <div className="flex items-center gap-2 group cursor-default">
        <ActivitySquare className="w-3.5 h-3.5 text-purple" />
        <span className="group-hover:text-primary transition-colors">42 Agents Online</span>
      </div>
      
      <div className="w-px h-3 bg-white/[0.08]" />
      
      <div className="flex items-center gap-2 group cursor-default">
        <Zap className="w-3.5 h-3.5 text-yellow-500" />
        <span className="group-hover:text-primary transition-colors">Avg Latency: 124ms</span>
      </div>
    </motion.div>
  );
};
