import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  title = "Network Connection Lost", 
  message = "Could not fetch data from the network. Please verify the backend is active.",
  onRetry 
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[400px] text-center glass-panel rounded-3xl p-8 border border-red-500/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 shadow-inner relative">
          <div className="absolute inset-0 bg-red-500/20 blur-xl animate-pulse" />
          <AlertTriangle className="w-8 h-8 text-red-400 relative z-10" />
        </div>
        <h3 className="text-xl font-heading font-semibold text-primary mb-2">{title}</h3>
        <p className="text-secondary/80 max-w-md mb-8">{message}</p>
        
        {onRetry && (
          <button 
            onClick={onRetry}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-surface border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.04] transition-colors text-primary font-medium text-sm shadow-glass group"
          >
            <RefreshCw className="w-4 h-4 text-secondary group-hover:text-primary transition-colors group-active:animate-spin-fast" />
            Retry Connection
          </button>
        )}
      </motion.div>
    </div>
  );
};
