import React from 'react';
import { TerminalSquare, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useExecutions, useAgents } from '../../lib/api';
import { ErrorState } from '../ui/ErrorState';

export const ExecutionHistory: React.FC = () => {
  const { data: executions = [], isLoading: isLoadingExecutions, isError: isErrorExecutions, refetch: refetchExecutions } = useExecutions();
  const { data: agents = [], isLoading: isLoadingAgents, isError: isErrorAgents, refetch: refetchAgents } = useAgents();

  const getAgentName = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    return agent ? agent.name : 'Unknown Agent';
  };

  if (isErrorExecutions || isErrorAgents) {
    return (
      <ErrorState 
        title="Failed to Fetch History" 
        message="Could not retrieve the execution logs from the backend. Please verify the network is active."
        onRetry={() => {
          refetchAgents();
          refetchExecutions();
        }}
      />
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-heading font-semibold text-primary tracking-tight">Execution History</h2>
          <p className="text-sm text-secondary/80 mt-1">Review your past agent interactions and receipts.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/60" />
            <input 
              type="text" 
              placeholder="Search executions..." 
              className="w-full bg-surface/50 border border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-sm text-primary placeholder:text-secondary/50 focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
          <button className="p-2 rounded-xl bg-surface/50 border border-white/[0.08] hover:bg-white/[0.05] transition-colors text-secondary hover:text-primary">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full overflow-hidden rounded-3xl glass-panel relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        
        <div className="w-full overflow-x-auto relative z-10">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-secondary/70 border-b border-white/[0.04] bg-surface/40">
              <tr>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Agent Name</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Prompt</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Execution Time</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Model</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="text-primary divide-y divide-white/[0.04]">
              {isLoadingExecutions || isLoadingAgents ? (
                // Skeleton Rows
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-5"><div className="w-32 h-4 bg-white/[0.05] rounded" /></td>
                    <td className="px-6 py-5"><div className="w-48 h-4 bg-white/[0.05] rounded" /></td>
                    <td className="px-6 py-5"><div className="w-16 h-4 bg-white/[0.05] rounded" /></td>
                    <td className="px-6 py-5"><div className="w-20 h-4 bg-white/[0.05] rounded" /></td>
                    <td className="px-6 py-5 flex justify-end"><div className="w-24 h-4 bg-white/[0.05] rounded" /></td>
                  </tr>
                ))
              ) : executions.length > 0 ? (
                executions.map((ex, i) => (
                  <motion.tr 
                    key={ex.id}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + (i * 0.05) }}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-6 py-5 font-medium flex items-center gap-3">
                      <div className="p-1.5 rounded-md bg-white/[0.03] border border-white/[0.08]">
                        <TerminalSquare className="w-4 h-4 text-accent" />
                      </div>
                      <span className="truncate max-w-[150px]">{getAgentName(ex.agent_id)}</span>
                    </td>
                    <td className="px-6 py-5 text-secondary/80 truncate max-w-[200px]" title={ex.prompt}>
                      {ex.prompt || 'No prompt provided'}
                    </td>
                    <td className="px-6 py-5 font-mono text-primary">
                      {ex.execution_time_ms}ms
                    </td>
                    <td className="px-6 py-5 text-secondary/80">
                      {ex.model || 'Unknown Model'}
                    </td>
                    <td className="px-6 py-5 text-right text-secondary/60">
                      {new Date(ex.created_at).toLocaleString()}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <TerminalSquare className="w-12 h-12 text-secondary/30 mb-4" />
                      <h3 className="text-xl font-heading font-semibold text-primary mb-2">No Executions Found</h3>
                      <p className="text-secondary text-sm max-w-sm">Your agent execution history will appear here once you start interacting with the network.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
