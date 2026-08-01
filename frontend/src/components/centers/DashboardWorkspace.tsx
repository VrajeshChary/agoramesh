import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, TerminalSquare, ShieldCheck, Play } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { useAgents, useExecutions } from '../../lib/api';

import { ErrorState } from '../ui/ErrorState';

export const DashboardWorkspace: React.FC = () => {
  const { data: agents = [], isLoading: isLoadingAgents, isError: isErrorAgents, refetch: refetchAgents } = useAgents();
  const { data: executions = [], isLoading: isLoadingExecutions, isError: isErrorExecutions, refetch: refetchExecutions } = useExecutions();
  const [comingSoonId, setComingSoonId] = React.useState<string | null>(null);

  const handleLaunchClick = (id: string) => {
    setComingSoonId(id);
    setTimeout(() => setComingSoonId(null), 2000);
  };

  const totalAgents = agents.length;
  const totalExecutions = executions.length;
  const avgLatency = executions.length > 0 
    ? Math.round(executions.reduce((acc, curr) => acc + curr.execution_time_ms, 0) / executions.length)
    : 0;

  const recentExecutions = [...executions].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

  if (isErrorAgents || isErrorExecutions) {
    return (
      <ErrorState 
        title="Network Connection Lost" 
        message="The AgoraMesh frontend could not connect to the backend indexer. Please verify the network is active."
        onRetry={() => {
          refetchAgents();
          refetchExecutions();
        }}
      />
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 relative">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl font-heading font-semibold text-primary tracking-tight">Command Center</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 rounded-3xl glass-panel relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-3 text-secondary mb-6 relative z-10">
            <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
              <Zap className="w-4 h-4 text-accent" />
            </div>
            <span className="text-xs uppercase tracking-wider font-semibold text-secondary/80">Active Agents</span>
          </div>
          <div className="text-5xl font-mono text-primary font-medium mb-2 tracking-tight relative z-10">
            {isLoadingAgents ? '...' : totalAgents}
          </div>
          <div className="text-xs text-secondary font-medium relative z-10">
            Available on network
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 rounded-3xl glass-panel relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-3 text-secondary mb-6 relative z-10">
            <div className="w-8 h-8 rounded-xl bg-purple/10 flex items-center justify-center border border-purple/20">
              <Clock className="w-4 h-4 text-purple" />
            </div>
            <span className="text-xs uppercase tracking-wider font-semibold text-secondary/80">Avg Compute Time</span>
          </div>
          <div className="text-5xl font-mono text-primary font-medium mb-2 tracking-tight relative z-10 flex items-baseline gap-2">
            {isLoadingExecutions ? '...' : avgLatency}<span className="text-2xl text-secondary/70">ms</span>
          </div>
          <div className="text-xs text-secondary font-medium relative z-10">
            Global average latency
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="p-6 rounded-3xl glass-panel relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-3 text-secondary mb-6 relative z-10">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <TerminalSquare className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-xs uppercase tracking-wider font-semibold text-secondary/80">Total Executions</span>
          </div>
          <div className="text-5xl font-mono text-primary font-medium mb-2 tracking-tight relative z-10">
            {isLoadingExecutions ? '...' : totalExecutions}
          </div>
          <div className="text-xs text-secondary font-medium relative z-10">
            Successfully completed
          </div>
        </motion.div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        {/* Active Subscriptions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="p-8 rounded-3xl glass-panel overflow-hidden relative"
        >
          <h3 className="text-xl font-heading font-semibold text-primary mb-6 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Pinned Agents
          </h3>
          <div className="flex flex-col gap-4">
            {isLoadingAgents ? (
              <div className="text-secondary/50 text-sm">Loading agents...</div>
            ) : agents.length > 0 ? (
              agents.slice(0, 2).map((agent, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-surface/50 border border-white/[0.04] hover:bg-surface hover:border-white/[0.08] transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-accent/10 border-accent/20 border flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform`}>
                      <ShieldCheck className={`w-5 h-5 text-accent`} />
                    </div>
                    <div>
                      <div className="font-medium text-primary text-sm">{agent.name}</div>
                      <div className={`text-[10px] uppercase tracking-wider font-semibold text-accent`}>{agent.category}</div>
                    </div>
                  </div>
                  <MagneticButton 
                    onClick={() => handleLaunchClick(agent.id)}
                    aria-label={`Launch ${agent.name}`}
                    className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] text-primary text-xs font-semibold flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/20 min-w-[90px] justify-center"
                  >
                    {comingSoonId === agent.id ? (
                      'Coming Soon'
                    ) : (
                      <><Play className="w-3 h-3" /> Launch</>
                    )}
                  </MagneticButton>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center bg-white/[0.02] border border-white/[0.04] rounded-2xl border-dashed">
                <ShieldCheck className="w-8 h-8 text-secondary/30 mb-2" />
                <span className="text-sm font-medium text-primary">No Pinned Agents</span>
                <span className="text-xs text-secondary mt-1">Explore the marketplace to pin agents</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* System Logs Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="p-8 rounded-3xl glass-panel overflow-hidden relative flex flex-col"
        >
          <h3 className="text-xl font-heading font-semibold text-primary mb-6 flex items-center gap-3">
            <TerminalSquare className="w-5 h-5 text-secondary" />
            Recent Activity
          </h3>
          <div className="flex-1 bg-background/50 rounded-2xl border border-white/[0.04] p-4 font-mono text-[11px] leading-relaxed flex flex-col gap-2 overflow-y-auto max-h-[250px]">
            {isLoadingExecutions || isLoadingAgents ? (
              <div className="text-secondary/50">Loading activity...</div>
            ) : recentExecutions.length > 0 ? (
              recentExecutions.map((exec) => {
                const agent = agents.find(a => a.id === exec.agent_id);
                const agentName = agent ? agent.name : 'Unknown Agent';
                const timeStr = new Date(exec.created_at).toLocaleTimeString([], { hour12: false });
                
                return (
                  <div key={exec.id} className="text-secondary">
                    <span className="text-accent">[{timeStr}]</span> SUCCESS: {agentName} execution completed in {exec.execution_time_ms}ms.
                  </div>
                )
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-6 h-full opacity-50">
                <TerminalSquare className="w-6 h-6 text-secondary mb-2" />
                <span className="text-xs font-medium text-secondary">No recent activity detected</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
