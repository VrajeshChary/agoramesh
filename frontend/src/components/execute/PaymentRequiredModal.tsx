import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Copy, CheckCircle2, ShieldCheck, Cpu, Wallet, Database } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

interface PaymentRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
  currency: string;
  receiver: string;
}

export const PaymentRequiredModal: React.FC<PaymentRequiredModalProps> = ({
  isOpen,
  onClose,
  price,
  currency,
  receiver
}) => {
  const [copied, setCopied] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setWalletAddress(localStorage.getItem('pera-wallet-address'));
    }
  }, [isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(receiver);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        className="w-full max-w-md bg-surface border border-white/[0.08] rounded-2xl shadow-premium overflow-hidden relative z-10 p-6 flex flex-col"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-secondary hover:text-primary hover:bg-white/[0.04] transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {walletAddress && (
          <div className="flex items-center justify-between bg-white/[0.02] border border-white/[0.04] rounded-xl px-4 py-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Wallet className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-secondary uppercase tracking-widest">Connected Wallet</span>
                <span className="text-sm font-mono text-primary font-medium">
                  {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Connected
            </div>
          </div>
        )}

        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl border border-white/[0.08] flex items-center justify-center bg-white/[0.02] shadow-glass mb-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gold/10 blur-xl animate-pulse" />
            <ShieldCheck className="w-7 h-7 text-gold relative z-10" />
          </div>
          <h2 className="text-xl font-heading font-semibold text-primary mb-1">Payment Required</h2>
          <p className="text-sm text-secondary">This agent requires a micropayment for inference execution.</p>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-4 mb-6 flex flex-col gap-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-accent/10 rounded-full blur-[50px] pointer-events-none -z-10" />
          
          <div className="grid grid-cols-2 gap-y-4 gap-x-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-secondary font-medium uppercase tracking-wider mb-1">Network</span>
              <span className="text-sm font-medium text-primary flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-accent" />
                Algorand TestNet
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-secondary font-medium uppercase tracking-wider mb-1">Currency</span>
              <span className="text-sm font-medium text-primary">{currency}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-secondary font-medium uppercase tracking-wider mb-1">Price</span>
              <span className="text-sm font-semibold text-primary">{price}</span>
            </div>
          </div>

          <div className="h-px w-full bg-white/[0.04] my-1" />

          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-secondary font-medium uppercase tracking-wider">Receiver Wallet</span>
            <div className="bg-background/50 border border-white/[0.04] rounded-lg px-3 py-2.5 text-xs font-mono text-primary truncate">
              {receiver}
            </div>
            <button 
              onClick={handleCopy}
              className={`w-full py-2.5 rounded-lg border transition-colors flex items-center justify-center gap-2 text-sm font-medium ${
                copied 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                  : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-primary'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  ✓ Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-secondary" />
                  Copy Address
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <MagneticButton 
            disabled
            className="w-full py-3.5 rounded-xl bg-primary/50 text-background font-semibold cursor-not-allowed opacity-70 flex items-center justify-center gap-2"
          >
            <Cpu className="w-4 h-4" /> Coming Soon
          </MagneticButton>
          <button 
            onClick={onClose}
            className="w-full py-3 rounded-xl hover:bg-white/[0.04] text-secondary hover:text-primary text-sm font-semibold transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};
