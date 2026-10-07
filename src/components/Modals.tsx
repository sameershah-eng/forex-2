import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Check, 
  Copy, 
  Play, 
  ShieldCheck, 
  Sparkles, 
  Bot, 
  Cpu, 
  Zap, 
  ExternalLink, 
  ArrowRight,
  TrendingUp,
  Key,
  Server
} from 'lucide-react';
import { CurrencyConfig } from '../data/forexData';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCurrency: CurrencyConfig;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose, currentCurrency }) => {
  const [created, setCreated] = useState(false);
  const [formData, setFormData] = useState({ name: 'Alex Vance', email: 'alex@example.com', leverage: '1:200' });
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setCreated(true);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText("Login: 8829014 | Pass: FxPro#Quantum99 | Server: ForexBankPro-Demo01");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-slate-900 border border-emerald-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 space-y-6"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="font-display font-bold text-white text-lg">
              {created ? 'Demo Account Provisioned' : 'Instant Demo Sandbox'}
            </h3>
            <span className="text-xs font-mono text-emerald-400">
              Virtual $10,000 Balance · Zero Risk
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!created ? (
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">Virtual Leverage</label>
              <select
                value={formData.leverage}
                onChange={e => setFormData({ ...formData, leverage: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="1:100">1:100 Leverage</option>
                <option value="1:200">1:200 Leverage (Standard)</option>
                <option value="1:500">1:500 Leverage (High Performance)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all cursor-pointer"
            >
              Generate Demo MT5 Credentials
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Server:</span>
                <span className="text-white font-bold">ForexBankPro-Demo01</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Login ID:</span>
                <span className="text-emerald-400 font-bold">8829014</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Password:</span>
                <span className="text-white font-bold">FxPro#Quantum99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Initial Balance:</span>
                <span className="text-teal-400 font-bold">$10,000.00 USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Leverage:</span>
                <span className="text-white font-bold">{formData.leverage}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Credentials Copied!' : 'Copy Credentials'}</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold uppercase tracking-wider"
              >
                Launch WebTrader
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'backtest' | 'execution'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl bg-slate-900 border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden z-10 space-y-4"
      >
        <div className="p-4 sm:p-6 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <Play className="w-4 h-4 text-emerald-400 fill-emerald-400 translate-x-0.5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base">
                Forex Bank Pro Architecture Walkthrough
              </h3>
              <span className="text-xs font-mono text-emerald-400">
                Interactive High-Frequency Algorithmic Demonstration
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Simulation Display Screen */}
        <div className="px-6">
          <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-video flex flex-col justify-between p-6">
            {/* Ambient animated waveform */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-and-data-31911-large.mp4"
              />
            </div>

            <div className="relative z-10 flex justify-between items-center text-xs font-mono">
              <span className="bg-emerald-950/90 text-emerald-400 px-2 py-1 rounded border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                LIVE STREAM REPLAY · 4K 60FPS
              </span>
              <span className="text-slate-400">Equinix LD4 Feed #9021</span>
            </div>

            <div className="relative z-10 text-center space-y-2 py-8">
              <div className="inline-block p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-md">
                <Cpu className="w-10 h-10 text-emerald-400 animate-pulse" />
              </div>
              <h4 className="font-display font-black text-xl text-white">
                Alpha-Grid EA Core Operations
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Demonstrating dynamic order netting across 16 Tier-1 liquidity pools without slippage.
              </p>
            </div>

            <div className="relative z-10 flex justify-between items-center text-xs font-mono border-t border-slate-800/80 pt-3">
              <div className="flex gap-4 text-slate-400">
                <span>Latency: <strong className="text-emerald-400">1.8ms</strong></span>
                <span>Slip: <strong className="text-white">0.0 pips</strong></span>
                <span>Fill: <strong className="text-emerald-400">100%</strong></span>
              </div>
              <span className="text-slate-400">Forex Bank Pro Proprietary Engine</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="p-6 pt-2 flex items-center justify-between">
          <div className="flex gap-2">
            {[
              { id: 'overview', label: '1. Neural Architecture' },
              { id: 'backtest', label: '2. 10-Yr Backtest' },
              { id: 'execution', label: '3. ECN Order Routing' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  activeTab === tab.id
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
          >
            Done Viewing
          </button>
        </div>
      </motion.div>
    </div>
  );
};

interface AgentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAgent: () => void;
}

export const AgentsModal: React.FC<AgentsModalProps> = ({ isOpen, onClose, onSelectAgent }) => {
  if (!isOpen) return null;

  const agents = [
    {
      name: "Alpha-Grid EA v5.4",
      type: "Adaptive Multi-Currency Grid",
      winRate: "89.4%",
      maxDD: "4.8%",
      pairs: "EUR/USD, GBP/USD, USD/JPY",
      description: "Operates non-directional grid orders with neural volatility filters that freeze entries during major red-folder economic releases."
    },
    {
      name: "Neural-Momentum EA v2.1",
      type: "Trend Trajectory Predictor",
      winRate: "86.2%",
      maxDD: "5.4%",
      pairs: "XAU/USD (Gold), BTC/USD, GBP/JPY",
      description: "LSTM recurrent neural network trained on 15 years of tick data to catch multi-pip momentum breakout legs."
    },
    {
      name: "Arbitrage-Flash EA v3",
      type: "Sub-Millisecond Latency Arbitrage",
      winRate: "94.1%",
      maxDD: "2.1%",
      pairs: "All Majors & Crosses",
      description: "Direct Equinix LD4 cross-connect that exploits pricing differentials across segregated interbank liquidity feeds."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 space-y-6 max-h-[90vh] overflow-y-auto terminal-scroll"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="font-display font-bold text-white text-lg">
              Proprietary Quantum AI Trading Agents
            </h3>
            <span className="text-xs font-mono text-emerald-400">
              Verified MT5 Algorithmic Systems
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {agents.map((ag, i) => (
            <div key={i} className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/30 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-base">{ag.name}</h4>
                  <span className="text-xs text-emerald-400 font-mono">{ag.type}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-mono text-xs bg-emerald-950/80 text-emerald-300 px-2.5 py-1 rounded border border-emerald-500/30">
                    Win: {ag.winRate}
                  </span>
                  <span className="font-mono text-xs bg-slate-900 text-slate-300 px-2.5 py-1 rounded border border-slate-700">
                    Max DD: {ag.maxDD}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {ag.description}
              </p>
              <div className="text-[11px] font-mono text-slate-400 pt-1">
                Supported Pairs: <span className="text-white">{ag.pairs}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <button onClick={onClose} className="text-xs text-slate-400 hover:text-white">
            Dismiss
          </button>
          <button
            onClick={() => {
              onClose();
              onSelectAgent();
            }}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider"
          >
            Deploy Selected Agent
          </button>
        </div>
      </motion.div>
    </div>
  );
};
