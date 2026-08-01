import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hexagon, LayoutDashboard, TerminalSquare, Wallet, Globe, Code, LineChart, Zap } from 'lucide-react';
import { PeraWalletConnect } from '@perawallet/connect';

// Initialize PeraWallet outside of component to ensure single instance
const peraWallet = new PeraWalletConnect();

const NAV_ITEMS = [
  { id: 'marketplace', label: 'Marketplace', icon: Globe },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'execution', label: 'Execution', icon: TerminalSquare },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
  { id: 'developers', label: 'Developers', icon: Code },
  { id: 'analytics', label: 'Analytics', icon: LineChart },
];

interface FloatingNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ activeTab, onTabChange }) => {
  const [connectionState, setConnectionState] = useState<'disconnected' | 'connecting' | 'connected' | 'dropdown'>('disconnected');
  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const [comingSoonState, setComingSoonState] = useState<string | null>(null);

  const handleComingSoon = (buttonName: string) => {
    setComingSoonState(buttonName);
    setTimeout(() => setComingSoonState(null), 2000);
  };

  useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        // Setup the disconnect event listener
        peraWallet.connector?.on('disconnect', handleDisconnectWalletClick);

        if (accounts.length) {
          setAccountAddress(accounts[0]);
          localStorage.setItem('pera-wallet-address', accounts[0]);
          setConnectionState('connected');
        }
      })
      .catch((e) => console.log(e));
      
    return () => {
      // Remove the disconnect event listener
      if (peraWallet.connector) {
        peraWallet.connector.off('disconnect');
      }
    };
  }, []);

  const handleConnect = async () => {
    try {
      setConnectionState('connecting');
      const newAccounts = await peraWallet.connect();
      // Setup the disconnect event listener
      peraWallet.connector?.on('disconnect', handleDisconnectWalletClick);
      
      if (newAccounts.length > 0) {
        setAccountAddress(newAccounts[0]);
        localStorage.setItem('pera-wallet-address', newAccounts[0]);
        setConnectionState('connected');
      } else {
        setConnectionState('disconnected');
      }
    } catch (error) {
      console.log('User rejected connection or error occurred:', error);
      setConnectionState('disconnected');
    }
  };

  const handleDisconnectWalletClick = () => {
    peraWallet.disconnect();
    setAccountAddress(null);
    localStorage.removeItem('pera-wallet-address');
    setConnectionState('disconnected');
  };

  const shortenAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="flex items-center gap-1 p-1.5 glass-panel rounded-full"
      >
        {/* Brand / OS Icon */}
        <button 
          onClick={() => onTabChange('marketplace')}
          aria-label="Go to Marketplace"
          className="flex items-center justify-center w-10 h-10 ml-1 md:mr-4 rounded-full bg-white/5 border border-white/10 shadow-inner group cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <Hexagon className="w-5 h-5 text-primary fill-accent/20 group-hover:fill-accent/40 transition-colors" />
        </button>

        {/* Navigation Tabs */}
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              aria-label={`Go to ${item.label}`}
              className={`relative flex items-center gap-2 px-3 py-2.5 md:px-4 md:py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 ${
                isActive ? 'text-primary' : 'text-secondary hover:text-primary hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5 md:w-4 md:h-4" />
              <span className="hidden md:inline">{item.label}</span>
              
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-white/[0.06] rounded-full border border-white/10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}

        {/* Action Button */}
        <div className="ml-4 mr-1 pl-4 border-l border-border flex items-center gap-2">
          {connectionState === 'disconnected' && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              onClick={handleConnect}
              aria-label="Connect Wallet"
              className="magnetic-btn relative flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-2 rounded-full bg-primary text-background font-semibold text-sm shadow-[0_0_20px_-5px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.6)] group focus:outline-none focus:ring-2 focus:ring-white"
            >
              <div className="absolute inset-0 rounded-full bg-white opacity-20 group-hover:animate-pulse-slow" />
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Connect Wallet</span>
              <span className="sm:hidden">Connect</span>
            </motion.button>
          )}

          {connectionState === 'connecting' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-surface border border-white/[0.08] text-secondary text-sm font-medium"
            >
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </motion.div>
          )}

          {connectionState === 'connected' && (
            <div className="relative">
              <motion.button 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                onClick={() => setConnectionState('dropdown')}
                aria-label="Open Wallet Menu"
                className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-surface border border-border hover:bg-white/5 transition-colors group focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                <div className="flex -space-x-1 relative">
                  <div className="absolute inset-0 bg-accent rounded-full blur group-hover:blur-md transition-all opacity-50" />
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-accent to-purple-500 border border-border shadow-inner relative z-10" />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Wallet Connected</span>
                  </div>
                  <span className="text-xs font-semibold text-primary">Connected <span className="font-mono text-secondary ml-1">{shortenAddress(accountAddress || '')}</span></span>
                </div>
              </motion.button>
            </div>
          )}

          {connectionState === 'dropdown' && (
            <div className="relative">
              <motion.button 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                onClick={() => setConnectionState('connected')}
                aria-label="Close Wallet Menu"
                className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] transition-colors group focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                <div className="flex -space-x-1 relative">
                  <div className="absolute inset-0 bg-accent rounded-full blur-md transition-all opacity-70" />
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-accent to-purple-500 border border-white/[0.2] shadow-inner relative z-10" />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Wallet Connected</span>
                  </div>
                  <span className="text-xs font-semibold text-primary">Connected <span className="font-mono text-secondary ml-1">{shortenAddress(accountAddress || '')}</span></span>
                </div>
              </motion.button>

              {/* Dropdown Menu */}
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="absolute top-[calc(100%+12px)] right-0 w-56 bg-surface/90 backdrop-blur-3xl border border-white/[0.08] rounded-2xl shadow-premium overflow-hidden p-2 flex flex-col gap-1 z-[100]"
              >
                <button 
                  onClick={() => handleComingSoon('fund')}
                  aria-label="Fund Wallet"
                  className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-white/[0.06] text-sm font-medium text-primary transition-colors text-left focus:outline-none focus:bg-white/[0.06]"
                >
                  <Wallet className="w-4 h-4 text-secondary" />
                  {comingSoonState === 'fund' ? 'Coming Soon' : 'Fund Wallet'}
                </button>
                <button 
                  onClick={() => handleComingSoon('analytics')}
                  aria-label="View Analytics"
                  className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-white/[0.06] text-sm font-medium text-primary transition-colors text-left focus:outline-none focus:bg-white/[0.06]"
                >
                  <LineChart className="w-4 h-4 text-secondary" />
                  {comingSoonState === 'analytics' ? 'Coming Soon' : 'View Analytics'}
                </button>
                <div className="h-px w-full bg-white/[0.04] my-1" />
                <button 
                  onClick={handleDisconnectWalletClick}
                  aria-label="Disconnect Wallet"
                  className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-red-500/10 hover:text-red-400 text-sm font-medium text-secondary transition-colors text-left focus:outline-none focus:bg-red-500/10"
                >
                  <Hexagon className="w-4 h-4" />
                  Disconnect
                </button>
              </motion.div>
            </div>
          )}
        </div>
      </motion.nav>
    </div>
  );
};
