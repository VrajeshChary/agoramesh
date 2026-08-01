import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, Wallet, TerminalSquare, FileText, Image as ImageIcon, LineChart } from 'lucide-react';

interface UniversalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onTabChange?: (tab: string) => void;
}

const SEARCH_RESULTS = [
  { id: '1', title: 'Connect Algorand Wallet', type: 'Action', icon: Wallet, tab: 'wallet' },
  { id: '2', title: 'DeFi Analyst Agent', type: 'Agent', icon: LineChart, tab: 'marketplace' },
  { id: '3', title: 'Document OCR Model', type: 'Agent', icon: FileText, tab: 'marketplace' },
  { id: '4', title: 'Image Generation', type: 'Agent', icon: ImageIcon, tab: 'marketplace' },
  { id: '5', title: 'View Execution Logs', type: 'System', icon: TerminalSquare, tab: 'execution' },
];

export const UniversalSearch: React.FC<UniversalSearchProps> = ({ isOpen, onClose, onTabChange }) => {
  const [query, setQuery] = useState('');
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = SEARCH_RESULTS.filter(r => r.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/40 backdrop-blur-3xl"
            onClick={onClose}
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, y: -20, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-surface/80 backdrop-blur-3xl border border-white/[0.08] rounded-2xl shadow-premium overflow-hidden"
          >
            {/* Input Area */}
            <div className="flex items-center px-4 py-4 border-b border-white/[0.08]">
              <Search className="w-5 h-5 text-secondary mr-3" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search agents, actions, or jump to..."
                className="flex-1 bg-transparent border-none outline-none text-lg text-primary placeholder:text-secondary/50 font-medium"
              />
              <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded text-xs text-secondary font-mono">
                <Command className="w-3 h-3" /> K
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filtered.length > 0 ? (
                filtered.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (onTabChange) onTabChange(item.tab);
                        onClose();
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.06] group transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 shadow-inner">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-primary">{item.title}</div>
                          <div className="text-xs text-secondary">{item.type}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  );
                })
              ) : (
                <div className="py-12 text-center text-sm text-secondary">
                  No results found for "{query}"
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="px-4 py-3 bg-white/[0.02] border-t border-white/[0.08] flex items-center justify-between text-xs text-secondary/70">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1"><span className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-primary">↑↓</span> to navigate</div>
                <div className="flex items-center gap-1"><span className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-primary">↵</span> to select</div>
              </div>
              <div className="flex items-center gap-1"><span className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-primary">esc</span> to close</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
