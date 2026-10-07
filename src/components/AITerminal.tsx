import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Activity, 
  Pause, 
  Play, 
  Filter, 
  ShieldCheck, 
  Maximize2, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  ExternalLink,
  X,
  Info
} from 'lucide-react';
import { INITIAL_LOGS, TradeLog, CurrencyConfig } from '../data/forexData';

interface AITerminalProps {
  currentCurrency: CurrencyConfig;
}

export const AITerminal: React.FC<AITerminalProps> = ({ currentCurrency }) => {
  const [logs, setLogs] = useState<TradeLog[]>(INITIAL_LOGS);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPair, setSelectedPair] = useState<string>('ALL');
  const [selectedTrade, setSelectedTrade] = useState<TradeLog | null>(null);
  const [speed, setSpeed] = useState<'normal' | 'fast'>('normal');
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Live cumulative PnL
  const [cumulativePnL, setCumulativePnL] = useState(48920.40);
  const [winRate, setWinRate] = useState(91.4);
  const [activePositions, setActivePositions] = useState(8);

  // Auto-generator for live algorithmic trades
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = speed === 'fast' ? 2200 : 4200;

    const interval = setInterval(() => {
      const symbols = ['EUR/USD', 'GBP/JPY', 'XAU/USD', 'USD/JPY', 'BTC/USD', 'AUD/USD'];
      const agents: ("Alpha-Grid v5.4" | "Neural-Momentum v2.1" | "Arbitrage-Flash v3")[] = [
        'Alpha-Grid v5.4',
        'Neural-Momentum v2.1',
        'Arbitrage-Flash v3'
      ];
      
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const type = Math.random() > 0.45 ? 'BUY' : 'SELL';
      const isWin = Math.random() > 0.12; // 88% win rate
      const lots = +(0.5 + Math.random() * 3.5).toFixed(2);
      const pips = isWin ? +(5 + Math.random() * 38).toFixed(1) : -(+(3 + Math.random() * 12).toFixed(1));
      const pnl = +(pips * lots * (symbol === 'XAU/USD' ? 10 : 8.5)).toFixed(2);

      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${Math.floor(Math.random() * 900 + 100)}`;

      const newLog: TradeLog = {
        id: `TRD-${Math.floor(90000 + Math.random() * 9999)}`,
        time: timeStr,
        symbol,
        type,
        lots,
        openPrice: symbol === 'BTC/USD' ? 88200 : symbol === 'XAU/USD' ? 2650 : 1.085,
        closePrice: symbol === 'BTC/USD' ? 88350 : symbol === 'XAU/USD' ? 2653 : 1.086,
        pnl,
        pips,
        agent: agents[Math.floor(Math.random() * agents.length)],
        status: 'CLOSED',
        latency: +(1.4 + Math.random() * 0.9).toFixed(1)
      };

      setLogs(prev => [newLog, ...prev.slice(0, 40)]);
      setCumulativePnL(prev => +(prev + pnl).toFixed(2));
      setActivePositions(prev => Math.max(4, Math.min(12, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isPaused, speed]);

  const filteredLogs = logs.filter(log => {
    if (selectedPair === 'ALL') return true;
    return log.symbol === selectedPair;
  });

  const fmtCurrency = (usdVal: number) => {
    const val = usdVal * currentCurrency.rate;
    const prefix = val >= 0 ? '+' : '';
    return `${prefix}${currentCurrency.symbol}${Math.abs(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <section id="terminal" className="py-24 relative bg-slate-950 border-b border-slate-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Autonomous Execution Stream</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
            LIVE AI AGENT MONITOR
          </h2>
          <p className="mt-4 text-slate-400 text-base leading-relaxed">
            Real-time telemetry stream from Alpha-Grid, Neural-Momentum, and Arbitrage-Flash engines connected to Equinix LD4 interbank servers.
          </p>
        </motion.div>

        {/* Live Metrics Telemetry Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          {/* Card 1: 24h PnL */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 backdrop-blur-md">
            <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
              Cumulative 24h PnL
            </span>
            <div className="font-display font-bold text-xl sm:text-2xl text-emerald-400 flex items-center gap-1.5">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>{fmtCurrency(cumulativePnL)}</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono mt-1 block">
              Audited On-Chain MT5 Ledger
            </span>
          </div>

          {/* Card 2: Win Rate */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
              Algorithm Win Rate
            </span>
            <div className="font-display font-bold text-xl sm:text-2xl text-white flex items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>{winRate}%</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono mt-1 block">
              Across 1,420 orders today
            </span>
          </div>

          {/* Card 3: Active Open Positions */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
              Active Open Grid Layers
            </span>
            <div className="font-display font-bold text-xl sm:text-2xl text-white flex items-center gap-1.5">
              <Activity className="w-5 h-5 text-teal-400" />
              <span>{activePositions} Positions</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono mt-1 block">
              Max drawdown locked at 4.8%
            </span>
          </div>

          {/* Card 4: Fiber Latency */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
              London LD4 Fiber Ping
            </span>
            <div className="font-display font-bold text-xl sm:text-2xl text-emerald-400 flex items-center gap-1.5">
              <Zap className="w-5 h-5 fill-emerald-400" />
              <span>1.8ms Average</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono mt-1 block">
              Zero Queuing Latency
            </span>
          </div>
        </motion.div>

        {/* Terminal Window Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs relative"
        >
          {/* Terminal Title Bar & Toolbar */}
          <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Fake Mac / Terminal dots */}
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>ForexBankPro::LiveEngine [Feed: LD4-RAW-ECN]</span>
              </div>
            </div>

            {/* Terminal Controls: Filter, Pause, Speed */}
            <div className="flex items-center flex-wrap gap-2">
              {/* Pair Filter Dropdown / Buttons */}
              <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                <Filter className="w-3 h-3 text-slate-400" />
                {['ALL', 'EUR/USD', 'GBP/JPY', 'XAU/USD', 'BTC/USD'].map((pair) => (
                  <button
                    key={pair}
                    onClick={() => setSelectedPair(pair)}
                    className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${
                      selectedPair === pair
                        ? 'bg-emerald-500/20 text-emerald-400 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {pair}
                  </button>
                ))}
              </div>

              {/* Speed Toggle */}
              <button
                onClick={() => setSpeed(speed === 'normal' ? 'fast' : 'normal')}
                className={`px-2 py-1 rounded-lg border text-[10px] font-bold ${
                  speed === 'fast'
                    ? 'bg-teal-950 border-teal-500 text-teal-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
                title="Toggle Feed Refresh Speed"
              >
                Speed: {speed === 'fast' ? '2x' : '1x'}
              </button>

              {/* Pause / Resume */}
              <button
                onClick={() => setIsPaused(!isPaused)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                  isPaused
                    ? 'bg-amber-950/80 border border-amber-500/50 text-amber-300'
                    : 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300'
                }`}
              >
                {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                <span>{isPaused ? 'RESUME STREAM' : 'PAUSE'}</span>
              </button>
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-slate-900/40 text-[10px] text-slate-500 uppercase tracking-wider font-bold border-b border-slate-800/80 select-none">
            <div className="col-span-2">TIMESTAMP</div>
            <div className="col-span-2">TICKET / AGENT</div>
            <div className="col-span-2">SYMBOL & ACTION</div>
            <div className="col-span-2">VOLUME & PIPS</div>
            <div className="col-span-2 text-right">NET REALIZED PNL</div>
            <div className="col-span-2 text-right">LATENCY & AUDIT</div>
          </div>

          {/* Scrolling Logs Feed */}
          <div className="max-h-96 overflow-y-auto terminal-scroll divide-y divide-slate-900/80 bg-slate-950/90 p-1">
            <AnimatePresence initial={false}>
              {filteredLogs.map((log) => {
                const isPositive = log.pnl >= 0;
                return (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -15, backgroundColor: 'rgba(16,185,129,0.1)' }}
                    animate={{ opacity: 1, x: 0, backgroundColor: 'transparent' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedTrade(log)}
                    className="grid grid-cols-12 gap-2 px-3 py-2.5 items-center hover:bg-slate-900/60 cursor-pointer transition-colors group"
                  >
                    {/* Timestamp */}
                    <div className="col-span-2 text-slate-400 text-[11px]">
                      {log.time}
                    </div>

                    {/* Ticket & Agent */}
                    <div className="col-span-2 truncate">
                      <span className="text-slate-300 font-bold block">{log.id}</span>
                      <span className="text-[10px] text-slate-500 truncate block">{log.agent}</span>
                    </div>

                    {/* Symbol & Action */}
                    <div className="col-span-2 flex items-center gap-1.5">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          log.type === 'BUY'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-950 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {log.type}
                      </span>
                      <span className="text-white font-semibold text-xs">{log.symbol}</span>
                    </div>

                    {/* Volume & Pips */}
                    <div className="col-span-2">
                      <span className="text-slate-300 font-mono">{log.lots} Lots</span>
                      <span className={`block text-[10px] ${log.pips >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {log.pips >= 0 ? `+${log.pips}` : log.pips} pips
                      </span>
                    </div>

                    {/* Net Realized PnL */}
                    <div className="col-span-2 text-right">
                      <span
                        className={`font-bold font-mono text-xs ${
                          isPositive ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {fmtCurrency(log.pnl)}
                      </span>
                    </div>

                    {/* Latency & Audit */}
                    <div className="col-span-2 text-right flex items-center justify-end gap-2">
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                        {log.latency}ms
                      </span>
                      <span className="text-slate-600 group-hover:text-emerald-400 transition-colors">
                        <Info className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            <div ref={terminalBottomRef} />
          </div>

          {/* Terminal Footer Info */}
          <div className="px-4 py-2.5 bg-slate-900/60 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Real-Time ECN Bridge Active · Equinix NY4 / LD4 Cross-Connected</span>
            </div>
            <div className="text-slate-500">
              Showing {filteredLogs.length} recent executions
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trade Inspection Modal */}
      <AnimatePresence>
        {selectedTrade && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTrade(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl p-6 z-10 font-mono text-xs space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-white text-sm">Trade Audit #{selectedTrade.id}</span>
                </div>
                <button
                  onClick={() => setSelectedTrade(null)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Agent Algorithm</span>
                  <span className="text-emerald-400 font-bold">{selectedTrade.agent}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Pair & Direction</span>
                  <span className="text-white font-bold">{selectedTrade.symbol} ({selectedTrade.type})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Volume</span>
                  <span className="text-white">{selectedTrade.lots} Standard Lots</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Open Execution Price</span>
                  <span className="text-white">{selectedTrade.openPrice}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Close Price</span>
                  <span className="text-white">{selectedTrade.closePrice}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Routing Latency</span>
                  <span className="text-teal-400 font-bold">{selectedTrade.latency} ms (Equinix Fiber)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Bayesian AI Confidence</span>
                  <span className="text-emerald-400 font-bold">96.8% Model Probability</span>
                </div>
                <div className="flex justify-between py-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-300 font-bold">Net Realized Profit</span>
                  <span className={`font-bold text-sm ${selectedTrade.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {fmtCurrency(selectedTrade.pnl)} ({selectedTrade.pips} pips)
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedTrade(null)}
                  className="w-full py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs"
                >
                  Close Inspection Ticket
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
