import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  ArrowUp, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Send, 
  ExternalLink,
  CreditCard,
  Coins
} from 'lucide-react';

interface FooterProps {
  onScrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      {/* Top Newsletter & Fast Action Ribbon */}
      <div className="border-b border-slate-800/80 bg-slate-900/40 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-display font-bold text-lg text-white">
              Institutional Intelligence & Algorithmic Dispatch
            </h3>
            <p className="text-slate-400 text-xs">
              Weekly quantitative backtests, macro liquidity reports, and EA neural parameter adjustments.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter institutional or personal email..."
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-full sm:w-72"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>{subscribed ? 'Subscribed!' : 'Subscribe'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Sitemap Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info (Col 1-2 on mobile, Col 1 on desktop) */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <span className="font-display font-black text-white text-base tracking-tight">
                FOREX BANK PRO
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs pr-4">
              Next-generation algorithmic liquidity architecture. Seamless integration between quantitative neural models, raw spreads, and institutional custodial security.
            </p>
            <div className="pt-2 text-[11px] font-mono text-emerald-400">
              BVI FSC License #1024298 · Austin Tech Lab
            </div>
          </div>

          {/* Col 2: Products */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-white uppercase tracking-wider text-xs">
              Trading Products
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onScrollToSection('features')} className="hover:text-emerald-400 transition-colors">
                  Automated EAs
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('features')} className="hover:text-emerald-400 transition-colors">
                  PAMM Managed Pools
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('features')} className="hover:text-emerald-400 transition-colors">
                  Stock CFDs (2,400+)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('features')} className="hover:text-emerald-400 transition-colors">
                  Raw Spread Accounts
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('calculator')} className="hover:text-emerald-400 transition-colors">
                  Yield Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Technology */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-white uppercase tracking-wider text-xs">
              Infrastructure
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onScrollToSection('terminal')} className="hover:text-emerald-400 transition-colors">
                  Live AI Terminal Feed
                </button>
              </li>
              <li>
                <span className="text-slate-400">Equinix LD4 Fiber Hub</span>
              </li>
              <li>
                <span className="text-slate-400">MT4 / MT5 Server Bridge</span>
              </li>
              <li>
                <span className="text-slate-400">FIX 4.4 API Integration</span>
              </li>
              <li>
                <span className="text-slate-400">Ultra-Low 1.8ms Latency</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Regulation & Trust */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-white uppercase tracking-wider text-xs">
              Oversight & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onScrollToSection('regulation')} className="hover:text-emerald-400 transition-colors">
                  BVI FSC License #1024298
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('regulation')} className="hover:text-emerald-400 transition-colors">
                  Segregated Client Custody
                </button>
              </li>
              <li>
                <span className="text-slate-400">Terms of Business</span>
              </li>
              <li>
                <span className="text-slate-400">AML / KYC Directives</span>
              </li>
              <li>
                <span className="text-slate-400">Risk Disclosure Document</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods Badges Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-emerald-400" />
            <span className="text-xs uppercase font-mono text-slate-300 font-semibold">
              Supported Payment & Custody Rails:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
            {['USDT (TRC-20)', 'USDT (ERC-20)', 'Bitcoin (BTC)', 'Ethereum (ETH)', 'Bank Wire (SWIFT)', 'Visa / Mastercard'].map((method, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-medium"
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        {/* Regulatory & Risk Disclosures Block */}
        <div className="mt-10 p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-3 text-[11px] text-slate-500 leading-relaxed font-mono">
          <p>
            <strong className="text-slate-400 uppercase">Risk Warning:</strong> Trading Foreign Exchange (Forex) and Contracts for Difference (CFDs) carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite. There is a possibility that you may sustain a loss of some or all of your initial investment and therefore you should not invest money that you cannot afford to lose.
          </p>
          <p>
            <strong className="text-slate-400 uppercase">Algorithmic Performance Disclaimer:</strong> Past performance of Expert Advisors (EAs), algorithmic neural strategies, or PAMM managers is not an indicator of future results. Forex Bank Pro does not issue financial advice.
          </p>
          <p>
            Forex Bank Pro Global Ltd is authorized and regulated by the British Virgin Islands Financial Services Commission under the Securities and Investment Business Act (License #1024298). Registered address: Trinity Chambers, PO Box 92, Road Town, Tortola, British Virgin Islands.
          </p>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Forex Bank Pro. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-800 transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
