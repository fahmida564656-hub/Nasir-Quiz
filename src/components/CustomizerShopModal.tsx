import React from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingBag, Palette, Sparkles, Check, Lock, Coins, Crown, Shirt } from 'lucide-react';
import { CUSTOM_TEXT_COLORS, CHARACTER_LOGO_UPGRADES } from '../data/shopCustomizations';
import { Character, CustomTextColor, CharacterLogoUpgrade } from '../types/game';
import { toBengaliNumber } from '../data/questionEngine';

interface CustomizerShopModalProps {
  isOpen: boolean;
  activeCharacter: Character;
  selectedTextColor: string;
  unlockedTextColorIds: string[];
  selectedLogoUpgrade: string;
  unlockedLogoUpgradeIds: string[];
  userCoins: number;
  isOnline?: boolean;
  onSelectTextColor: (colorHex: string) => void;
  onUnlockTextColor: (item: CustomTextColor) => void;
  onSelectLogoUpgrade: (id: string) => void;
  onUnlockLogoUpgrade: (item: CharacterLogoUpgrade) => void;
  onClose: () => void;
}

export const CustomizerShopModal: React.FC<CustomizerShopModalProps> = ({
  isOpen,
  activeCharacter,
  selectedTextColor,
  unlockedTextColorIds,
  selectedLogoUpgrade,
  unlockedLogoUpgradeIds,
  userCoins,
  isOnline = true,
  onSelectTextColor,
  onUnlockTextColor,
  onSelectLogoUpgrade,
  onUnlockLogoUpgrade,
  onClose,
}) => {
  if (!isOpen) return null;

  const currentLogoObj = CHARACTER_LOGO_UPGRADES.find(l => l.id === selectedLogoUpgrade) || CHARACTER_LOGO_UPGRADES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl border-2 border-purple-300 shadow-2xl max-w-2xl w-full p-6 sm:p-7 my-8 relative max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        {/* Top Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-purple-100">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-300 flex items-center justify-center text-2xl shadow-xs">
            🛍️
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              লোগো ও লেখার রঙের শপিং টুলস
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              কয়েন জমিয়ে বাঘ মামার লোগো ও লেখার রঙ নীল, সোনালী বা লালে সাজাও!
            </p>
          </div>
        </div>

        {/* Live Preview Display Card */}
        <div className="my-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 border-2 border-purple-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 rounded-2xl bg-white border-2 border-purple-300 flex items-center justify-center text-4xl shadow-xs relative">
              {currentLogoObj.id === 'default' ? activeCharacter.avatarEmoji : currentLogoObj.emojiIcon}
              <span className="absolute -top-1 -right-1 text-xs">✨</span>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                লাইভ প্রিভিউ
              </div>
              <h4
                className="text-xl sm:text-2xl font-black transition-colors"
                style={{ color: selectedTextColor }}
              >
                {activeCharacter.name}
              </h4>
              <p className="text-xs font-semibold text-purple-800">
                {currentLogoObj.badgeTitle}
              </p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-xl bg-white/90 border border-purple-200 flex items-center gap-2 text-xs font-black text-amber-950 shadow-2xs">
            <Coins className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>তোমার কয়েন: {toBengaliNumber(userCoins)}</span>
          </div>
        </div>

        {/* Offline Warning Notice */}
        {!isOnline && (
          <div className="mb-4 p-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-2 shadow-2xs">
            <span>⚠️</span>
            <span>অফলাইন মোড সক্রিয়: নতুন আইটেম বা রং কেনার জন্য ইন্টারনেট সংযোগ প্রয়োজন।</span>
          </div>
        )}

        {/* SECTION 1: Text Colors */}
        <div className="my-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-purple-600" />
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                ১. &ldquo;{activeCharacter.name}&rdquo; লেখার রং পরিবর্তন করো:
              </h4>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {CUSTOM_TEXT_COLORS.map(col => {
              const isUnlocked = unlockedTextColorIds.includes(col.id);
              const isSelected = selectedTextColor === col.hex;
              const canAfford = userCoins >= col.price;

              return (
                <div
                  key={col.id}
                  className={`p-3 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-300'
                      : isUnlocked
                      ? 'border-slate-200 bg-white hover:border-purple-300'
                      : 'border-slate-200 bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-5 h-5 rounded-full border border-white shadow-xs"
                      style={{ backgroundColor: col.hex }}
                    />
                    <span
                      className="text-xs font-bold truncate"
                      style={{ color: col.hex }}
                    >
                      {col.name}
                    </span>
                  </div>

                  {isSelected ? (
                    <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 justify-center py-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>সক্রিয়</span>
                    </div>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => onSelectTextColor(col.hex)}
                      className="w-full py-1 text-xs font-bold rounded-lg bg-purple-600 hover:bg-purple-700 text-white cursor-pointer transition-colors"
                    >
                      রংটি বেছে নাও
                    </button>
                  ) : (
                    <button
                      onClick={() => onUnlockTextColor(col)}
                      disabled={!canAfford}
                      className={`w-full py-1 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-colors ${
                        canAfford
                          ? 'bg-amber-500 hover:bg-amber-600 text-amber-950 cursor-pointer shadow-2xs'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <Lock className="w-3 h-3" />
                      <span>{toBengaliNumber(col.price)} কয়েন</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: Logo Upgrades up to 5,000 Coins! */}
        <div className="my-5 pt-4 border-t border-purple-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-500" />
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                ২. লোগো ও বিশেষ সংস্করণ শপ (১,০০০ থেকে ৫,০০০ কয়েন পর্যন্ত):
              </h4>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CHARACTER_LOGO_UPGRADES.map(item => {
              const isUnlocked = unlockedLogoUpgradeIds.includes(item.id);
              const isSelected = selectedLogoUpgrade === item.id;
              const canAfford = userCoins >= item.price;

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-amber-400 bg-amber-50/80 ring-2 ring-amber-300'
                      : isUnlocked
                      ? 'border-slate-200 bg-white hover:border-amber-300'
                      : 'border-slate-200 bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 rounded-xl bg-white border border-slate-100 shadow-2xs">
                      {item.emojiIcon}
                    </span>
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                        {item.name}
                      </h5>
                      <span className="text-[11px] text-amber-800 font-semibold block mt-0.5">
                        {item.badgeTitle}
                      </span>
                    </div>
                  </div>

                  <div>
                    {isSelected ? (
                      <div className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        <span>সক্রিয়</span>
                      </div>
                    ) : isUnlocked ? (
                      <button
                        onClick={() => onSelectLogoUpgrade(item.id)}
                        className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs cursor-pointer shadow-2xs"
                      >
                        ব্যবহার করো
                      </button>
                    ) : (
                      <button
                        onClick={() => onUnlockLogoUpgrade(item)}
                        disabled={!canAfford}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-colors ${
                          canAfford
                            ? 'bg-amber-500 hover:bg-amber-600 text-amber-950 cursor-pointer shadow-2xs'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>{toBengaliNumber(item.price)} কয়েন</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      </motion.div>
    </div>
  );
};
