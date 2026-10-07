import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  TrendingUp, 
  ShieldAlert, 
  DollarSign, 
  Percent, 
  HelpCircle, 
  ArrowUpRight, 
  Gauge,
  Sparkles,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { CurrencyConfig } from '../data/forexData';

interface ProfitCalculatorProps {
  currentCurrency: CurrencyConfig;
  onOpenLiveAccount: () => void;
}

export const ProfitCalculator: React.FC<ProfitCalculatorProps> = ({ currentCurrency, onOpenLiveAccount }) => {
  // Inputs
  const [accountSize, setAccountSize] = useState<number>(5000);
  const [leverage, setLeverage] = useState<number>(200);
  const [lotSize, setLotSize] = useState<number>(0.8);
  const [stopLossPips, setStopLossPips] = useState<number>(25);
  const [riskProfile, setRiskProfile] = useState<'conservative' | 'balanced' | 'aggressive'>('balanced');
  const [horizonMonths, setHorizonMonths] = useState<number>(3);

  // Calculations
  const calculatedValues = useMemo(() => {
    // Pip value estimate for 1 standard lot on USD base ~ $10 per pip
    const pipValuePerLot = 10;
    const riskPerTrade = lotSize * stopLossPips * pipValuePerLot;
    const riskPercentage = (riskPerTrade / accountSize) * 100;

    // Monthly expected return based on profile and leverage
    let monthlyRate = 0.08; // default 8% for balanced
    let drawdownCap = 4.2;

    if (riskProfile === 'conservative') {
      monthlyRate = 0.045; // 4.5%
      drawdownCap = 2.4;
    } else if (riskProfile === 'balanced') {
      monthlyRate = 0.092; // 9.2%
      drawdownCap = 4.8;
    } else if (riskProfile === 'aggressive') {
      monthlyRate = 0.165; // 16.5%
      drawdownCap = 8.5;
    }

    // Compound interest: A = P * (1 + r)^n
    const finalBalance = accountSize * Math.pow(1 + monthlyRate, horizonMonths);
    const netProfit = finalBalance - accountSize;
    const totalReturnPercent = ((finalBalance - accountSize) / accountSize) * 100;

    // Margin required per lot = (100,000 * lotSize) / leverage
    const marginRequired = (100000 * lotSize) / leverage;

    // Risk Reward ratio
    const rewardPips = stopLossPips * 2.4;
    const rewardPerTrade = lotSize * rewardPips * pipValuePerLot;

    // Generate monthly projection milestones
    const milestones = [];
    let currentBalance = accountSize;
    for (let m = 1; m <= horizonMonths; m++) {
      currentBalance = currentBalance * (1 + monthlyRate);
      milestones.push({
        month: m,
        balance: Math.round(currentBalance)
      });
    }

    return {
      riskPerTrade,
      riskPercentage: riskPercentage.toFixed(1),
      netProfit: Math.round(netProfit),
      finalBalance: Math.round(finalBalance),
      totalReturnPercent: totalReturnPercent.toFixed(1),
      drawdownCap: drawdownCap.toFixed(1),
      marginRequired: Math.round(marginRequired),
      rewardPerTrade: Math.round(rewardPerTrade),
      milestones
    };
  }, [accountSize, leverage, lotSize, stopLossPips, riskProfile, horizonMonths]);

  // Currency converted helper
  const fmt = (usdVal: number) => {
    const val = Math.round(usdVal * currentCurrency.rate);
    return `${currentCurrency.symbol}${val.toLocaleString()}`;
  };

  return (
    <section id="calculator" className="py-24 relative bg-slate-950 border-b border-slate-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Gauge className="w-3.5 h-3.5" />
            <span>Interactive Risk & Yield Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
            LIVE PROFIT & RISK CALCULATOR
          </h2>
          <p className="mt-4 text-slate-400 text-base leading-relaxed">
            Model real-time quantitative algorithmic projections based on account balance, leverage ratio, position sizing, and stop-loss risk mitigation.
          </p>
        </motion.div>

        {/* Main Calculator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-slate-900/70 backdrop-blur-xl border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-8"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-400" />
                <span>Simulation Parameters</span>
              </h3>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/30">
                Algorithm: Monte-Carlo Projected
              </span>
            </div>

            {/* Account Size Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase font-semibold text-slate-300 tracking-wider">
                  Initial Capital Deposit
                </label>
                <div className="font-display font-bold text-xl text-emerald-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 font-mono">
                  {fmt(accountSize)}
                </div>
              </div>
              <input
                type="range"
                min="250"
                max="100000"
                step="250"
                value={accountSize}
                onChange={(e) => setAccountSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>$250 Min</span>
                <span>$10,000</span>
                <span>$50,000</span>
                <span>$100,000 Max</span>
              </div>
            </div>

            {/* Leverage Segmented Buttons */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-semibold text-slate-300 tracking-wider block">
                Account Leverage Ratio
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[30, 100, 200, 500].map((lev) => (
                  <button
                    key={lev}
                    type="button"
                    onClick={() => setLeverage(lev)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-mono font-bold transition-all ${
                      leverage === lev
                        ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400'
                        : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    1:{lev}
                  </button>
                ))}
              </div>
            </div>

            {/* Lot Size Slider & Stop Loss Slider */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Lot Size */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase font-semibold text-slate-300 tracking-wider">
                    Lot Size
                  </label>
                  <span className="font-mono text-xs font-bold text-white bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                    {lotSize} Lots
                  </span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="10.0"
                  step="0.05"
                  value={lotSize}
                  onChange={(e) => setLotSize(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>0.01 Micro</span>
                  <span>5.0 Std</span>
                  <span>10.0 Max</span>
                </div>
              </div>

              {/* Stop Loss Pips */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase font-semibold text-slate-300 tracking-wider">
                    Stop Loss (Pips)
                  </label>
                  <span className="font-mono text-xs font-bold text-red-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                    {stopLossPips} Pips
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={stopLossPips}
                  onChange={(e) => setStopLossPips(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>10 Tight</span>
                  <span>50 Swing</span>
                  <span>100 Wide</span>
                </div>
              </div>
            </div>

            {/* Risk Profile Selector */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-semibold text-slate-300 tracking-wider block">
                Algorithmic Risk Mode
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'conservative', label: 'Conservative', desc: 'Max 2.4% DD', color: 'emerald' },
                  { id: 'balanced', label: 'Balanced Grid', desc: 'Max 4.8% DD', color: 'teal' },
                  { id: 'aggressive', label: 'Quantum Aggressive', desc: 'Max 8.5% DD', color: 'cyan' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRiskProfile(item.id as any)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      riskProfile === item.id
                        ? 'bg-emerald-950/70 border-emerald-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white mb-0.5">{item.label}</div>
                    <div className="text-[10px] font-mono text-emerald-400">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Horizon Months Selector */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-semibold text-slate-300 tracking-wider block">
                Simulation Horizon
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { m: 1, label: '1 Month' },
                  { m: 3, label: '3 Months' },
                  { m: 6, label: '6 Months' },
                  { m: 12, label: '12 Months' }
                ].map((item) => (
                  <button
                    key={item.m}
                    type="button"
                    onClick={() => setHorizonMonths(item.m)}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                      horizonMonths === item.m
                        ? 'bg-slate-200 text-slate-950 font-bold'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results Projection Card (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-emerald-500/30 p-6 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden space-y-6"
          >
            {/* Top highlight banner */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs uppercase tracking-wider font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Projected Output
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Horizon: {horizonMonths} mo
              </span>
            </div>

            {/* Projected Net Profit Card */}
            <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/20 shadow-inner">
              <span className="text-xs text-slate-400 block mb-1">
                Projected Net Profit ({calculatedValues.totalReturnPercent}%)
              </span>
              <div className="font-display font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                +{fmt(calculatedValues.netProfit)}
              </div>
              <div className="mt-2 flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                <span>Final Projected Equity:</span>
                <span className="text-white font-bold">{fmt(calculatedValues.finalBalance)}</span>
              </div>
            </div>

            {/* 4 Quantitative Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-1">Risk Per Trade</span>
                <span className="text-red-400 font-mono font-bold text-sm">
                  -{fmt(calculatedValues.riskPerTrade)}
                </span>
                <span className="text-[10px] text-slate-500 block font-mono">
                  ({calculatedValues.riskPercentage}% capital)
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-1">Modeled Max DD</span>
                <span className="text-emerald-400 font-mono font-bold text-sm">
                  {calculatedValues.drawdownCap}%
                </span>
                <span className="text-[10px] text-slate-500 block font-mono">
                  Safe threshold
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-1">Required Margin</span>
                <span className="text-white font-mono font-bold text-sm">
                  {fmt(calculatedValues.marginRequired)}
                </span>
                <span className="text-[10px] text-slate-500 block font-mono">
                  At 1:{leverage}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-1">Risk : Reward</span>
                <span className="text-emerald-400 font-mono font-bold text-sm">
                  1 : 2.40
                </span>
                <span className="text-[10px] text-slate-500 block font-mono">
                  Optimal ECN ratio
                </span>
              </div>
            </div>

            {/* Monthly Milestone Progression Preview */}
            <div className="space-y-2">
              <span className="text-xs uppercase font-mono text-slate-400 block tracking-wider">
                Compounded Equity Progression
              </span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto terminal-scroll pr-1">
                {calculatedValues.milestones.map((item) => (
                  <div
                    key={item.month}
                    className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-slate-950/60 border border-slate-800/80 font-mono"
                  >
                    <span className="text-slate-400">Month {item.month}</span>
                    <span className="text-emerald-400 font-bold">{fmt(item.balance)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA inside calculator */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenLiveAccount}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-slate-950 font-display font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>LOCK IN LIVE ALGORITHMIC ALLOCATION</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
