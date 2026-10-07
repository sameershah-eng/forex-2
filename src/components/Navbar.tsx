import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Activity, 
  ChevronDown, 
  Menu, 
  X, 
  ShieldCheck, 
  Cpu, 
  Calculator, 
  ExternalLink,
  UserCheck,
  Zap,
  Globe
} from 'lucide-react';
import { CURRENCIES, CurrencyConfig } from '../data/forexData';

interface NavbarProps {
  currentCurrency: CurrencyConfig;
  onSelectCurrency: (c: CurrencyConfig) => void;
  onOpenDemoModal: () => void;
  onOpenLiveModal: () => void;
  onOpenVideoModal: () => void;
  onScrollToSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onSelectCurrency,
  onOpenDemoModal,
  onOpenLiveModal,
  onOpenVideoModal,
  onScrollToSection
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [latency, setLatency] = useState(122);

  // Micro-fluctuation for latency to feel genuinely live
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => {
        const delta = Math.floor(Math.random() * 7) - 3;
        return Math.min(138, Math.max(116, prev + delta));
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Products', id: 'features' },
    { label: 'AI Agents', id: 'ai-agents' },
    { label: 'Yield Calculator', id: 'calculator' },
    { label: 'Live Terminal', id: 'terminal' },
    { label: 'Regulation', id: 'regulation' }
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-emerald-500/20 shadow-2xl shadow-black/80'
          : 'bg-slate-950/60 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-700 p-[1px] flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center overflow-hidden">
                  <TrendingUp className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                    FOREX BANK
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 px-1.5 py-0.5 rounded font-mono shadow-sm">
                    PRO
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
                  Quantum AI FX Architecture
                </span>
              </div>
            </button>
          </div>

          {/* Central Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => onScrollToSection(item.id)}
                className="text-xs uppercase tracking-wider font-semibold text-slate-300 hover:text-emerald-400 transition-colors py-1 cursor-pointer focus:outline-none"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Stack: Live Badge + Currency + Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Live AI Monitor status badge */}
            <button
              onClick={() => onScrollToSection('terminal')}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/40 transition-colors group cursor-pointer"
              title="Click to view live execution logs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[11px] tracking-tight">
                Alpha-Grid EA: <span className="text-emerald-400 font-bold">ACTIVE</span>
              </span>
              <span className="text-slate-500 font-mono text-[10px]">·</span>
              <span className="font-mono text-[10px] text-slate-400 group-hover:text-slate-200">
                {latency}ms
              </span>
            </button>

            {/* Currency Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-600 text-xs font-mono transition-all"
                aria-label="Select Account Base Currency"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-emerald-400">{currentCurrency.code}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${currencyDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {currencyDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 mt-1 w-32 bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-50 p-1"
                  >
                    {CURRENCIES.map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          onSelectCurrency(curr);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-colors ${
                          currentCurrency.code === curr.code
                            ? 'bg-emerald-500/20 text-emerald-400 font-semibold'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <span>{curr.code}</span>
                        <span className="font-mono text-slate-400">{curr.symbol}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Client Portal (Login) */}
            <button
              onClick={onOpenDemoModal}
              className="text-xs font-semibold px-3 py-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Client Login
            </button>

            {/* Open Live Account Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenLiveModal}
              className="relative group overflow-hidden px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>Open Live</span>
            </motion.button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onScrollToSection('terminal')}
              className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{latency}ms</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/95 border-b border-slate-800 backdrop-blur-2xl px-4 pt-2 pb-6 space-y-3"
          >
            <div className="flex flex-col space-y-2 pt-2">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onScrollToSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-sm font-medium text-slate-300 hover:text-emerald-400 py-2 border-b border-slate-800/60"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-400">Account Currency:</span>
              <div className="flex gap-1">
                {CURRENCIES.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => onSelectCurrency(curr)}
                    className={`px-2 py-1 text-xs rounded font-mono ${
                      currentCurrency.code === curr.code
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {curr.code}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  onOpenDemoModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-xs font-bold text-slate-200"
              >
                Demo Sandbox
              </button>
              <button
                onClick={() => {
                  onOpenLiveModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold"
              >
                Open Live Account
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
