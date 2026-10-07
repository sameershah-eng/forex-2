import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { ANNOUNCEMENTS, Announcement } from '../data/forexData';

interface BannerSliderProps {
  onSelectAction: (linkId: string) => void;
}

export const BannerSlider: React.FC<BannerSliderProps> = ({ onSelectAction }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const DURATION_MS = 6000;
  const TICK_INTERVAL = 50;

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((curr) => (curr + 1) % ANNOUNCEMENTS.length);
          return 0;
        }
        return prev + (TICK_INTERVAL / DURATION_MS) * 100;
      });
    }, TICK_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  };

  const current: Announcement = ANNOUNCEMENTS[currentIndex];

  return (
    <div
      className="relative z-50 bg-slate-950/95 border-b border-emerald-500/20 text-xs backdrop-blur-md overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background glow strip */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/10 to-emerald-500/5 pointer-events-none" />

      {/* Progress Bar Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-800">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
          style={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-2 sm:py-2.5 flex items-center justify-between gap-3">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous announcement"
          className="text-slate-400 hover:text-emerald-400 transition-colors p-1 rounded hover:bg-slate-800/60 hidden sm:block"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Center Animated Message */}
        <div className="flex-1 flex items-center justify-center overflow-hidden min-h-[22px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex items-center flex-wrap justify-center gap-2 text-center"
            >
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded">
                <Sparkles className="w-3 h-3 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
                {current.tag}
              </span>

              <span className="text-slate-300 font-medium text-xs">
                {current.text}
              </span>

              <span className="font-semibold text-emerald-300 bg-emerald-900/30 px-1.5 py-0.5 rounded text-xs border border-emerald-500/20">
                {current.highlight}
              </span>

              <button
                onClick={() => onSelectAction(current.linkId)}
                className="inline-flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300 transition-colors underline decoration-emerald-500/50 underline-offset-4 ml-1 cursor-pointer"
              >
                <span>{current.actionText}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 text-slate-400">
          {/* Pause / Play Indicator */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? "Resume rotation" : "Pause rotation"}
            className="p-1 hover:text-slate-200 transition-colors rounded hover:bg-slate-800/60"
            title={isPaused ? "Paused" : "Playing"}
          >
            {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3 text-slate-400" />}
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1">
            {ANNOUNCEMENTS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setProgress(0);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  currentIndex === idx ? "w-4 bg-emerald-400" : "bg-slate-700 hover:bg-slate-500"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next announcement"
            className="text-slate-400 hover:text-emerald-400 transition-colors p-1 rounded hover:bg-slate-800/60 hidden sm:block"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
