import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Compass,
  Users,
  Palette,
  Sparkles,
  Trophy,
  Calendar,
  ShoppingBag,
  Volume2,
  VolumeX,
  UserCog,
  BarChart3,
  Sun,
  Moon,
  Music,
  Wifi,
  WifiOff
} from 'lucide-react';
import { toBengaliNumber } from '../data/questionEngine';
import { SoundPackId } from '../types/game';
import { NasirQuizLogo } from './NasirQuizLogo';

interface NavigationDrawerProps {
  isOpen: boolean;
  isDarkMode: boolean;
  isOnline: boolean;
  soundEnabled: boolean;
  activeSoundPack: SoundPackId;
  currentLevel: number;
  coins: number;
  onToggleDarkMode: () => void;
  onToggleSound: () => void;
  onOpenSoundStudio: () => void;
  onOpenCategories: () => void;
  onOpenCharacters: () => void;
  onOpenThemes: () => void;
  onOpenLevels: () => void;
  onOpenShop: () => void;
  onOpenDailyCheckin: () => void;
  onOpenCustomizerShop: () => void;
  onOpenProfileEdit: () => void;
  onOpenSuperheroStats: () => void;
  onClose: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  isDarkMode,
  isOnline,
  soundEnabled,
  activeSoundPack,
  currentLevel,
  coins,
  onToggleDarkMode,
  onToggleSound,
  onOpenSoundStudio,
  onOpenCategories,
  onOpenCharacters,
  onOpenThemes,
  onOpenLevels,
  onOpenShop,
  onOpenDailyCheckin,
  onOpenCustomizerShop,
  onOpenProfileEdit,
  onOpenSuperheroStats,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className={`fixed top-0 left-0 bottom-0 z-50 w-84 max-w-[85vw] shadow-2xl flex flex-col overflow-hidden transition-colors ${
              isDarkMode
                ? 'bg-slate-900 border-r border-indigo-500/30 text-slate-100'
                : 'bg-white border-r border-slate-200 text-slate-800'
            }`}
          >
            {/* Drawer Header with Nasir Quiz Logo */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white flex items-center justify-between border-b border-white/10">
              <NasirQuizLogo size="sm" showSubtitle={true} className="text-white" />
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white cursor-pointer transition-colors"
                title="মেনু বন্ধ করুন"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
              {/* Online/Offline Status Banner */}
              <div
                className={`p-2.5 rounded-2xl border text-xs font-bold flex items-center justify-between mb-2 ${
                  isOnline
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-600/40 text-emerald-800 dark:text-emerald-300'
                    : 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-600/40 text-amber-800 dark:text-amber-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isOnline ? (
                    <>
                      <Wifi className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>অনলাইন মোড (ক্লাউড সিঙ্ক সক্রিয়)</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span>অফলাইন মোড (কুইজ চালু আছে)</span>
                    </>
                  )}
                </div>
              </div>

              {/* Profile Customization Shortcut */}
              <button
                onClick={() => {
                  onClose();
                  onOpenProfileEdit();
                }}
                className={`w-full p-3 rounded-2xl flex items-center gap-3.5 font-bold text-sm transition-all cursor-pointer text-left border my-1 shadow-2xs ${
                  isDarkMode
                    ? 'bg-indigo-950/70 hover:bg-indigo-900 border-indigo-500/40 text-indigo-100'
                    : 'bg-indigo-50 hover:bg-indigo-100/80 border-indigo-200 text-indigo-950'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-lg shrink-0 text-white">
                  <UserCog className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="leading-tight font-black">প্রোফাইল ও অবতার স্টুডিও</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
                      কাস্টম
                    </span>
                  </div>
                  <div className="text-[11px] opacity-75">নাম, মুকুট, খেতাব ও সাজসজ্জা</div>
                </div>
              </button>

              {/* Superhero Stats Recharts Bar Chart Link */}
              <button
                onClick={() => {
                  onClose();
                  onOpenSuperheroStats();
                }}
                className={`w-full p-3 rounded-2xl flex items-center gap-3.5 font-bold text-sm transition-all cursor-pointer text-left border my-1 shadow-2xs ${
                  isDarkMode
                    ? 'bg-slate-850 hover:bg-slate-800 border-cyan-500/40 text-cyan-200'
                    : 'bg-cyan-50 hover:bg-cyan-100/80 border-cyan-200 text-cyan-950'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center text-lg shrink-0 font-black shadow-xs">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="leading-tight font-black">সুপারহিরো পরিসংখ্যান</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500 text-white font-black">
                      গ্রাফ
                    </span>
                  </div>
                  <div className="text-[11px] opacity-75">সঠিক বনাম ভুল উত্তরের রঙিন বার চার্ট</div>
                </div>
              </button>

              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-2">
                প্রধান ৫টি বিভাগ
              </div>

              {/* 1. বিষয় */}
              <button
                onClick={() => {
                  onClose();
                  onOpenCategories();
                }}
                className="w-full p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-3.5 font-bold text-sm transition-colors cursor-pointer text-left"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center text-lg shrink-0">
                  <Compass className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                </div>
                <div>
                  <div className="leading-tight">বিষয় নির্বাচন</div>
                  <div className="text-[11px] text-slate-400 font-normal">বাংলাদেশ, ইসলাম, বিজ্ঞান...</div>
                </div>
              </button>

              {/* 2. ক্যারেক্টার */}
              <button
                onClick={() => {
                  onClose();
                  onOpenCharacters();
                }}
                className="w-full p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-3.5 font-bold text-sm transition-colors cursor-pointer text-left"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/60 flex items-center justify-center text-lg shrink-0">
                  <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="leading-tight">ক্যারেক্টার নির্বাচন</div>
                  <div className="text-[11px] text-slate-400 font-normal">সুলতান সুলেমান, বাঘ মামা, রোবট...</div>
                </div>
              </button>

              {/* 3. রং ও ডিজাইন */}
              <button
                onClick={() => {
                  onClose();
                  onOpenThemes();
                }}
                className="w-full p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-3.5 font-bold text-sm transition-colors cursor-pointer text-left"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center text-lg shrink-0">
                  <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="leading-tight">সুপারহিরো থিম ও ফ্রেম</div>
                  <div className="text-[11px] text-slate-400 font-normal">ইলেকট্রিক ব্লু, রাজকীয় স্বর্ণ, ক্রাউন...</div>
                </div>
              </button>

              {/* 4. লেভেল নির্বাচন */}
              <button
                onClick={() => {
                  onClose();
                  onOpenLevels();
                }}
                className="w-full p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-3.5 font-bold text-sm transition-colors cursor-pointer text-left"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-lg shrink-0">
                  <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="leading-tight">লেভেল নির্বাচন (আনলিমিটেড ∞)</div>
                  <div className="text-[11px] text-slate-400 font-normal">বর্তমান লেভেল: {toBengaliNumber(currentLevel)}</div>
                </div>
              </button>

              {/* 5. পুরস্কার ও ট্রফি */}
              <button
                onClick={() => {
                  onClose();
                  onOpenShop();
                }}
                className="w-full p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-3.5 font-bold text-sm transition-colors cursor-pointer text-left"
              >
                <div className="w-9 h-9 rounded-xl bg-yellow-100 dark:bg-yellow-900/60 flex items-center justify-center text-lg shrink-0">
                  <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <div className="leading-tight">পুরস্কার ও ব্যাজ সংগ্রহ</div>
                  <div className="text-[11px] text-slate-400 font-normal">মেডেল ও অর্জনসমূহ</div>
                </div>
              </button>

              {/* Special Daily Check-in & Customizer */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                  ডেইলি কয়েন ও শপ
                </div>

                {/* Daily Check-in with Friday 1000 badge */}
                <button
                  onClick={() => {
                    onClose();
                    onOpenDailyCheckin();
                  }}
                  className={`w-full p-3 rounded-2xl flex items-center gap-3.5 font-bold text-sm transition-colors cursor-pointer text-left border my-1 shadow-2xs ${
                    isDarkMode
                      ? 'bg-amber-950/60 hover:bg-amber-900/70 border-amber-500/50 text-amber-200'
                      : 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-900'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-lg shrink-0 text-slate-950">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="leading-tight font-black">ডেইলি চেক-ইন</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
                        শুক্রবারে ১০০০!
                      </span>
                    </div>
                    <div className="text-[11px] opacity-75">প্রতিদিন ১০০ · জুমায় ১০০০ কয়েন</div>
                  </div>
                </button>

                {/* Customizer Shop */}
                <button
                  onClick={() => {
                    onClose();
                    onOpenCustomizerShop();
                  }}
                  className={`w-full p-3 rounded-2xl flex items-center gap-3.5 font-bold text-sm transition-colors cursor-pointer text-left border my-1 shadow-2xs ${
                    isDarkMode
                      ? 'bg-purple-950/60 hover:bg-purple-900/70 border-purple-500/50 text-purple-200'
                      : 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-900'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-500 flex items-center justify-center text-lg shrink-0 text-white">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="leading-tight font-black">লোগো ও লেখার রং শপ</div>
                    <div className="text-[11px] opacity-75">বাঘ মামা নীল/সোনালী রং ও কাস্টমাইজেশন</div>
                  </div>
                </button>
              </div>

              {/* SETTINGS SECTION: Sound Studio & White/Dark Mode */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                  সেটিংস ও সাউন্ড স্টুডিও
                </div>

                {/* Sound Studio Option */}
                <button
                  onClick={() => {
                    onClose();
                    onOpenSoundStudio();
                  }}
                  className={`w-full p-3 rounded-2xl flex items-center justify-between border cursor-pointer transition-all shadow-2xs ${
                    isDarkMode
                      ? 'bg-slate-800/90 hover:bg-slate-750 border-indigo-500/40 text-slate-100'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-base">
                      🎵
                    </div>
                    <div>
                      <div className="text-xs font-black leading-tight flex items-center gap-1.5">
                        <span>সাউন্ড স্টুডিও</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-amber-400 text-slate-950 font-black">
                          থিম প্যাক
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        কার্টুন, হিরো বা ফিউচারিস্টিক সাউন্ড
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-indigo-600 dark:text-cyan-400 font-bold">
                    বদলান ➔
                  </span>
                </button>

                {/* Light Mode / Dark Mode Toggle */}
                <div
                  className={`p-3 rounded-2xl border flex items-center justify-between ${
                    isDarkMode
                      ? 'bg-slate-800/80 border-slate-700'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center">
                      {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold">
                        {isDarkMode ? 'ডার্ক মোড (Dark)' : 'সাদা মোড (Light)'}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        {isDarkMode ? 'রাতের অন্ধকার থিম' : 'পরিচ্ছন্ন সাদা ব্যাকগ্রাউন্ড'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={onToggleDarkMode}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      isDarkMode
                        ? 'bg-slate-700 text-amber-300'
                        : 'bg-indigo-600 text-white shadow-2xs'
                    }`}
                  >
                    {isDarkMode ? 'সাদা মোড' : 'ডার্ক মোড'}
                  </button>
                </div>

                {/* Sound Master Toggle */}
                <div
                  className={`p-3 rounded-2xl border flex items-center justify-between ${
                    isDarkMode
                      ? 'bg-slate-800/80 border-slate-700'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                      {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold">শব্দ ও ইফেক্ট</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        {soundEnabled ? 'সাউন্ড চালু আছে' : 'মিউট করা'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={onToggleSound}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      soundEnabled ? 'bg-blue-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                    }`}
                  >
                    <div className="bg-white w-4 h-4 rounded-full shadow-md" />
                  </button>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-3 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 font-semibold">
              নাসির কুইজ · শিশুদের বাংলা গেম
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
