import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, TerminalSquare, Wallet, Globe, ShieldCheck, Users } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { useAgents, useExecutions } from '../../lib/api';

export const Hero: React.FC = () => {
  const [comingSoon, setComingSoon] = useState(false);

  const handleLaunchTerminal = () => {
    setComingSoon(true);
    setTimeout(() => setComingSoon(false), 2000);
  };

  const handleExploreAgents = () => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  };
  const { data: agents = [] } = useAgents();
  const { data: executions = [] } = useExecutions();

  const { volume, totalExecutions, activeAgents } = useMemo(() => {
    let sum = 0;
    executions.forEach(exec => {
      const agent = agents.find(a => a.id === exec.agent_id);
      if (agent) sum += agent.price;
    });
    return {
      volume: sum,
      totalExecutions: executions.length,
      activeAgents: agents.length
    };
  }, [executions, agents]);

  // TPS isn't provided natively, we show a static symbol to preserve UI layout
  const tps = '-';

  return (
    <div className="relative pt-24 pb-20 flex flex-col w-full min-h-[60vh] justify-center">
      
      {/* Cinematic OS Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[600px] bg-aurora blur-[120px] rounded-[100%] opacity-40 animate-aurora-shift pointer-events-none" />
      
      {/* Grid Mesh */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPPHBhdGggZD0iTTAgNDBoNDBNNDAgMHY0MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] pointer-events-none opacity-50" />

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * 500,
            opacity: 0.2 + Math.random() * 0.5 
          }}
          animate={{
            y: [null, Math.random() * -100],
            opacity: [null, 0.1, 0.8, 0.1]
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      <div className="flex flex-col xl:flex-row gap-16 items-center justify-between relative z-20">
        
        {/* Left: Command Center Headline */}
        <div className="flex-1 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-glass text-xs font-mono text-secondary mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
            AgoraMesh System Online
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl font-heading font-semibold tracking-tighter text-primary leading-[1.05] mb-6"
          >
            The OS for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple to-emerald">
              Autonomous AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-secondary max-w-xl mb-10 leading-relaxed font-medium"
          >
            Discover, execute, and settle micropayments for thousands of specialized AI microservices instantly on Algorand.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4"
          >
            <MagneticButton 
              onClick={handleLaunchTerminal}
              aria-label="Launch Terminal"
              className="px-8 py-4 rounded-full bg-primary text-background font-semibold text-base shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.6)] focus:outline-none focus:ring-2 focus:ring-white min-w-[200px]"
            >
              {comingSoon ? 'Coming Soon' : 'Launch Terminal'}
            </MagneticButton>
            <MagneticButton 
              onClick={handleExploreAgents}
              aria-label="Explore Agents"
              className="px-8 py-4 rounded-full bg-surface/50 border border-white/[0.08] backdrop-blur-md text-primary font-semibold text-base hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              Explore Agents
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right: Cinematic System Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, type: 'spring', damping: 20 }}
          className="w-full max-w-lg perspective-1000"
        >
          <motion.div 
            whileHover={{ scale: 1.02, rotateY: -2, rotateX: 2 }}
            className="p-6 rounded-3xl glass-panel relative overflow-hidden group transition-all duration-500 ease-out border border-white/[0.08]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <span className="text-xs font-semibold text-secondary uppercase tracking-widest">Live System Status</span>
                <div className="flex gap-1.5 items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                  <span className="text-xs text-emerald-400 font-mono">Operational</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-secondary">
                    <Activity className="w-3.5 h-3.5 text-accent" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Network TPS</span>
                  </div>
                  <div className="text-xl font-mono font-medium text-secondary">
                    {tps}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-secondary">
                    <Zap className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Mkt Volume</span>
                  </div>
                  <div className="text-xl font-mono font-medium text-primary">
                    ${volume.toFixed(2)}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-secondary">
                    <TerminalSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Executions</span>
                  </div>
                  <div className="text-xl font-mono font-medium text-primary">
                    {totalExecutions.toLocaleString()}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-secondary">
                    <Users className="w-3.5 h-3.5 text-pink-400" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Active Agents</span>
                  </div>
                  <div className="text-xl font-mono font-medium text-primary">
                    {activeAgents.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/[0.08]">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-secondary uppercase tracking-widest">Wallet</span>
                  <div className="flex items-center gap-1.5 text-xs text-primary font-mono">
                    <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                    Sync
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-secondary uppercase tracking-widest">OpenRouter</span>
                  <div className="flex items-center gap-1.5 text-xs text-primary font-mono">
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    Sync
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-secondary uppercase tracking-widest">Algorand</span>
                  <div className="flex items-center gap-1.5 text-xs text-primary font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Sync
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};
