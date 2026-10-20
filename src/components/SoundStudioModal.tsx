import React from 'react';
import { motion } from 'framer-motion';
import { X, Volume2, VolumeX, Sparkles, Check, Play, Music, Radio } from 'lucide-react';
import { SoundPackId } from '../types/game';
import { SOUND_PACKS } from '../data/soundPacks';
import { SoundEffects } from '../utils/sound';

interface SoundStudioModalProps {
  isOpen: boolean;
  activeSoundPack: SoundPackId;
  soundEnabled: boolean;
  onSelectSoundPack: (packId: SoundPackId) => void;
  onToggleSound: () => void;
  onClose: () => void;
}

export const SoundStudioModal: React.FC<SoundStudioModalProps> = ({
  isOpen,
  activeSoundPack,
  soundEnabled,
  onSelectSoundPack,
  onToggleSound,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleTestSound = (packId: SoundPackId, e: React.MouseEvent) => {
    e.stopPropagation();
    SoundEffects.playTest(packId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto animate-fade-in">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="bg-white dark:bg-slate-900 border-2 border-indigo-400 dark:border-indigo-500/80 rounded-3xl shadow-2xl max-w-xl w-full p-5 sm:p-7 my-6 relative overflow-hidden text-slate-800 dark:text-slate-100 max-h-[90vh] flex flex-col"
      >
        {/* Top Glow Strip */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-600 shadow-md" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl text-white shadow-lg shadow-indigo-500/30">
            🎵
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                সাউন্ড স্টুডিও (Sound Studio)
              </h3>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                AUDIO
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              কুইজের সঠিক ও ভুল উত্তরের জন্য তোমার পছন্দের মজাদার সাউন্ড প্যাক বেছে নাও!
            </p>
          </div>
        </div>

        {/* Master Sound On/Off Bar */}
        <div className="my-3.5 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 dark:text-white block">
                গেম সাউন্ড ইফেক্ট
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {soundEnabled ? 'সাউন্ড চালু আছে 🔊' : 'সাউন্ড বন্ধ (মিউট) 🔇'}
              </span>
            </div>
          </div>

          <button
            onClick={onToggleSound}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            {soundEnabled ? 'চালু' : 'বন্ধ'}
          </button>
        </div>

        {/* Sound Pack Choices */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar my-2">
          {SOUND_PACKS.map(pack => {
            const isSelected = pack.id === activeSoundPack;

            return (
              <div
                key={pack.id}
                onClick={() => onSelectSoundPack(pack.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/70 shadow-md ring-2 ring-indigo-400/50'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-indigo-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-2xl shrink-0 shadow-xs">
                    {pack.emoji}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="font-black text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                        {pack.name}
                      </h4>
                      <span className="text-[10px] px-2 py-0.2 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-500/40">
                        {pack.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {pack.tagline}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 hidden sm:block">
                      {pack.description}
                    </p>
                  </div>
                </div>

                {/* Right Action: Test Preview + Selection Check */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => handleTestSound(pack.id, e)}
                    className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                    title="এই সাউন্ডটি শুনে দেখুন"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span className="hidden sm:inline">শুনুন</span>
                  </button>

                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            নির্বাচিত সাউন্ড কুইজে স্বয়ংক্রিয়ভাবে বাজবে
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold cursor-pointer transition-colors shadow-sm"
          >
            ঠিক আছে
          </button>
        </div>
      </motion.div>
    </div>
  );
};
