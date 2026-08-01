import React from 'react';
import { ShieldCheck, AlertTriangle, Lock, Activity, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';

export const TrustCenter: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6 relative">
      {/* Background ambient glow */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <h2 className="text-3xl font-heading font-semibold text-primary tracking-tight mb-2 flex items-center gap-3">
        Trust & Security
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Verification Status */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          className="p-8 rounded-3xl glass-panel relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex items-center gap-5 mb-8 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)] relative">
              <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 animate-pulse blur-md" />
              <ShieldCheck className="w-8 h-8 text-emerald-400 relative z-10" />
            </div>
            <div>
              <h3 className="text-2xl font-heading font-semibold text-primary tracking-tight">Network Secured</h3>
              <p className="text-sm text-secondary/80 font-medium">All nodes passing consensus checks.</p>
            </div>
          </div>
          
          <div className="space-y-4 relative z-10">
            {[
              { label: 'Smart Contracts Audited', status: 'Passed', icon: Lock, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
              { label: 'x402 Facilitator Uptime', status: '99.99%', icon: Activity, color: 'text-accent', bg: 'bg-accent/10' },
              { label: 'Agent Verification', status: 'Strict', icon: Fingerprint, color: 'text-purple', bg: 'bg-purple/10' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-surface/50 border border-white/[0.04] hover:bg-surface hover:border-white/[0.08] transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center border border-white/[0.04]`}>
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <span className="text-sm font-medium text-primary">{item.label}</span>
                  </div>
                  <span className="text-sm font-mono text-secondary bg-white/[0.03] px-3 py-1 rounded-lg border border-white/[0.04]">{item.status}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Threat Detection */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 rounded-3xl glass-panel flex flex-col relative overflow-hidden h-[420px]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent pointer-events-none" />
          
          <h3 className="text-xl font-heading font-semibold text-primary mb-2 flex items-center gap-3 relative z-10">
            <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
              <AlertTriangle className="w-5 h-5" />
            </div>
            Active Threat Monitoring
          </h3>
          
          <div className="flex-1 flex flex-col items-center justify-center relative mt-8">
            {/* Cinematic Radar */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Grid background for radar */}
              <div className="absolute w-[300px] h-[300px] rounded-full border border-white/[0.03] opacity-50" />
              <div className="absolute w-[200px] h-[200px] rounded-full border border-white/[0.03] opacity-50" />
              <div className="absolute w-[100px] h-[100px] rounded-full border border-white/[0.03] opacity-50" />
              <div className="absolute w-[300px] h-px bg-white/[0.03] opacity-50" />
              <div className="absolute h-[300px] w-px bg-white/[0.03] opacity-50" />
              
              {/* Radar sweeps */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute w-[150px] h-[150px] origin-bottom-right bottom-1/2 right-1/2 bg-gradient-to-br from-accent/0 via-accent/5 to-accent/40 rounded-tl-full"
              />
              
              {/* Center dot */}
              <div className="w-4 h-4 rounded-full bg-accent shadow-[0_0_20px_4px_rgba(59,130,246,0.5)] relative z-10 border border-white/20" />
              
              {/* Blips */}
              <motion.div 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 4, times: [0, 0.1, 1], repeat: Infinity, delay: 1 }}
                className="absolute top-1/4 right-1/3 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.8)]"
              />
              <motion.div 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 4, times: [0, 0.1, 1], repeat: Infinity, delay: 2.5 }}
                className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.8)]"
              />
            </div>
            
            <div className="mt-auto text-center w-full z-10 bg-surface/80 backdrop-blur-md p-4 rounded-2xl border border-white/[0.04]">
              <div className="text-xs text-secondary font-mono mb-1 uppercase tracking-wider">System Status</div>
              <div className="text-sm font-medium text-emerald-400 flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Scanning real-time executions... 0 threats.
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
