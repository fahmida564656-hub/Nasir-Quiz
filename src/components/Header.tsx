import React from 'react';
import { Coins, Gift, Sparkles, User, Zap, BarChart3, Sun, Moon, Wifi, WifiOff } from 'lucide-react';
import { Character, UserProfile, ThemeConfig } from '../types/game';
import { toBengaliNumber } from '../data/questionEngine';
import { NasirQuizLogo } from './NasirQuizLogo';

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
  isDarkMode: boolean;
  isOnline: boolean;
  onToggleDarkMode: () => void;
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
  isDarkMode,
  isOnline,
  onToggleDarkMode,
  onOpenDrawer,
  onOpenShop,
  onOpenAuth,
  onOpenProfileEdit,
  onOpenSuperheroStats,
}) => {
  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors ${
        isDarkMode
          ? 'bg-slate-950/95 border-slate-800 text-white shadow-md'
          : 'bg-white/95 border-slate-200/90 text-slate-900 shadow-xs'
      }`}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-3">
        {/* Left Section: 3-Dots Menu Button + Nasir Quiz Custom Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 3-Dots Menu Button */}
          <button
            onClick={onOpenDrawer}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer border active:scale-95 shadow-2xs ${
              isDarkMode
                ? 'bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border-white/15'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 border-slate-200'
            }`}
            title="মেনু ও ৫টি প্রধান বিভাগ খুলুন"
            aria-label="৩ ডট মেনু"
          >
            <div className="flex flex-col gap-1 items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            </div>
          </button>

          {/* Nasir Quiz Custom Emblem & Title */}
          <button
            onClick={onOpenProfileEdit}
            className="cursor-pointer text-left hover:opacity-95 transition-opacity"
            title="নাসির কুইজ প্রোফাইল"
          >
            <NasirQuizLogo size="md" showSubtitle={false} />
          </button>
        </div>

        {/* Right Section: Online/Offline Badge + Theme Toggle + Stats + Profile + Coins */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Connectivity Status Pill */}
          <div
            className={`hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
              isOnline
                ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-600/40 text-emerald-700 dark:text-emerald-300'
                : 'bg-amber-50 dark:bg-amber-950/80 border-amber-300 dark:border-amber-600/40 text-amber-700 dark:text-amber-300'
            }`}
            title={isOnline ? 'ইন্টারনেট সংযুক্ত: ক্লাউড সিঙ্ক চালু' : 'অফলাইন মোড: সংরক্ষিত কুইজ চালু আছে'}
          >
            {isOnline ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>অনলাইন</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 text-amber-600" />
                <span>অফলাইন</span>
              </>
            )}
          </div>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-all border shadow-2xs ${
              isDarkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-600 border-amber-200'
            }`}
            title={isDarkMode ? 'সাদা মোড (Light Mode) চালু করুন' : 'ডার্ক মোড (Dark Mode) চালু করুন'}
            aria-label="থিম মোড পরিবর্তন"
          >
            {isDarkMode ? <Sun className="w-4 h-4 fill-amber-300" /> : <Moon className="w-4 h-4 fill-amber-500" />}
          </button>

          {/* Superhero Graph Recharts Button */}
          {onOpenSuperheroStats && (
            <button
              onClick={onOpenSuperheroStats}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95 ${
                isDarkMode
                  ? 'bg-slate-800/90 hover:bg-slate-750 border-cyan-500/40 text-cyan-300'
                  : 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-700'
              }`}
              title="সুপারহিরো গ্রাফ ও পরিসংখ্যান"
            >
              <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
              <span className="hidden sm:inline font-bold">গ্রাফ</span>
            </button>
          )}

          {/* User Profile Pill */}
          {currentUser?.isLoggedIn ? (
            <button
              onClick={onOpenProfileEdit}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95 ${
                isDarkMode
                  ? 'bg-indigo-950/80 hover:bg-indigo-900 border-indigo-500/50 text-indigo-200'
                  : 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-900'
              }`}
              title="প্রোফাইল সাজাতে ক্লিক করুন"
            >
              <span className="text-base">{currentUser.avatarEmoji}</span>
              <span className="hidden sm:inline font-extrabold max-w-[80px] truncate">
                {currentUser.name}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:brightness-110 text-white text-xs font-black shadow-md shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer"
              title="লগইন করুন ও ১,০০০ কয়েন বোনাস পান"
            >
              <Gift className="w-3.5 h-3.5 text-amber-300" />
              <span>লগইন</span>
              <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black hidden xs:inline">
                +১০০০
              </span>
            </button>
          )}

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
