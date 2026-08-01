import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, CheckCircle2, Cpu } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

interface ExecuteTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  agentId: string | null;
  price: number;
}

const TERMINAL_LOGS = {
  // Steps 1-4: Initialize -> Wallet check -> Reading agent -> Reading blockchain
  init: [
    { text: '> Initialize secure connection...', color: 'text-secondary', delay: 200 },
    { text: '> Checking wallet connection...', color: 'text-secondary', delay: 800 },
    { text: '> Wallet verified: 0x4F...9A2C', color: 'text-emerald-400', delay: 1400 },
    { text: '> Reading agent configuration...', color: 'text-secondary', delay: 2000 },
    { text: '> Reading blockchain state...', color: 'text-secondary', delay: 2800 },
    { text: '> Payment Required. Issuing challenge...', color: 'text-purple-400', delay: 3500 },
  ],
  // Steps 5-7: Payment Required -> Wallet approval -> Payment confirmed
  executing: [
    { text: '> Waiting for wallet approval...', color: 'text-gold', delay: 0 },
    { text: '> Payment confirmed. Signature verified.', color: 'text-emerald-400', delay: 1000 },
    { text: '> Executing model...', color: 'text-accent', delay: 1800 },
  ],
  // Step 8-12: Streaming tokens -> Completed -> Execution saved -> Blockchain receipt
  streaming: [
    { text: '> Streaming tokens...', color: 'text-green-400', delay: 0 },
    { text: '> Completed inference.', color: 'text-emerald-400', delay: 3000 },
    { text: '> Execution saved to history.', color: 'text-secondary', delay: 3800 },
    { text: '> Blockchain receipt generated: 0x7a2...b41f', color: 'text-purple-400', delay: 4500 },
  ]
};

export const ExecuteTerminal: React.FC<ExecuteTerminalProps> = ({ isOpen, onClose, agentId, price }) => {
  const [step, setStep] = useState<number>(0);
  const [logs, setLogs] = useState<{text: string, color: string}[]>([]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
    if (step >= 4 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [logs, step]);

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setLogs([]);
      
      let timeoutIds: ReturnType<typeof setTimeout>[] = [];
      
      // Sequence 1: Init -> Wallet Check -> Reading Agent -> Reading Blockchain -> Payment Required
      TERMINAL_LOGS.init.forEach(log => {
        timeoutIds.push(setTimeout(() => {
          setLogs(prev => [...prev, log]);
        }, log.delay));
      });
      
      // Transition to Payment UI
      timeoutIds.push(setTimeout(() => {
        setStep(1);
      }, 4200));

      return () => timeoutIds.forEach(clearTimeout);
    }
  }, [isOpen, agentId]);

  const handlePay = () => {
    setStep(2); // Wallet approval / Executing
    
    let timeoutIds: ReturnType<typeof setTimeout>[] = [];
    
    // Sequence 2: Wallet approval -> Payment confirmed -> Executing model
    TERMINAL_LOGS.executing.forEach(log => {
      timeoutIds.push(setTimeout(() => {
        setLogs(prev => [...prev, log]);
      }, log.delay));
    });

    // Sequence 3: Streaming Tokens
    timeoutIds.push(setTimeout(() => {
      setStep(3); // Streaming state
      TERMINAL_LOGS.streaming.forEach(log => {
        timeoutIds.push(setTimeout(() => {
          setLogs(prev => [...prev, log]);
        }, log.delay));
      });
    }, 2800));

    // Sequence 4: Completed -> Receipt
    timeoutIds.push(setTimeout(() => {
      setStep(4); // Receipt / Finished state
      setLogs(prev => [...prev, { text: '> Agent node awaits instructions. Type "help" for commands.', color: 'text-secondary', delay: 0 }]);
    }, 2800 + 5000));
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const cmd = inputValue.trim().toLowerCase();
      setLogs(prev => [...prev, { text: `> ${inputValue}`, color: 'text-primary', delay: 0 }]);
      setInputValue('');
      
      if (cmd === 'clear') {
        setLogs([]);
      } else if (cmd === 'help') {
        setLogs(prev => [...prev, 
          { text: 'Available commands:', color: 'text-accent', delay: 0 },
          { text: '  clear  - Clear terminal output', color: 'text-secondary', delay: 0 },
          { text: '  status - Show node status', color: 'text-secondary', delay: 0 },
          { text: '  help   - Show this help message', color: 'text-secondary', delay: 0 },
        ]);
      } else if (cmd === 'status') {
        setLogs(prev => [...prev, { text: 'Node is healthy. Connection to Algorand mainnet active.', color: 'text-emerald-400', delay: 0 }]);
      } else {
        setLogs(prev => [...prev, { text: `Command not found: ${cmd}`, color: 'text-red-400', delay: 0 }]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-4xl bg-surface border border-white/[0.08] rounded-2xl shadow-premium overflow-hidden relative z-10 flex flex-col md:flex-row h-[600px]"
      >
        
        {/* Left Side: Logs */}
        <div className="w-full md:w-[60%] border-r border-white/[0.08] bg-[#0A0A0C] flex flex-col h-full">
          {/* Header */}
          <div className="h-12 border-b border-white/[0.08] flex items-center px-4 justify-between bg-surface/50">
            <div className="flex items-center gap-3">
              <TerminalIcon className="w-4 h-4 text-secondary" />
              <span className="text-xs font-mono text-secondary">agora-mesh ~ execution-node</span>
            </div>
          </div>
          
          {/* Terminal Output */}
          <div 
            ref={scrollRef}
            className="flex-1 p-6 overflow-y-auto font-mono text-sm flex flex-col gap-2 scroll-smooth"
          >
            {logs.map((log, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={log.color}
              >
                {log.text}
              </motion.div>
            ))}
            
            {step >= 3 && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-primary whitespace-pre-wrap leading-relaxed"
              >
                {/* Simulated streaming content */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.05 }}
                >
                  {`{\n  "status": "success",\n  "analysis": "Smart contract vulnerability detected in line 42.",\n  "confidence": 0.98,\n  "recommendation": "Implement ReentrancyGuard"\n}`.split('').map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              </motion.div>
            )}
            
            {step < 4 ? (
              <div className="w-2 h-4 bg-primary/50 animate-pulse mt-2" />
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-secondary">&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleCommand}
                  className="flex-1 bg-transparent outline-none border-none text-primary font-mono text-sm caret-accent"
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Side: UI Status / Interaction */}
        <div className="w-full md:w-[40%] bg-surface flex flex-col p-8 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-secondary hover:text-primary hover:bg-white/[0.04] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
            <div className="mb-8">
              <h3 className="text-2xl font-heading font-semibold text-primary mb-2">Execution Protocol</h3>
              <p className="text-sm text-secondary">Agent node provisioning and payment verification.</p>
            </div>

            <div className="relative h-[250px]">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div 
                    key="init"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl border border-white/[0.08] flex items-center justify-center bg-surface relative z-10 shadow-glass">
                        <Cpu className="w-6 h-6 text-accent animate-pulse" />
                      </div>
                      <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-xl animate-pulse" />
                    </div>
                    <span className="text-sm font-medium text-secondary animate-pulse">Initializing Secure Node...</span>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div 
                    key="pay"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="absolute inset-0 flex flex-col justify-center gap-6"
                  >
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                      <div className="flex justify-between text-sm mb-4">
                        <span className="text-secondary">Agent Fee</span>
                        <span className="text-primary font-medium">{price} USDC</span>
                      </div>
                      <div className="flex justify-between text-sm mb-4">
                        <span className="text-secondary">Network Gas</span>
                        <span className="text-primary font-medium">0.05 ALGO</span>
                      </div>
                      <div className="h-px w-full bg-white/[0.04] mb-4" />
                      <div className="flex justify-between items-center">
                        <span className="text-primary font-semibold">Total</span>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-accent">{price} USDC</div>
                          <div className="text-[10px] text-secondary">~ $1.40 USD</div>
                        </div>
                      </div>
                    </div>
                    
                    <MagneticButton 
                      onClick={handlePay}
                      className="w-full py-3.5 rounded-2xl bg-primary text-background font-semibold shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 relative z-10"
                    >
                      Double Click to Pay
                    </MagneticButton>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="approve"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-gold/30 border-t-gold animate-spin mb-4" />
                    <h4 className="text-primary font-medium text-lg">Awaiting Wallet Signature</h4>
                    <p className="text-sm text-secondary">Please confirm the transaction in your connected wallet.</p>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="stream"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-500/20 blur-xl animate-pulse rounded-full" />
                      <div className="w-16 h-16 rounded-full border border-green-500/30 bg-green-500/10 flex items-center justify-center relative z-10">
                        <TerminalIcon className="w-6 h-6 text-green-400" />
                      </div>
                    </div>
                    <h4 className="text-primary font-medium text-lg">Streaming Neural Output</h4>
                    <p className="text-sm text-secondary">Agent is actively processing inference.</p>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </div>
                    <div className="text-center mt-2">
                      <div className="text-xl font-semibold text-primary mb-1">Execution Complete</div>
                      <div className="text-sm text-secondary font-mono bg-white/[0.04] px-3 py-1 rounded-md">Tx: 0x7a2...b41f</div>
                    </div>
                    <MagneticButton 
                      onClick={onClose}
                      className="mt-6 px-6 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] text-primary text-sm font-semibold transition-colors"
                    >
                      Close Terminal
                    </MagneticButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
