import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Zap, 
  DollarSign, 
  TrendingUp, 
  Layers,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { CurrencyConfig } from '../data/forexData';

interface HeroSectionProps {
  currentCurrency: CurrencyConfig;
  onExploreAgents: () => void;
  onStartDemo: () => void;
  onWatchVideo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentCurrency,
  onExploreAgents,
  onStartDemo,
  onWatchVideo
}) => {
  // Animated Ticker live counters
  const [minDeposit, setMinDeposit] = useState(250);
  const [executionTime, setExecutionTime] = useState(2.1);
  const [volumeToday, setVolumeToday] = useState(148.9);

  // Micro fluctuations for the live metric bar
  useEffect(() => {
    const timer = setInterval(() => {
      setExecutionTime(prev => +(1.8 + Math.random() * 0.5).toFixed(1));
      setVolumeToday(prev => +(prev + 0.1).toFixed(1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const convertedDeposit = Math.round(minDeposit * currentCurrency.rate);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pt-12 pb-20 border-b border-slate-800/80">
      {/* Background Video Stream with dark overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1600&q=80"
          className="w-full h-full object-cover opacity-20 scale-105 filter saturate-150 contrast-125"
        >
          {/* High-quality dark abstract tech financial loop */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-and-data-31911-large.mp4"
            type="video/mp4"
          />
        </video>
        
        {/* Dark gradient and mesh overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/85 to-slate-950" />
        <div className="absolute inset-0 bg-radial from-emerald-500/10 via-transparent to-transparent opacity-80" />
      </div>

      {/* Ambient Pulsing Neon Mesh Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-transparent blur-[120px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 left-10 w-[350px] h-[350px] bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-teal-500/10 blur-[110px] rounded-full pointer-events-none animate-pulse" />

      {/* Cyber Grid Lines Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(to right, #10b981 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 backdrop-blur-md shadow-lg shadow-emerald-950/40">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-slate-300">
              NEXT-GEN INSTITUTIONAL FX ARCHITECTURE
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-[11px] sm:text-xs font-mono font-bold text-emerald-400">
              EQUINIX LD4 FIBER
            </span>
          </div>
        </motion.div>

        {/* Animated Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-white leading-[1.08] uppercase">
            QUANTUM <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 drop-shadow-[0_0_35px_rgba(16,185,129,0.35)]">AI-DRIVEN</span> WEALTH ACCELERATION
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed pt-2">
            Pioneering autonomous neural execution for global currency markets. Direct interbank ECN liquidity, sub-2ms fills, and verified algorithmic yield modules.
          </p>
        </motion.div>

        {/* Primary Action Buttons & Watch Video Modal Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Explore AI Agents */}
          <motion.button
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={onExploreAgents}
            className="group px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-slate-950 font-display font-bold text-sm tracking-wide uppercase shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/50 transition-all cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>EXPLORE AI AGENTS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Start Trading Demo */}
          <motion.button
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStartDemo}
            className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 text-white font-display font-semibold text-sm tracking-wide uppercase border border-slate-700/80 hover:border-emerald-500/50 transition-all cursor-pointer flex items-center gap-2 backdrop-blur-sm"
          >
            <span>START TRADING DEMO</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
              $10,000 Sandbox
            </span>
          </motion.button>

          {/* Watch Demo Video Trigger */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onWatchVideo}
            className="px-5 py-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white font-medium text-sm transition-all border border-slate-800 hover:border-slate-700 flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:scale-105 transition-all">
              <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 translate-x-0.5" />
            </div>
            <span>Watch Demo Video</span>
          </motion.button>
        </motion.div>

        {/* Feature Badges Bullet Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400 font-medium"
        >
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Dealing Desk Intervention</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>BVI FSC Regulated (#1024298)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Instant USDT TRC-20 Withdrawals</span>
          </div>
        </motion.div>

        {/* Glassmorphic 3-Column Metric Ticker Bar */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 sm:p-3 rounded-2xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl shadow-2xl shadow-black/60 relative overflow-hidden">
            {/* Background subtle light beam */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-24 bg-emerald-500/15 blur-2xl pointer-events-none" />

            {/* Column 1: Min Deposit */}
            <motion.div
              whileHover={{ y: -2 }}
              className="p-5 rounded-xl bg-slate-950/60 border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span className="uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  Entry Threshold
                </span>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  INSTANT FUNDING
                </span>
              </div>
              <div className="flex items-baseline gap-1 my-1">
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                  {currentCurrency.symbol}{convertedDeposit.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 font-mono">Min Deposit</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                Accessible to both retail capital and algorithmic testing. 0% network fees on USDT/USDC deposits.
              </p>
            </motion.div>

            {/* Column 2: 24/5 Status */}
            <motion.div
              whileHover={{ y: -2 }}
              className="p-5 rounded-xl bg-slate-950/60 border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span className="uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  Global Market Coverage
                </span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE NOW
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 my-1">
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                  24/5
                </span>
                <span className="text-xs text-emerald-400 font-mono font-semibold">Continuous Uptime</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                Sydney, Tokyo, London & New York market overlap. Automated EA volatility guards active 24 hours.
              </p>
            </motion.div>

            {/* Column 3: 2ms Execution */}
            <motion.div
              whileHover={{ y: -2 }}
              className="p-5 rounded-xl bg-slate-950/60 border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span className="uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  Ultra-Low Latency
                </span>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  LD4 FIBER CROSS
                </span>
              </div>
              <div className="flex items-baseline gap-1 my-1">
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                  {executionTime}ms
                </span>
                <span className="text-xs text-slate-400 font-mono">Fill Speed</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                Direct cross-connect to Tier-1 interbank price aggregators. Zero negative slippage protocol.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
