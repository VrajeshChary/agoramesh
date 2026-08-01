import React from 'react';
import { Terminal, Key, BookOpen, Code, ArrowUpRight, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';

export const DeveloperCenter: React.FC = () => {
  const [comingSoonId, setComingSoonId] = React.useState<string | null>(null);

  const handleComingSoon = (id: string) => {
    setComingSoonId(id);
    setTimeout(() => setComingSoonId(null), 2000);
  };
  return (
    <div className="w-full flex flex-col gap-6 relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-semibold text-primary tracking-tight">Developer Console</h2>
        <button 
          onClick={() => handleComingSoon('docs')}
          aria-label="View Documentation"
          className="flex items-center gap-2 px-4 py-2.5 bg-surface hover:bg-white/[0.04] rounded-xl text-sm font-medium text-primary transition-all duration-300 border border-white/[0.08] shadow-glass focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <BookOpen className="w-4 h-4 text-accent" /> 
          {comingSoonId === 'docs' ? 'Coming Soon' : 'View Docs'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* API Keys */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="lg:col-span-2 p-8 rounded-3xl glass-panel relative overflow-hidden flex flex-col group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex items-center gap-3 mb-8 relative z-10">
            <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20">
              <Key className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-primary">API Keys</h3>
          </div>
          
          <div className="w-full overflow-x-auto relative z-10">
            <table className="w-full text-left text-sm">
              <thead className="text-secondary/70 border-b border-white/[0.04]">
                <tr>
                  <th className="pb-4 font-medium uppercase tracking-wider text-xs">Name</th>
                  <th className="pb-4 font-medium uppercase tracking-wider text-xs">Key</th>
                  <th className="pb-4 font-medium uppercase tracking-wider text-xs">Created</th>
                  <th className="pb-4 font-medium uppercase tracking-wider text-xs text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-primary">
                <tr className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors group/row">
                  <td className="py-5 font-medium">Production Key</td>
                  <td className="py-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-secondary bg-background/50 px-2 py-1 rounded border border-white/[0.04]">sk_live_8F9...2B1</span>
                      <button className="opacity-0 group-hover/row:opacity-100 transition-opacity text-secondary hover:text-primary"><Copy className="w-3.5 h-3.5"/></button>
                    </div>
                  </td>
                  <td className="py-5 text-secondary/80">Oct 24, 2026</td>
                  <td className="py-5 text-right">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20 font-medium">Active</span>
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors group/row">
                  <td className="py-5 font-medium">Testnet Key</td>
                  <td className="py-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-secondary bg-background/50 px-2 py-1 rounded border border-white/[0.04]">sk_test_4A2...9C0</span>
                      <button className="opacity-0 group-hover/row:opacity-100 transition-opacity text-secondary hover:text-primary"><Copy className="w-3.5 h-3.5"/></button>
                    </div>
                  </td>
                  <td className="py-5 text-secondary/80">Oct 22, 2026</td>
                  <td className="py-5 text-right">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20 font-medium">Active</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <MagneticButton 
            onClick={() => handleComingSoon('generate')}
            aria-label="Generate New Key"
            className="mt-8 self-start px-6 py-2.5 bg-primary text-background text-sm font-semibold rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] relative z-10 focus:outline-none focus:ring-2 focus:ring-white"
          >
            {comingSoonId === 'generate' ? 'Coming Soon' : 'Generate New Key'}
          </MagneticButton>
        </motion.div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          {[
            { title: 'Python SDK', desc: 'pip install agoramesh', icon: Terminal, color: 'text-accent', bg: 'bg-accent/10' },
            { title: 'TypeScript SDK', desc: 'npm install @agoramesh/sdk', icon: Code, color: 'text-gold', bg: 'bg-gold/10' },
            { title: 'OpenAPI Spec', desc: 'REST API documentation', icon: BookOpen, color: 'text-purple', bg: 'bg-purple/10' },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
              className="p-6 rounded-3xl glass-panel hover:bg-surface transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:shadow-premium relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center border border-white/[0.04]`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <h4 className="text-base font-semibold text-primary">{item.title}</h4>
                </div>
                <div className="p-1.5 rounded-full bg-white/[0.03] group-hover:bg-accent group-hover:text-white text-secondary transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 relative z-10">
                <p className="text-xs font-mono text-secondary/80 bg-background/50 px-3 py-1.5 rounded-lg border border-white/[0.04] group-hover:border-white/[0.08] transition-colors">
                  {item.desc}
                </p>
                <button 
                  onClick={() => handleComingSoon(`copy-${i}`)}
                  aria-label="Copy Command"
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-secondary hover:text-primary p-1.5 rounded-lg hover:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              {comingSoonId === `copy-${i}` && (
                <div className="absolute top-2 right-2 text-[10px] text-accent font-semibold bg-accent/10 px-2 py-1 rounded-md">
                  Copied!
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
