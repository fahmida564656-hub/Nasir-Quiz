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
  Globe
} from 'lucide-react';
import { toBengaliNumber } from '../data/questionEngine';

interface NavigationDrawerProps {
  isOpen: boolean;
  isMonochrome: boolean;
  soundEnabled: boolean;
  currentLevel: number;
  coins: number;
  onToggleMonochrome: () => void;
  onToggleSound: () => void;
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
  isMonochrome,
  soundEnabled,
  currentLevel,
  coins,
  onToggleMonochrome,
  onToggleSound,
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
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed top-0 left-0 bottom-0 z-50 w-84 max-w-[85vw] bg-slate-900 border-r border-indigo-500/30 shadow-2xl flex flex-col overflow-hidden text-slate-100"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white flex items-center justify-between border-b border-indigo-500/40">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="font-black text-lg leading-tight">
                    নাসির কুইজ
                  </h3>
                  <p className="text-[11px] text-cyan-200 font-semibold">
                    সুপারহিরো কন্ট্রোল ও মেনু
                  </p>
                </div>
              </div>
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
              {/* Profile Customization Shortcut */}
              <button
                onClick={() => {
                  onClose();
                  onOpenProfileEdit();
                }}
                className="w-full p-3 rounded-2xl bg-indigo-950/70 hover:bg-indigo-900 text-indigo-100 flex items-center gap-3.5 font-bold text-sm transition-all cursor-pointer text-left border border-indigo-500/40 my-1 shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-lg shrink-0 text-white">
                  <UserCog className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="leading-tight text-white font-black">প্রোফাইল ও অনলাইন রুম</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-black">
                      সার্চ
                    </span>
                  </div>
                  <div className="text-[11px] text-indigo-300">অনলাইন অবতার ও রাজার মুকুট সার্চ</div>
                </div>
              </button>

              {/* Superhero Stats Bar Chart accessible from the menu */}
              <button
                onClick={() => {
                  onClose();
                  onOpenSuperheroStats();
                }}
                className="w-full p-3 rounded-2xl bg-gradient-to-r from-blue-900/60 to-cyan-950/80 hover:brightness-110 text-cyan-100 flex items-center gap-3.5 font-bold text-sm transition-all cursor-pointer text-left border border-cyan-500/50 my-1 shadow-md shadow-cyan-500/10"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center text-lg shrink-0 shadow-sm font-black">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="leading-tight text-white font-black">সুপারহিরো পরিসংখ্যান</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black">
                      recharts গ্রাফ
                    </span>
                  </div>
                  <div className="text-[11px] text-cyan-300/80">সঠিক বনাম ভুল উত্তরের রঙিন বার চার্ট</div>
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
                className="w-full p-3 rounded-2xl hover:bg-slate-800 text-slate-200 hover:text-white flex items-center gap-3.5 font-bold text-sm transition-colors cursor-pointer text-left border border-transparent hover:border-slate-700"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-900/60 flex items-center justify-center text-lg shrink-0">
                  <Compass className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="leading-tight text-white">বিষয় নির্বাচন</div>
                  <div className="text-[11px] text-slate-400 font-normal">বাংলাদেশ, ইসলাম, বিজ্ঞান...</div>
                </div>
              </button>

              {/* 2. ক্যারেক্টার */}
              <button
                onClick={() => {
                  onClose();
                  onOpenCharacters();
                }}
                className="w-full p-3 rounded-2xl hover:bg-slate-800 text-slate-200 hover:text-white flex items-center gap-3.5 font-bold text-sm transition-colors cursor-pointer text-left border border-transparent hover:border-slate-700"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-900/60 flex items-center justify-center text-lg shrink-0">
                  <Users className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="leading-tight text-white">ক্যারেক্টার নির্বাচন (আনলিমিটেড)</div>
                  <div className="text-[11px] text-slate-400 font-normal">সুলতান সুলেমান, বাঘ মামা, রোবট...</div>
                </div>
              </button>

              {/* 3. রং ও ডিজাইন */}
              <button
                onClick={() => {
                  onClose();
                  onOpenThemes();
                }}
                className="w-full p-3 rounded-2xl hover:bg-slate-800 text-slate-200 hover:text-white flex items-center gap-3.5 font-bold text-sm transition-colors cursor-pointer text-left border border-transparent hover:border-slate-700"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-900/60 flex items-center justify-center text-lg shrink-0">
                  <Palette className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="leading-tight text-white">সুপারহিরো থিম ও ফ্রেম</div>
                  <div className="text-[11px] text-slate-400 font-normal">ইলেকট্রিক ব্লু, ফায়ার ফোনিক্স, ক্রাউন...</div>
                </div>
              </button>

              {/* 4. লেভেল নির্বাচন */}
              <button
                onClick={() => {
                  onClose();
                  onOpenLevels();
                }}
                className="w-full p-3 rounded-2xl hover:bg-slate-800 text-slate-200 hover:text-white flex items-center gap-3.5 font-bold text-sm transition-colors cursor-pointer text-left border border-transparent hover:border-slate-700"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-900/60 flex items-center justify-center text-lg shrink-0">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="leading-tight text-white">লেভেল নির্বাচন (আনলিমিটেড ∞)</div>
                  <div className="text-[11px] text-slate-400 font-normal">বর্তমান লেভেল: {toBengaliNumber(currentLevel)}</div>
                </div>
              </button>

              {/* 5. পুরস্কার ও ট্রফি */}
              <button
                onClick={() => {
                  onClose();
                  onOpenShop();
                }}
                className="w-full p-3 rounded-2xl hover:bg-slate-800 text-slate-200 hover:text-white flex items-center gap-3.5 font-bold text-sm transition-colors cursor-pointer text-left border border-transparent hover:border-slate-700"
              >
                <div className="w-9 h-9 rounded-xl bg-yellow-900/60 flex items-center justify-center text-lg shrink-0">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <div className="leading-tight text-white">পুরস্কার ও ব্যাজ সংগ্রহ</div>
                  <div className="text-[11px] text-slate-400 font-normal">মেডেল ও পরিসংখ্যান</div>
                </div>
              </button>

              {/* Special Daily Check-in & Customizer */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                  ডেইলি কয়েন ও শপ
                </div>

                {/* Daily Check-in with Friday 1000 badge */}
                <button
                  onClick={() => {
                    onClose();
                    onOpenDailyCheckin();
                  }}
                  className="w-full p-3 rounded-2xl bg-amber-950/60 hover:bg-amber-900/70 text-amber-100 flex items-center gap-3.5 font-bold text-sm transition-colors cursor-pointer text-left border border-amber-500/50 my-1 shadow-sm"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-lg shrink-0 text-slate-950">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="leading-tight text-amber-200 font-black">ডেইলি চেক-ইন</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
                        শুক্রবারে ১০০০!
                      </span>
                    </div>
                    <div className="text-[11px] text-amber-300/80">প্রতিদিন ১০০ · জুমায় ১০০০ কয়েন</div>
                  </div>
                </button>

                {/* Customizer Shop */}
                <button
                  onClick={() => {
                    onClose();
                    onOpenCustomizerShop();
                  }}
                  className="w-full p-3 rounded-2xl bg-purple-950/60 hover:bg-purple-900/70 text-purple-100 flex items-center gap-3.5 font-bold text-sm transition-colors cursor-pointer text-left border border-purple-500/50 my-1 shadow-sm"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-500 flex items-center justify-center text-lg shrink-0 text-white">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="leading-tight text-purple-200 font-black">লোগো ও লেখার রং শপ</div>
                    <div className="text-[11px] text-purple-300/80">বাঘ মামা নীল/সোনালী রং ও ৫০০০ লোগো</div>
                  </div>
                </button>
              </div>

              {/* Settings Section */}
              <div className="pt-3 border-t border-slate-800">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                  সেটিংস
                </div>

                {/* Sound Toggle */}
                <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                      {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">সুপারহিরো সাউন্ড</div>
                      <div className="text-[10px] text-slate-400">আনন্দদায়ক অডিও এফেক্ট</div>
                    </div>
                  </div>

                  <button
                    onClick={onToggleSound}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      soundEnabled ? 'bg-blue-600 justify-end' : 'bg-slate-700 justify-start'
                    }`}
                  >
                    <div className="bg-white w-4 h-4 rounded-full shadow-md" />
                  </button>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-400 font-semibold">
              নাসির কুইজ · সুপারহিরো সংস্করণ
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
