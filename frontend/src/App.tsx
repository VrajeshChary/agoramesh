import { useState, Suspense, lazy } from 'react';
import { useAgents, executeAgent, type Agent } from './lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { AppLayout } from './components/layout/AppLayout';
import { Hero } from './components/hero/Hero';
import { AppCategories } from './components/categories/AppCategories';
import { AgentCard } from './components/agents/AgentCard';
import { Search, Loader2 } from 'lucide-react';
import { PaymentRequiredModal } from './components/execute/PaymentRequiredModal';
import { ErrorState } from './components/ui/ErrorState';

// Lazy loaded heavy components
const WalletCenter = lazy(() => import('./components/centers/WalletCenter').then(module => ({ default: module.WalletCenter })));
const AnalyticsWorkspace = lazy(() => import('./components/centers/AnalyticsWorkspace').then(module => ({ default: module.AnalyticsWorkspace })));
const DeveloperCenter = lazy(() => import('./components/centers/DeveloperCenter').then(module => ({ default: module.DeveloperCenter })));
const ExecutionHistory = lazy(() => import('./components/centers/ExecutionHistory').then(module => ({ default: module.ExecutionHistory })));
const DashboardWorkspace = lazy(() => import('./components/centers/DashboardWorkspace').then(module => ({ default: module.DashboardWorkspace })));
const ExecuteTerminal = lazy(() => import('./components/execute/ExecuteTerminal').then(module => ({ default: module.ExecuteTerminal })));

function App() {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  
  const [isExecuting, setIsExecuting] = useState(false);
  const [paymentChallenge, setPaymentChallenge] = useState<any | null>(null); // Type is defined in backend schema, using any for now or PaymentRequiredError
  const [promptModalAgent, setPromptModalAgent] = useState<Agent | null>(null);
  const [promptInput, setPromptInput] = useState('');
  const [executionError, setExecutionError] = useState<string | null>(null);
  
  const { data: rawAgents = [], isLoading, isError, refetch } = useAgents();

  const handleOpenPrompt = (agent: Agent) => {
    setPromptModalAgent(agent);
    setPromptInput('');
  };

  const handleExecuteAgent = async () => {
    if (!promptModalAgent || !promptInput.trim()) return;
    const agent = promptModalAgent;
    setPromptModalAgent(null);
    setIsExecuting(true);
    try {
      await executeAgent(agent.id, promptInput);
      // On success (200), we could show the terminal. But for now, x402 returns 402.
    } catch (error: any) {
      if (error.status === 402) {
        setPaymentChallenge(error.data);
      } else {
        console.error("Execution failed:", error);
        setExecutionError("Execution failed to initialize. Please check your network connection and try again.");
      }
    } finally {
      setIsExecuting(false);
    }
  };

  const filteredAgents = rawAgents.filter((agent: Agent) => {
    const matchesCategory = activeCategory === 'all' || (agent.category && agent.category.toLowerCase().includes(activeCategory.toLowerCase()));
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      (agent.name && agent.name.toLowerCase().includes(searchLower)) ||
      (agent.description && agent.description.toLowerCase().includes(searchLower)) ||
      (agent.category && agent.category.toLowerCase().includes(searchLower));
    return matchesCategory && matchesSearch;
  });

  return (
    <AppLayout activeTab={activeTab} onTabChange={setActiveTab}>
      
      {activeTab === 'marketplace' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <Hero />
          
          {/* App Categories & Agents */}
          <section className="mt-20">
            <AppCategories activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
            
            <div className="relative mb-8 z-50 flex justify-center">
              <motion.div 
                layout
                initial={false}
                animate={{ 
                  width: isSearchFocused ? '100%' : '50%',
                  scale: isSearchFocused ? 1.02 : 1
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative"
              >
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${isSearchFocused ? 'text-accent' : 'text-secondary/50'}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search by name, description, or category..."
                  className={`w-full bg-surface/80 backdrop-blur-md border rounded-2xl pl-12 pr-6 py-4 text-primary placeholder:text-secondary/50 focus:outline-none transition-all duration-300 shadow-inner ${
                    isSearchFocused 
                      ? 'border-accent/50 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]' 
                      : 'border-white/[0.08] hover:border-white/[0.12]'
                  }`}
                  style={{ caretColor: 'transparent' }} // Hide default caret
                />
                
                {/* Custom Animated Caret */}
                {isSearchFocused && (
                  <motion.div 
                    className="absolute top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent pointer-events-none"
                    style={{ left: `calc(3rem + ${searchQuery.length}ch)` }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                )}
              </motion.div>
            </div>

            {/* Background Blur Overlay when searching */}
            <AnimatePresence>
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 pointer-events-none"
                />
              )}
            </AnimatePresence>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-30">
              {isLoading ? (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-[280px] rounded-3xl glass-panel border border-white/[0.04] overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                      <div className="p-6 h-full flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-12 h-12 rounded-xl bg-white/[0.02]" />
                          <div className="w-16 h-6 rounded-full bg-white/[0.02]" />
                        </div>
                        <div className="w-3/4 h-6 rounded bg-white/[0.02] mb-3" />
                        <div className="w-full h-4 rounded bg-white/[0.02] mb-2" />
                        <div className="w-5/6 h-4 rounded bg-white/[0.02] mb-auto" />
                        <div className="flex justify-between items-end mt-4">
                          <div className="w-20 h-8 rounded bg-white/[0.02]" />
                          <div className="w-24 h-10 rounded-xl bg-white/[0.02]" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : isError ? (
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                  <ErrorState 
                    title="Failed to Load Marketplace" 
                    message="Could not connect to the network indexer. Please verify the backend is active."
                    onRetry={() => refetch()}
                  />
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {filteredAgents.length > 0 ? filteredAgents.map((agent: Agent) => (
                    <AgentCard 
                      key={agent.id}
                      id={agent.id}
                      name={agent.name}
                      company={agent.category || 'Independent'}
                      description={agent.description}
                      trustScore={agent.trust_score}
                      model={agent.model || 'N/A'}
                      price={agent.price}
                      onExecute={() => handleOpenPrompt(agent)}
                    />
                  )) : (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} layout
                      className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-secondary"
                    >
                      <div className="flex flex-col items-center justify-center p-8 glass-panel rounded-3xl border border-white/[0.04]">
                        <Search className="w-12 h-12 text-secondary/30 mb-4" />
                        <h3 className="text-xl font-heading font-semibold text-primary mb-2">No agents found</h3>
                        <p className="text-secondary text-sm">We couldn't find any modules matching your search. Try adjusting your filters.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.div>
          </section>
        </motion.div>
      )}

      <Suspense fallback={
        <div className="w-full min-h-[400px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      }>
        {activeTab === 'wallet' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <WalletCenter />
          </motion.div>
        )}

        {activeTab === 'dashboard' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <DashboardWorkspace />
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <AnalyticsWorkspace />
          </motion.div>
        )}

        {activeTab === 'developers' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <DeveloperCenter />
          </motion.div>
        )}

        {activeTab === 'execution' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <ExecutionHistory />
          </motion.div>
        )}
      </Suspense>

      {promptModalAgent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col gap-6 p-8 glass-panel rounded-3xl border border-white/[0.08] w-full max-w-md relative"
          >
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-accent/10 rounded-full blur-[80px] pointer-events-none -z-10" />
            
            <div>
              <h2 className="text-2xl font-heading font-semibold text-primary">Task Prompt</h2>
              <p className="text-secondary/80 text-sm mt-1">What would you like <span className="text-primary font-medium">{promptModalAgent.name}</span> to do?</p>
            </div>

            <textarea 
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="e.g. Analyze the latest ETH price action and summarize support levels..."
              className="w-full bg-surface/50 border border-white/[0.08] rounded-xl p-4 text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent/50 transition-colors min-h-[120px] resize-none"
              autoFocus
            />

            <div className="flex gap-3 justify-end mt-2">
              <button 
                onClick={() => setPromptModalAgent(null)}
                className="px-5 py-2.5 rounded-xl border border-white/[0.08] text-secondary hover:text-primary hover:bg-white/[0.05] transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleExecuteAgent}
                disabled={!promptInput.trim()}
                className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-white font-medium text-sm transition-colors shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Execute Agent
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {isExecuting && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 p-8 glass-panel rounded-3xl border border-white/[0.08]"
          >
            <Loader2 className="w-10 h-10 text-accent animate-spin" />
            <div className="text-primary font-medium text-lg">Initializing Execution...</div>
            <div className="text-secondary text-sm">Contacting agent node via network</div>
          </motion.div>
        </div>
      )}

      {executionError && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col gap-4 p-8 glass-panel rounded-3xl border border-white/[0.08] w-full max-w-md relative text-center"
          >
            <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-primary">Execution Error</h2>
              <p className="text-secondary/80 text-sm mt-2">{executionError}</p>
            </div>
            <button 
              onClick={() => setExecutionError(null)}
              className="mt-4 w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-primary transition-colors font-medium text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              Dismiss
            </button>
          </motion.div>
        </div>
      )}
      <PaymentRequiredModal 
        isOpen={!!paymentChallenge}
        onClose={() => setPaymentChallenge(null)}
        price={paymentChallenge?.price || 0}
        currency={paymentChallenge?.currency || 'USDC'}
        receiver={paymentChallenge?.receiver || ''}
      />

      <Suspense fallback={null}>
        {selectedAgent && (
          <ExecuteTerminal 
            isOpen={true}
            onClose={() => setSelectedAgent(null)}
            agentId={selectedAgent.id}
            price={selectedAgent.price}
          />
        )}
      </Suspense>
    </AppLayout>
  );
}

export default App;
