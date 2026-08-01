import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Activity } from 'lucide-react';
import { useExecutions, useAgents } from '../../lib/api';
import { ErrorState } from '../ui/ErrorState';

export const AnalyticsWorkspace: React.FC = () => {
  const { data: executions = [], isLoading: isLoadingExecutions, isError: isErrorExecutions, refetch: refetchExecutions } = useExecutions();
  const { data: agents = [], isLoading: isLoadingAgents, isError: isErrorAgents, refetch: refetchAgents } = useAgents();

  const isLoading = isLoadingExecutions || isLoadingAgents;
  const isError = isErrorExecutions || isErrorAgents;

  const { totalVolume, chartData, topAgents, activeAgents } = useMemo(() => {
    if (executions.length === 0 || agents.length === 0) {
      return { totalVolume: '0.00', chartData: Array(7).fill(0), topAgents: [], activeAgents: 0 };
    }

    // 1. Calculate Total Volume
    let sum = 0;
    executions.forEach(exec => {
      const agent = agents.find(a => a.id === exec.agent_id);
      if (agent) {
        sum += agent.price;
      }
    });

    // 2. Calculate Execution Volume (7d)
    const countsByDay = new Array(7).fill(0);
    executions.forEach(exec => {
      const day = new Date(exec.created_at).getDay(); // 0 = Sunday, 1 = Monday
      // Map JS getDay (Sun-Sat) to our chart (Mon-Sun)
      const chartIndex = day === 0 ? 6 : day - 1;
      countsByDay[chartIndex]++;
    });
    // Normalize heights to percentage
    const maxCount = Math.max(...countsByDay, 1);
    const chartDataNormalized = countsByDay.map(c => Math.round((c / maxCount) * 100));

    // 3. Calculate Top Agents
    const countsByAgent: Record<string, number> = {};
    executions.forEach(exec => {
      countsByAgent[exec.agent_id] = (countsByAgent[exec.agent_id] || 0) + 1;
    });

    const sortedAgents = Object.entries(countsByAgent)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([agentId, count], index) => {
        const agent = agents.find(a => a.id === agentId);
        const colors = ['bg-emerald-400', 'bg-cyan-400', 'bg-purple-400', 'bg-red-400'];
        return {
          name: agent ? agent.name : 'Unknown',
          usage: Math.round((count / executions.length) * 100),
          color: colors[index % colors.length]
        };
      });

    // Calculate Active Agents (unique agent_ids in executions)
    const activeAgentsSet = new Set(executions.map(e => e.agent_id));
    const activeAgentsCount = activeAgentsSet.size;

    return { 
      totalVolume: sum.toFixed(2), 
      chartData: chartDataNormalized, 
      topAgents: sortedAgents,
      activeAgents: activeAgentsCount
    };
  }, [executions, agents]);

  if (isError) {
    return (
      <ErrorState 
        title="Analytics Unavailable" 
        message="Could not fetch metrics from the network. Please verify the backend services are running."
        onRetry={() => {
          refetchAgents();
          refetchExecutions();
        }}
      />
    );
  }

  const stats = [
    { label: 'Total Volume', value: isLoading ? '...' : `$${totalVolume}`, icon: Activity },
    { label: 'Active Agents', value: isLoading ? '...' : activeAgents.toString(), icon: Users },
    { label: 'Total Executions', value: isLoading ? '...' : executions.length.toString(), icon: TrendingUp },
    { label: 'Avg Cost/Exec', value: isLoading ? '...' : `$${(executions.length > 0 ? parseFloat(totalVolume) / executions.length : 0).toFixed(2)}`, icon: BarChart3 },
  ];

  return (
    <div className="w-full flex flex-col gap-6 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div>
        <h2 className="text-3xl font-heading font-semibold text-primary tracking-tight">Analytics</h2>
        <p className="text-sm text-secondary/80 mt-1">Network performance and economic metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl bg-surface/50 border border-white/[0.08] backdrop-blur-md relative overflow-hidden group hover:border-white/[0.12] transition-colors"
            >
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <Icon className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" />
                </div>
              </div>
              <div className="relative z-10">
                <div className="text-2xl font-semibold text-primary font-mono tracking-tight">{stat.value}</div>
                <div className="text-xs text-secondary/70 mt-1 uppercase tracking-wider font-semibold">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="p-8 rounded-3xl glass-panel relative overflow-hidden h-[400px]"
        >
          <h3 className="text-xl font-heading font-semibold text-primary mb-6">Execution Volume (7d)</h3>
          
          <div className="absolute inset-x-8 bottom-8 top-24 flex items-end justify-between gap-2">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center text-secondary/50">Loading chart data...</div>
            ) : executions.length === 0 ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-secondary/40 border border-white/[0.04] border-dashed rounded-2xl bg-white/[0.01]">
                <Activity className="w-8 h-8 mb-2 opacity-50" />
                <span className="text-sm font-medium">No Execution Data</span>
              </div>
            ) : (
              chartData.map((height, i) => (
                <div key={i} className="relative flex-1 flex justify-center group h-full">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1), type: 'spring' }}
                    className="absolute bottom-0 w-full max-w-[40px] bg-accent/20 border border-accent/30 rounded-t-lg group-hover:bg-accent/40 transition-colors"
                  />
                  <div className="absolute -bottom-6 text-[10px] text-secondary font-mono">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="p-8 rounded-3xl glass-panel relative overflow-hidden h-[400px]"
        >
          <h3 className="text-xl font-heading font-semibold text-primary mb-6">Top Agents by Usage</h3>
          <div className="flex flex-col gap-6 mt-8">
            {isLoading ? (
              <div className="text-secondary/50">Loading metrics...</div>
            ) : topAgents.length > 0 ? (
              topAgents.map((agent, i) => (
                <div key={agent.name + i} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-secondary truncate">{agent.name}</div>
                  <div className="flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${agent.usage}%` }}
                      transition={{ duration: 1, delay: 0.6 + (i * 0.1) }}
                      className={`h-full ${agent.color}`}
                    />
                  </div>
                  <div className="w-12 text-right text-xs font-mono text-primary">{agent.usage}%</div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-secondary/40 border border-white/[0.04] border-dashed rounded-2xl bg-white/[0.01] py-12">
                <Users className="w-8 h-8 mb-2 opacity-50" />
                <span className="text-sm font-medium">No Agents Used</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
