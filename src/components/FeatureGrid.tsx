import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Users, 
  BarChart3, 
  Layers, 
  ArrowRight, 
  Check, 
  X, 
  ExternalLink,
  Shield, 
  Sparkles,
  Info
} from 'lucide-react';
import { PRODUCT_CARDS, ProductFeature, CurrencyConfig } from '../data/forexData';

interface FeatureGridProps {
  currentCurrency: CurrencyConfig;
  onOpenLiveAccount: () => void;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ currentCurrency, onOpenLiveAccount }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductFeature | null>(null);

  const getProductIcon = (id: string) => {
    switch (id) {
      case 'automated-eas':
        return <Bot className="w-6 h-6 text-emerald-400" />;
      case 'pamm-managed':
        return <Users className="w-6 h-6 text-teal-400" />;
      case 'stock-cfds':
        return <BarChart3 className="w-6 h-6 text-emerald-300" />;
      case 'raw-spreads':
      default:
        return <Layers className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="features" className="py-24 relative bg-slate-950/70 border-b border-slate-800/80">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />

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
            <Sparkles className="w-3.5 h-3.5" />
            <span>High-Velocity Execution Engines</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
            INSTITUTIONAL PRODUCT ARCHITECTURE
          </h2>
          <p className="mt-4 text-slate-400 text-base leading-relaxed">
            Engineered for high-frequency algorithmic performance, multi-asset diversification, and maximum capital efficiency.
          </p>
        </motion.div>

        {/* 4-Card Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRODUCT_CARDS.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedProduct(card)}
              className="group relative rounded-2xl overflow-hidden bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/50 transition-all duration-300 shadow-xl shadow-black/50 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Header with Dark Gradient Overlay */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                
                {/* Floating Tag */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 shadow-lg">
                    {getProductIcon(card.id)}
                  </div>
                  <span className="text-[11px] font-mono uppercase font-bold text-emerald-300 bg-emerald-950/90 border border-emerald-500/30 px-2.5 py-1 rounded-full backdrop-blur-md">
                    {card.badge}
                  </span>
                </div>

                {/* Subtitle tag */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
                    {card.tagline}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {card.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {card.description}
                </p>

                {/* Stat Badges Grid */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/70">
                  {card.stats.map((stat, i) => (
                    <div key={i} className="text-center px-1">
                      <div className="font-display font-bold text-sm sm:text-base text-white group-hover:text-emerald-400 transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-tight mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key Spec Row */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <div>
                    Min: <span className="text-slate-200 font-bold">{card.specs.minDeposit}</span>
                  </div>
                  <div>
                    Leverage: <span className="text-slate-200 font-bold">{card.specs.maxLeverage}</span>
                  </div>
                  <div>
                    Spread: <span className="text-emerald-400 font-bold">{card.specs.commission}</span>
                  </div>
                </div>

                {/* Bottom Action Trigger */}
                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
                  <span className="flex items-center gap-1.5">
                    <Info className="w-4 h-4" />
                    Inspect Specifications & Rules
                  </span>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Modal for Selected Product */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-white/10 hover:border-emerald-500/40 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-2 mb-1">
                    {getProductIcon(selectedProduct.id)}
                    <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
                      {selectedProduct.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl font-display font-black text-white">
                    {selectedProduct.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 overflow-y-auto terminal-scroll">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Technical Specifications Grid */}
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs uppercase tracking-wider font-mono text-emerald-400 font-bold mb-3">
                    Technical Specifications
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block">Min Deposit</span>
                      <span className="text-white font-bold">{selectedProduct.specs.minDeposit}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Max Leverage</span>
                      <span className="text-white font-bold">{selectedProduct.specs.maxLeverage}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Pricing / Fee</span>
                      <span className="text-white font-bold">{selectedProduct.specs.commission}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Routing Type</span>
                      <span className="text-emerald-400 font-bold">{selectedProduct.specs.execution}</span>
                    </div>
                  </div>
                </div>

                {/* Key Features List */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-mono text-emerald-400 font-bold mb-3">
                    Operational Highlights
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedProduct.features.map((feat, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <div className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Close Specification
                </button>
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    onOpenLiveAccount();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all flex items-center gap-2"
                >
                  <span>Deploy on Live Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
