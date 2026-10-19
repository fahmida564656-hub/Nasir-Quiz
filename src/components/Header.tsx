import React from 'react';
import { Coins, Gift, Sparkles, User, Zap, BarChart3 } from 'lucide-react';
import { Character, UserProfile, ThemeConfig } from '../types/game';
import { toBengaliNumber } from '../data/questionEngine';

interface HeaderProps {
  coins: number;
  streak: number;
  activeCharacter: Character;
  currentLevel: number;
  soundEnabled: boolean;
  currentUser: UserProfile | null;
  activeTheme: ThemeConfig;
  customTextColor: string;
  customLogoEmoji: string;
  onOpenDrawer: () => void;
  onOpenShop: () => void;
  onOpenAuth: () => void;
  onOpenProfileEdit: () => void;
  onOpenSuperheroStats?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  coins,
  streak,
  activeCharacter,
  currentLevel,
  soundEnabled,
  currentUser,
  activeTheme,
  customTextColor,
  customLogoEmoji,
  onOpenDrawer,
  onOpenShop,
  onOpenAuth,
  onOpenProfileEdit,
  onOpenSuperheroStats,
}) => {
  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl border-b shadow-md transition-colors ${activeTheme.headerBg}`}>
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-3">
        {/* Left Section: 3-Dots Menu Button + Logo + Title "নাসির কুইজ" */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 3-Dots Button on the far left */}
          <button
            onClick={onOpenDrawer}
            className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-slate-200 hover:text-white transition-all cursor-pointer border border-white/15 shadow-sm"
            title="মেনু ও ৫টি বিভাগ খুলুন"
            aria-label="৩ ডট মেনু"
          >
            <div className="flex flex-col gap-1 items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>
          </button>

          {/* Superhero Logo next to 3-dots */}
          <button
            onClick={onOpenProfileEdit}
            title="প্রোফাইল ও অনলাইন রুম কাস্টমাইজ করো"
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400/50 shrink-0 bg-gradient-to-br from-blue-600 to-indigo-700 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          >
            <span className="text-xl">⚡</span>
          </button>

          {/* Clean Title Lockup: "নাসির কুইজ" */}
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white block leading-tight">
                নাসির কুইজ
              </span>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-xs hidden xs:inline">
                SUPERHERO
              </span>
            </div>
            <span className="text-[11px] text-cyan-300/80 font-semibold block leading-none mt-0.5">
              সুপারহিরো কুইজ মিশন
            </span>
          </div>
        </div>

        {/* Right Section: Stats Graph + Profile & Coins */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Quick Superhero Graph Icon Button */}
          {onOpenSuperheroStats && (
            <button
              onClick={onOpenSuperheroStats}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-cyan-500/40 text-xs font-bold text-cyan-300 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              title="সুপারহিরো গ্রাফ ও পরিসংখ্যান"
            >
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline font-bold">গ্রাফ</span>
            </button>
          )}

          {/* Superhero Profile Pill */}
          {currentUser?.isLoggedIn ? (
            <button
              onClick={onOpenProfileEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-400/50 text-xs font-bold text-indigo-200 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              title="প্রোফাইল পরিবর্তন ও অনলাইন সার্চ করতে ক্লিক করো"
            >
              <span className="text-base">{currentUser.avatarEmoji}</span>
              <span className="hidden sm:inline font-extrabold max-w-[80px] truncate text-white">
                {currentUser.name}
              </span>
              <span className="text-[9px] px-1 rounded-md bg-indigo-800 text-indigo-200 hidden md:inline">
                {currentUser.superheroTitle || 'সুপার'}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:brightness-110 text-white text-xs font-black shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
              title="লগইন করুন ও ১,০০০ কয়েন পান"
            >
              <Gift className="w-3.5 h-3.5 text-amber-300" />
              <span>সাইন ইন</span>
              <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black hidden xs:inline">
                +১০০০
              </span>
            </button>
          )}

          {/* Active Mascot Badge */}
          <button
            onClick={onOpenDrawer}
            title={`সঙ্গী: ${activeCharacter.name}`}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <span className="text-base">{customLogoEmoji || activeCharacter.avatarEmoji}</span>
            <span
              className="hidden lg:inline font-bold"
              style={{ color: customTextColor }}
            >
              {activeCharacter.name}
            </span>
          </button>

          {/* Coin Badge */}
          <button
            onClick={onOpenShop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs sm:text-sm shadow-md shadow-amber-500/20 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            title="তোমার মোট কয়েন"
          >
            <Coins className="w-4 h-4 text-slate-950 fill-slate-950 shrink-0" />
            <span className="tabular-nums font-black">{toBengaliNumber(coins)}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
