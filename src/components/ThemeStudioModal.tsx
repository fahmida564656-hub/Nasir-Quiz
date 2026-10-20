import React from 'react';
import { ThemeId, CardFrameStyle, ThemeConfig } from '../types/game';
import { THEMES, FRAME_STYLES } from '../data/themes';
import { toBengaliNumber } from '../data/questionEngine';
import { X, Palette, Sparkles, Check, Lock, Coins, Frame, Zap, TreePine } from 'lucide-react';

interface ThemeStudioModalProps {
  isOpen: boolean;
  activeThemeId: ThemeId;
  unlockedThemeIds: ThemeId[];
  activeFrameStyle: CardFrameStyle;
  unlockedFrameStyles: CardFrameStyle[];
  userCoins: number;
  autoTreeLevel: number;
  isOnline?: boolean;
  onSelectTheme: (themeId: ThemeId) => void;
  onUnlockTheme: (theme: ThemeConfig) => void;
  onSelectFrame: (style: CardFrameStyle) => void;
  onUpgradeAutoTree: () => void;
  onClose: () => void;
}

export const ThemeStudioModal: React.FC<ThemeStudioModalProps> = ({
  isOpen,
  activeThemeId,
  unlockedThemeIds,
  activeFrameStyle,
  unlockedFrameStyles,
  userCoins,
  autoTreeLevel,
  isOnline = true,
  onSelectTheme,
  onUnlockTheme,
  onSelectFrame,
  onUpgradeAutoTree,
  onClose,
}) => {
  if (!isOpen) return null;

  const treeCost = (autoTreeLevel + 1) * 250;
  const treeRate = (autoTreeLevel + 1) * 10;
  const canAffordTree = userCoins >= treeCost;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl border-2 border-amber-300 shadow-2xl max-w-2xl w-full p-6 sm:p-7 my-8 relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-100">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🎨</span>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                রং ও ডিজাইন পরিবর্তন টুলস
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                কয়েন দিয়ে তোমার পছন্দের সুন্দর রঙিন থিম ও ডিজাইন সাজাও
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Coins Header */}
        <div className="my-3 px-4 py-2.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs font-bold text-amber-900">
          <span>তোমার বর্তমান কয়েন:</span>
          <div className="flex items-center gap-1.5 text-sm font-black">
            <Coins className="w-4 h-4 text-amber-600 fill-amber-600" />
            <span>{toBengaliNumber(userCoins)} কয়েন</span>
          </div>
        </div>

        {/* Offline Warning Notice */}
        {!isOnline && (
          <div className="mb-4 p-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-2 shadow-2xs">
            <span>⚠️</span>
            <span>অফলাইন মোড: নতুন রঙের থিম কেনার জন্য ইন্টারনেট সংযোগ প্রয়োজন।</span>
          </div>
        )}

        {/* SECTION 1: Color Themes */}
        <div className="my-5">
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-4 h-4 text-emerald-600" />
            <h4 className="font-extrabold text-sm sm:text-base text-slate-800">
              ১. আকর্ষণীয় রঙের থিম নির্বাচন:
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {THEMES.map(theme => {
              const isUnlocked = unlockedThemeIds.includes(theme.id);
              const isActive = theme.id === activeThemeId;
              const canAfford = userCoins >= theme.coinPrice;

              return (
                <div
                  key={theme.id}
                  className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-50/70 shadow-xs ring-2 ring-emerald-300'
                      : isUnlocked
                      ? 'border-slate-200 hover:border-amber-300 bg-white'
                      : 'border-slate-200 bg-slate-50/60 opacity-90'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-xs shrink-0 border"
                      style={{ backgroundColor: `${theme.previewColor}18`, borderColor: theme.previewColor }}
                    >
                      {theme.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-900">{theme.name}</span>
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-white shadow-2xs"
                          style={{ backgroundColor: theme.previewColor }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{theme.tagline}</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    {isActive ? (
                      <div className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                        <Check className="w-3.5 h-3.5" />
                        <span>বর্তমানে সক্রিয়</span>
                      </div>
                    ) : isUnlocked ? (
                      <button
                        onClick={() => onSelectTheme(theme.id)}
                        className="w-full py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer transition-colors"
                      >
                        রং পরিবর্তন করো
                      </button>
                    ) : (
                      <button
                        onClick={() => onUnlockTheme(theme)}
                        disabled={!canAfford}
                        className={`w-full py-1.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors ${
                          canAfford
                            ? 'bg-amber-500 hover:bg-amber-600 text-amber-950 cursor-pointer shadow-2xs'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>{toBengaliNumber(theme.coinPrice)} কয়েন দিয়ে আনলক</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: Card Frame Styles */}
        <div className="my-5 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <Frame className="w-4 h-4 text-purple-600" />
            <h4 className="font-extrabold text-sm sm:text-base text-slate-800">
              ২. ফ্রেম ও কার্ডের নকশা পরিবর্তন:
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {FRAME_STYLES.map(style => {
              const isActive = style.id === activeFrameStyle;
              return (
                <button
                  key={style.id}
                  onClick={() => onSelectFrame(style.id)}
                  className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    isActive
                      ? 'border-purple-500 bg-purple-50 text-purple-950 font-bold ring-2 ring-purple-300'
                      : 'border-slate-200 hover:border-purple-300 bg-white text-slate-700'
                  }`}
                >
                  <span className="text-2xl">{style.icon}</span>
                  <span className="text-xs font-bold leading-tight">{style.name}</span>
                  {isActive && <Check className="w-3.5 h-3.5 text-purple-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: Auto-Coin Tree Generator */}
        <div className="my-5 pt-4 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-3xl shadow-2xs shrink-0">
                🌳
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-sm text-emerald-950">
                    স্বয়ংক্রিয় কয়েন গাছ (Auto-Coin Tool)
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold">
                    লেভেল {toBengaliNumber(autoTreeLevel)}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                  এই গাছটি খেলায় নিজে নিজে প্রতি মিনিটে +{toBengaliNumber(treeRate)} বোনাস কয়েন তৈরি করে!
                </p>
              </div>
            </div>

            <button
              onClick={onUpgradeAutoTree}
              disabled={!canAffordTree}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs shrink-0 ${
                canAffordTree
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:brightness-110 cursor-pointer active:scale-95'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>আপগ্রেড (+{toBengaliNumber(treeCost)} কয়েন)</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer transition-colors"
          >
            সম্পন্ন
          </button>
        </div>
      </div>
    </div>
  );
};
