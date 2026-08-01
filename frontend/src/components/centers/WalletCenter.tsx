import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Info } from 'lucide-react';

export const WalletCenter: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6 relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 rounded-[100%] blur-[120px] pointer-events-none -z-10" />

      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl font-heading font-semibold text-primary tracking-tight">Wallet & Micropayments</h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
        className="p-12 rounded-3xl glass-panel relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[400px]"
      >
        <div className="w-20 h-20 rounded-full bg-surface/50 border border-white/[0.08] flex items-center justify-center mb-6 shadow-inner">
          <Wallet className="w-10 h-10 text-secondary/50" />
        </div>
        
        <h3 className="text-2xl font-heading font-semibold text-primary mb-3">
          Wallet integration coming soon
        </h3>
        
        <p className="text-secondary max-w-md mx-auto leading-relaxed mb-8">
          The backend wallet API is currently under development. Soon, you will be able to fund your account, manage x402 payment channels, and stream microtransactions natively on Algorand.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
          <Info className="w-4 h-4" />
          Pending Backend Release
        </div>
      </motion.div>
    </div>
  );
};
