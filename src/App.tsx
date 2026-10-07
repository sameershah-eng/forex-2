/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BannerSlider } from './components/BannerSlider';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeatureGrid } from './components/FeatureGrid';
import { ProfitCalculator } from './components/ProfitCalculator';
import { AITerminal } from './components/AITerminal';
import { RegulatorySection } from './components/RegulatorySection';
import { Footer } from './components/Footer';
import { DemoModal, VideoModal, AgentsModal } from './components/Modals';
import { CURRENCIES, CurrencyConfig } from './data/forexData';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function App() {
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyConfig>(CURRENCIES[0]);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [agentsModalOpen, setAgentsModalOpen] = useState(false);
  const [liveModalOpen, setLiveModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLiveModal = () => {
    showToast("Live Portal Initiated: Directing to Instant BVI KYC Verification...");
    setLiveModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 relative overflow-x-hidden">
      {/* 1. Top Animated Announcement Banner Slider */}
      <BannerSlider
        onSelectAction={(linkId) => scrollToSection(linkId)}
      />

      {/* 2. Glass Top Navbar */}
      <Navbar
        currentCurrency={currentCurrency}
        onSelectCurrency={setCurrentCurrency}
        onOpenDemoModal={() => setDemoModalOpen(true)}
        onOpenLiveModal={handleOpenLiveModal}
        onOpenVideoModal={() => setVideoModalOpen(true)}
        onScrollToSection={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 3. Motion-Enhanced Video Hero Section */}
        <HeroSection
          currentCurrency={currentCurrency}
          onExploreAgents={() => setAgentsModalOpen(true)}
          onStartDemo={() => setDemoModalOpen(true)}
          onWatchVideo={() => setVideoModalOpen(true)}
        />

        {/* 4. Interactive Feature & Product Grid (4-Card Layout) */}
        <FeatureGrid
          currentCurrency={currentCurrency}
          onOpenLiveAccount={handleOpenLiveModal}
        />

        {/* 5. Live Interactive Profit & Risk Calculator Component */}
        <ProfitCalculator
          currentCurrency={currentCurrency}
          onOpenLiveAccount={handleOpenLiveModal}
        />

        {/* 6. Live AI Agent Monitor (Terminal View) */}
        <AITerminal
          currentCurrency={currentCurrency}
        />

        {/* 7. Regulatory Compliance & Capital Security Section */}
        <RegulatorySection />
      </main>

      {/* 8. Multi-Column Glass Footer */}
      <Footer
        onScrollToSection={scrollToSection}
      />

      {/* Modals & Dialogs */}
      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        currentCurrency={currentCurrency}
      />

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />

      <AgentsModal
        isOpen={agentsModalOpen}
        onClose={() => setAgentsModalOpen(false)}
        onSelectAgent={() => {
          showToast("Quantum Alpha-Grid v5.4 deployed to virtual staging.");
          scrollToSection('terminal');
        }}
      />

      {/* Live Account Onboarding Dialog */}
      <AnimatePresence>
        {liveModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLiveModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-slate-900 border border-emerald-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 space-y-5"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Zap className="w-5 h-5 fill-emerald-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-lg">
                    Open Live ECN Account
                  </h3>
                  <span className="text-xs font-mono text-emerald-400">
                    BVI FSC Regulated Tier-1 Liquidity
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Instant USDT TRC-20 / ERC-20 funding with 0% network surcharges.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Direct segregated custody with Barclays & Standard Chartered.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Sub-2ms execution routing via Equinix LD4 fiber cross-connect.</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs text-slate-400 font-semibold block">Preferred Funding Method</label>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <button className="p-2 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
                    USDT (TRC-20)
                  </button>
                  <button className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    Wire / SWIFT
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setLiveModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setLiveModalOpen(false);
                    showToast("Account application submitted. Broker onboarding link dispatched.");
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
                >
                  Proceed to KYC
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Interactive Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900/95 border border-emerald-500/50 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md max-w-md text-xs font-mono"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
