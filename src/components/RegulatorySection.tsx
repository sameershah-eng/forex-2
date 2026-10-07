import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Building2, 
  Lock, 
  FileCheck, 
  ExternalLink, 
  X, 
  Award, 
  CheckCircle, 
  CheckCircle2, 
  Globe
} from 'lucide-react';
import { REGULATORY_INFO } from '../data/forexData';

export const RegulatorySection: React.FC = () => {
  const [showCertModal, setShowCertModal] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-8 h-8 text-emerald-400" />;
      case 'Building2':
        return <Building2 className="w-8 h-8 text-teal-400" />;
      case 'Lock':
      default:
        return <Lock className="w-8 h-8 text-cyan-400" />;
    }
  };

  return (
    <section id="regulation" className="py-24 relative bg-slate-950/80 border-b border-slate-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none" />

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
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Statutory Oversight & Custodial Safety</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
            REGULATORY COMPLIANCE & CAPITAL SECURITY
          </h2>
          <p className="mt-4 text-slate-400 text-base leading-relaxed">
            Institutional peace of mind. Strict adherence to international financial securities laws, audited segregated client funds, and tier-1 banking custody.
          </p>
        </motion.div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REGULATORY_INFO.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 shadow-xl shadow-black/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    {getIcon(item.icon)}
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    {item.identifier}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-white mb-1">
                  {item.title}
                </h3>
                <span className="text-xs font-mono text-teal-400 block mb-4">
                  {item.subtitle}
                </span>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div>
                {/* Badges */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80 mb-6">
                  {item.badges.map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="text-[11px] font-mono text-slate-300 bg-slate-950 px-2 py-1 rounded border border-slate-800 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Interactive Modal Trigger on first card */}
                {index === 0 && (
                  <button
                    onClick={() => setShowCertModal(true)}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 transition-colors text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span>View Official FSC Certificate</span>
                  </button>
                )}

                {index === 1 && (
                  <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5 justify-center py-2 bg-slate-950/40 rounded-xl border border-slate-800/50">
                    <Globe className="w-3.5 h-3.5 text-teal-400" />
                    <span>Austin Hub: 1100 Congress Ave</span>
                  </div>
                )}

                {index === 2 && (
                  <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5 justify-center py-2 bg-slate-950/40 rounded-xl border border-slate-800/50">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>FSCS Protected up to $1,000,000</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Official Certificate Modal */}
      <AnimatePresence>
        {showCertModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCertModal(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-slate-900 border border-emerald-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-500/30">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-base">
                      BVI FSC Statutory Certificate
                    </h3>
                    <span className="text-xs font-mono text-emerald-400">
                      License Authorization #1024298
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowCertModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate Mock Document Box */}
              <div className="bg-slate-950 p-6 rounded-xl border border-emerald-500/20 font-mono text-xs space-y-4 relative overflow-hidden">
                <div className="absolute top-2 right-2 text-[10px] text-emerald-400/30 font-black rotate-12 uppercase select-none border-2 border-emerald-500/20 px-2 py-1 rounded">
                  VERIFIED STATUTORY
                </div>

                <div className="text-center space-y-1 pb-3 border-b border-slate-800">
                  <div className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">
                    British Virgin Islands Financial Services Commission
                  </div>
                  <div className="text-sm font-bold text-white">
                    CERTIFICATE OF INVESTMENT BUSINESS
                  </div>
                  <div className="text-[10px] text-emerald-400">
                    Pursuant to Section 6 of the Securities and Investment Business Act, 2010
                  </div>
                </div>

                <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
                  <p>
                    This certifies that <strong className="text-white">FOREX BANK PRO GLOBAL LTD</strong> has satisfied all statutory capitalization and audit mandates and is officially authorized to provide dealing in securities, algorithmic execution services, and collective investment schemes.
                  </p>
                  <div className="pt-2 grid grid-cols-2 gap-2 text-[10px] text-slate-400 border-t border-slate-800/80">
                    <div>
                      <span className="block text-slate-500">Registration Number</span>
                      <span className="text-white font-bold">BVI-CORP-2024-1024298</span>
                    </div>
                    <div>
                      <span className="block text-slate-500">Status</span>
                      <span className="text-emerald-400 font-bold">ACTIVE & IN GOOD STANDING</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Official Registry Verified
                </span>
                <button
                  onClick={() => setShowCertModal(false)}
                  className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
                >
                  Close Document
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
