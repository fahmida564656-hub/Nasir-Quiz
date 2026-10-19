import React from 'react';
import { Compass, Palette, Trophy, User, Sparkles, BarChart3, Users } from 'lucide-react';
import { UserProfile } from '../types/game';

interface MobileBottomNavProps {
  currentUser: UserProfile | null;
  onOpenCategories: () => void;
  onOpenCharacters: () => void;
  onOpenThemes: () => void;
  onOpenSuperheroStats: () => void;
  onOpenProfileEdit: () => void;
  onOpenAuth: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentUser,
  onOpenCategories,
  onOpenCharacters,
  onOpenThemes,
  onOpenSuperheroStats,
  onOpenProfileEdit,
  onOpenAuth,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 shadow-2xl px-2 py-1.5 flex items-center justify-around text-slate-300">
      <button
        onClick={onOpenCategories}
        className="flex flex-col items-center gap-0.5 p-1 hover:text-cyan-400 active:scale-95 transition-transform cursor-pointer"
      >
        <Compass className="w-5 h-5 text-cyan-400" />
        <span className="text-[10px] font-bold">বিষয়</span>
      </button>

      <button
        onClick={onOpenCharacters}
        className="flex flex-col items-center gap-0.5 p-1 hover:text-amber-400 active:scale-95 transition-transform cursor-pointer"
      >
        <Users className="w-5 h-5 text-amber-400" />
        <span className="text-[10px] font-bold">ক্যারেক্টার</span>
      </button>

      <button
        onClick={onOpenSuperheroStats}
        className="flex flex-col items-center gap-0.5 p-1 hover:text-emerald-400 active:scale-95 transition-transform cursor-pointer"
      >
        <BarChart3 className="w-5 h-5 text-emerald-400" />
        <span className="text-[10px] font-bold">গ্রাফ</span>
      </button>

      <button
        onClick={onOpenThemes}
        className="flex flex-col items-center gap-0.5 p-1 hover:text-purple-400 active:scale-95 transition-transform cursor-pointer"
      >
        <Palette className="w-5 h-5 text-purple-400" />
        <span className="text-[10px] font-bold">থিম ও ফ্রেম</span>
      </button>

      <button
        onClick={currentUser?.isLoggedIn ? onOpenProfileEdit : onOpenAuth}
        className="flex flex-col items-center gap-0.5 p-1 hover:text-blue-400 active:scale-95 transition-transform relative cursor-pointer"
      >
        <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs">
          {currentUser?.isLoggedIn ? (
            <span>{currentUser.avatarEmoji}</span>
          ) : (
            <User className="w-5 h-5 text-blue-400" />
          )}
        </div>
        <span className="text-[10px] font-bold text-white">
          {currentUser?.isLoggedIn ? 'প্রোফাইল' : 'লগইন'}
        </span>
        {!currentUser?.isLoggedIn && (
          <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        )}
      </button>
    </div>
  );
};
