import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingNav } from '../os/FloatingNav';
import { SystemStatusBar } from '../os/SystemStatusBar';
import { UniversalSearch } from '../os/UniversalSearch';

interface AppLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      {/* Global Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 noise-bg opacity-[0.15] mix-blend-overlay" />

      <FloatingNav activeTab={activeTab} onTabChange={onTabChange} />
      <SystemStatusBar />
      <UniversalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} onTabChange={onTabChange} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-screen w-full relative z-10 pt-48 px-8 max-w-7xl mx-auto"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};
