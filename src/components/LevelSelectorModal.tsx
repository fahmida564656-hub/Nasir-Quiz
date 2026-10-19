import React, { useState } from 'react';
import { toBengaliNumber } from '../data/questionEngine';
import { X, Trophy, Sparkles, CheckCircle2, ChevronLeft, ChevronRight, Search, Infinity, ArrowRight } from 'lucide-react';

interface LevelSelectorModalProps {
  isOpen: boolean;
  currentLevel: number;
  highestLevelReached: number;
  onSelectLevel: (level: number) => void;
  onClose: () => void;
}

export const LevelSelectorModal: React.FC<LevelSelectorModalProps> = ({
  isOpen,
  currentLevel,
  highestLevelReached,
  onSelectLevel,
  onClose,
}) => {
  const [page, setPage] = useState(() => Math.floor((currentLevel - 1) / 20));
  const [customLevelInput, setCustomLevelInput] = useState('');
  const levelsPerPage = 20;

  if (!isOpen) return null;

  const startLevel = page * levelsPerPage + 1;
  const levels = Array.from({ length: levelsPerPage }, (_, i) => startLevel + i);

  const handleCustomJump = (e: React.FormEvent) => {
    e.preventDefault();
    const lvl = parseInt(customLevelInput.trim(), 10);
    if (!isNaN(lvl) && lvl > 0) {
      onSelectLevel(lvl);
      setCustomLevelInput('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-slate-900 border-2 border-indigo-500/80 rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-7 my-8 relative text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">⚡</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white leading-tight">
                  আনলিমিটেড লেভেল নির্বাচন
                </h3>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 flex items-center gap-1">
                  <Infinity className="w-3 h-3" />
                  <span>সীমাহীন</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                যত ইচ্ছে তত লেভেল খেলো—কখনো প্রশ্ন ফুরাবে না!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Direct Jump to any level input */}
        <form onSubmit={handleCustomJump} className="my-4 p-3 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center gap-2">
          <Search className="w-4 h-4 text-cyan-400 shrink-0 ml-1" />
          <input
            type="number"
            min="1"
            max="999999"
            value={customLevelInput}
            onChange={(e) => setCustomLevelInput(e.target.value)}
            placeholder="যেকোনো লেভেল নম্বরে যাও (যেমন: ৫০, ১০০, ১০০০...)"
            className="flex-1 bg-transparent border-none text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-hidden font-bold"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 text-white font-black text-xs cursor-pointer shadow-sm active:scale-95 transition-all"
          >
            যাও 🚀
          </button>
        </form>

        {/* Page Switcher */}
        <div className="flex items-center justify-between my-3 px-3 py-2 bg-slate-950/70 rounded-2xl border border-slate-800">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            title="পূর্ববর্তী পৃষ্ঠা"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-xs font-bold text-slate-300">
            লেভেল {toBengaliNumber(startLevel)} থেকে {toBengaliNumber(startLevel + levelsPerPage - 1)}
          </div>

          <button
            onClick={() => setPage(p => p + 1)}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer transition-colors"
            title="পরবর্তী পৃষ্ঠা"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 my-4 max-h-[45vh] overflow-y-auto pr-1 custom-scrollbar">
          {levels.map(lvl => {
            const isCurrent = lvl === currentLevel;
            const isPassed = lvl < highestLevelReached;

            return (
              <button
                key={lvl}
                onClick={() => {
                  onSelectLevel(lvl);
                  onClose();
                }}
                className={`py-3 px-2 rounded-2xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer relative group ${
                  isCurrent
                    ? 'border-cyan-400 bg-cyan-950/90 text-cyan-200 font-black shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400'
                    : isPassed
                    ? 'border-amber-400/80 bg-amber-950/60 text-amber-200 font-bold'
                    : 'border-slate-800 bg-slate-800/60 hover:border-cyan-500 hover:bg-slate-750 text-slate-300 font-semibold'
                }`}
              >
                <span className="text-[10px] text-slate-400 font-medium">ধাপ</span>
                <span className="text-base sm:text-lg font-black tabular-nums">
                  {toBengaliNumber(lvl)}
                </span>
                {isPassed && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5" />
                )}
                {isCurrent && (
                  <span className="text-[9px] px-1.5 py-0.2 bg-cyan-500 text-slate-950 rounded-full font-black mt-0.5">
                    বর্তমান
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Fast-Forward Jump Buttons */}
        <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => setPage(p => Math.max(0, p - 5))}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
          >
            -১০০ লেভেল
          </button>
          <button
            onClick={() => setPage(p => p + 5)}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
          >
            +১০০ লেভেল
          </button>
          <button
            onClick={() => setPage(p => p + 25)}
            className="px-2.5 py-1 rounded-lg bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 text-xs font-bold cursor-pointer"
          >
            +৫০০ লেভেল 🚀
          </button>
        </div>

        {/* Footer */}
        <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>🎯 প্রতিটি লেভেলে সম্পূর্ণ নতুন ও বৈচিত্র্যপূর্ণ ১০টি প্রশ্ন</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold cursor-pointer transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
