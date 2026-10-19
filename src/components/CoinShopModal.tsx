import React from 'react';
import { toBengaliNumber } from '../data/questionEngine';
import { X, Trophy, Coins, Award, Sparkles, Gift, CheckCircle2 } from 'lucide-react';

interface CoinShopModalProps {
  isOpen: boolean;
  coins: number;
  totalCorrect: number;
  totalWrong: number;
  totalRounds: number;
  onClaimDailyGift: () => void;
  canClaimGift: boolean;
  onClose: () => void;
}

export const CoinShopModal: React.FC<CoinShopModalProps> = ({
  isOpen,
  coins,
  totalCorrect,
  totalWrong,
  totalRounds,
  onClaimDailyGift,
  canClaimGift,
  onClose,
}) => {
  if (!isOpen) return null;

  const totalAnswered = totalCorrect + totalWrong;
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  const BADGES = [
    { title: 'ক্ষুদে জ্ঞানবীর', desc: 'প্রথম রাউন্ড সফলভাবে সম্পন্ন', icon: '🎖️', unlocked: totalRounds >= 1 },
    { title: 'সোনার সন্তান', desc: '২০টির বেশি সঠিক উত্তর', icon: '🇧🇩', unlocked: totalCorrect >= 20 },
    { title: 'নূরানী আলো', desc: '৫০টির বেশি সঠিক উত্তর', icon: '🌙', unlocked: totalCorrect >= 50 },
    { title: 'কয়েন মহারাজা', desc: '১০০০ বা ততোধিক কয়েন সংগ্রহ', icon: '👑', unlocked: coins >= 1000 },
    { title: 'সুপার জিনিয়াস', desc: 'শতকরা ৮০% এর বেশি নির্ভুলতা', icon: '⚡', unlocked: accuracy >= 80 && totalAnswered >= 10 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl border border-amber-200 shadow-2xl max-w-xl w-full p-6 sm:p-7 my-8 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-100">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🏆</span>
            <div>
              <h3 className="text-xl font-black text-slate-900 leading-tight">
                পুরস্কার ও অর্জন সংগ্রহশালা
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                তোমার অর্জিত কয়েন, মেডেল ও পরিসংখ্যান
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

        {/* Coin Bank Showcase */}
        <div className="my-4 p-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-amber-950 flex items-center justify-between shadow-xs">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-900/80">
              তোমার মোট কয়েন ভাণ্ডার
            </div>
            <div className="text-3xl font-black tabular-nums mt-0.5 flex items-center gap-2">
              <Coins className="w-7 h-7 text-amber-950 fill-amber-950" />
              <span>{toBengaliNumber(coins)}</span>
            </div>
          </div>

          {/* Daily Gift Claim */}
          <button
            onClick={onClaimDailyGift}
            disabled={!canClaimGift}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs ${
              canClaimGift
                ? 'bg-white hover:bg-amber-50 text-amber-950 cursor-pointer hover:scale-105 active:scale-95'
                : 'bg-amber-300/60 text-amber-900/60 cursor-not-allowed'
            }`}
          >
            <Gift className="w-4 h-4 text-rose-600" />
            <span>{canClaimGift ? 'দৈনিক ১০০ কয়েন উপহার নিন' : 'আজকের উপহার সংগৃহীত'}</span>
          </button>
        </div>

        {/* Overall Player Stats */}
        <div className="grid grid-cols-3 gap-2.5 my-4">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[11px] text-slate-500 font-semibold block">মোট রাউন্ড</span>
            <span className="text-xl font-black text-slate-800 tabular-nums">
              {toBengaliNumber(totalRounds)}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <span className="text-[11px] text-emerald-700 font-semibold block">মোট সঠিক</span>
            <span className="text-xl font-black text-emerald-900 tabular-nums">
              {toBengaliNumber(totalCorrect)}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-center">
            <span className="text-[11px] text-sky-700 font-semibold block">গড় নির্ভুলতা</span>
            <span className="text-xl font-black text-sky-900 tabular-nums">
              {toBengaliNumber(accuracy)}%
            </span>
          </div>
        </div>

        {/* Badges Collection */}
        <div className="my-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            মেডেল ও ব্যাজ সংগ্রহ:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {BADGES.map((b, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border flex items-center gap-3 ${
                  b.unlocked
                    ? 'bg-amber-50/60 border-amber-300 text-amber-950'
                    : 'bg-slate-50/70 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <span className="text-2xl shrink-0 p-1.5 rounded-lg bg-white shadow-2xs">
                  {b.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">{b.title}</span>
                    {b.unlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <span className="text-[11px] block opacity-80 truncate">{b.desc}</span>
                </div>
              </div>
            ))}
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
      </div>
    </div>
  );
};
