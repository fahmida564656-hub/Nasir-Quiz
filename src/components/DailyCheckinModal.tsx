import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Gift, AlertTriangle, Sparkles, Coins, Zap, Clock } from 'lucide-react';
import { toBengaliNumber } from '../data/questionEngine';

interface DailyCheckinModalProps {
  isOpen: boolean;
  claimedDates: string[]; // List of claimed date strings (YYYY-MM-DD)
  fridayMissedDates: string[]; // Dates where Friday was missed
  onClaimDay: (coins: number, dateKey: string) => void;
  onClose: () => void;
}

export const WEEK_DAYS = [
  { index: 0, dayNum: 6, name: 'শনিবার', coins: 100, isFriday: false },
  { index: 1, dayNum: 0, name: 'রবিবার', coins: 100, isFriday: false },
  { index: 2, dayNum: 1, name: 'সোমবার', coins: 100, isFriday: false },
  { index: 3, dayNum: 2, name: 'মঙ্গলবার', coins: 100, isFriday: false },
  { index: 4, dayNum: 3, name: 'বুধবার', coins: 100, isFriday: false },
  { index: 5, dayNum: 4, name: 'বৃহস্পতিবার', coins: 100, isFriday: false },
  { index: 6, dayNum: 5, name: 'শুক্রবার', coins: 1000, isFriday: true },
];

export const DailyCheckinModal: React.FC<DailyCheckinModalProps> = ({
  isOpen,
  claimedDates,
  fridayMissedDates,
  onClaimDay,
  onClose,
}) => {
  // Test day override so the user can easily test Friday & Saturday
  const [testDayOffset, setTestDayOffset] = useState<number | null>(null);

  if (!isOpen) return null;

  const now = new Date();
  if (testDayOffset !== null) {
    now.setDate(now.getDate() + testDayOffset);
  }

  const todayDateStr = now.toISOString().split('T')[0];
  const jsDay = now.getDay(); // 0: Sun, 1: Mon ... 5: Fri, 6: Sat

  // Map to our Saturday-first week index
  const todayWeekIndex = jsDay === 6 ? 0 : jsDay + 1;
  const isTodayFriday = jsDay === 5;
  const isTodaySaturday = jsDay === 6;

  const todayReward = isTodayFriday ? 1000 : 100;
  const isAlreadyClaimedToday = claimedDates.includes(todayDateStr);

  // Check if previous Friday was missed (e.g. today is Saturday and Friday wasn't claimed)
  const prevFriday = new Date(now);
  const daysSinceFriday = (jsDay + 2) % 7;
  prevFriday.setDate(now.getDate() - (daysSinceFriday === 0 ? 7 : daysSinceFriday));
  const prevFridayStr = prevFriday.toISOString().split('T')[0];

  const wasPrevFridayClaimed = claimedDates.includes(prevFridayStr);
  const wasFridayMissed = !wasPrevFridayClaimed && (isTodaySaturday || fridayMissedDates.includes(prevFridayStr));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto animate-fade-in">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-900 border-2 border-amber-400/80 rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-7 my-8 relative overflow-hidden text-slate-100"
      >
        {/* Top Glow Strip */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-500 via-amber-400 to-red-500 shadow-lg shadow-amber-400/30" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Lockup */}
        <div className="text-center my-2">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/20 mb-2">
            ⚡
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            সুপারহিরো ডেইলি চেক-ইন
          </h3>
          <p className="text-xs text-slate-400 font-semibold mt-1">
            সারা জীবন প্রতিদিন ১০০ কয়েন · প্রতি শুক্রবার ১,০০০ মেগা কয়েন!
          </p>
        </div>

        {/* Missed Friday Alert Notice if Saturday arrived and Friday was missed */}
        {wasFridayMissed && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="my-3 p-3.5 rounded-2xl bg-red-950/80 border-2 border-red-500/80 text-red-200 flex items-start gap-3 shadow-lg shadow-red-500/10"
          >
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-black uppercase text-red-300 tracking-wide">
                নেওয়া হয়নি, লস হয়েছে! 😢
              </div>
              <p className="text-xs text-red-100 font-medium mt-0.5 leading-snug">
                গত শুক্রবারের ১,০০০ কয়েন সময়মতো নেওয়া হয়নি। শুক্রবারে না নিলে শনিবারে তা আর পাওয়া যায় না। পরবর্তী শুক্রবার যেন মিস না হয়!
              </p>
            </div>
          </motion.div>
        )}

        {/* 7 Days of the Week Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4">
          {WEEK_DAYS.map((day) => {
            const isToday = day.index === todayWeekIndex;
            const isPastFridayMissed = day.isFriday && wasFridayMissed;

            return (
              <div
                key={day.index}
                className={`p-3 rounded-2xl border-2 text-center transition-all relative flex flex-col justify-between ${
                  day.isFriday
                    ? 'col-span-2 sm:col-span-2 border-amber-400 bg-gradient-to-br from-amber-950/70 via-slate-900 to-yellow-950/50 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                    : isToday
                    ? 'border-blue-400 bg-blue-950/70 shadow-lg shadow-blue-500/20'
                    : 'border-slate-800 bg-slate-950/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-300">
                      {day.name}
                    </span>
                    {day.isFriday && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
                        মেগা শুক্রবার!
                      </span>
                    )}
                  </div>

                  <div className="text-2xl my-1.5">
                    {day.isFriday ? '👑' : '🪙'}
                  </div>

                  <div className="text-sm sm:text-base font-black text-amber-300 tabular-nums">
                    +{toBengaliNumber(day.coins)} কয়েন
                  </div>
                </div>

                {/* Status Badges */}
                <div className="mt-2">
                  {isPastFridayMissed ? (
                    <span className="text-[10px] font-black px-2 py-0.5 bg-red-600 text-white rounded-full block animate-pulse">
                      নেওয়া হয়নি লস হয়েছে
                    </span>
                  ) : isToday ? (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full block ${
                      isAlreadyClaimedToday
                        ? 'bg-emerald-600 text-white'
                        : 'bg-blue-500 text-white animate-bounce'
                    }`}>
                      {isAlreadyClaimedToday ? '✓ সংগৃহীত' : 'আজকের দিন!'}
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-500">
                      সপ্তাহের অংশ
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Claim Today CTA */}
        <div className="mt-5 pt-3 border-t border-slate-800">
          <button
            onClick={() => onClaimDay(todayReward, todayDateStr)}
            disabled={isAlreadyClaimedToday}
            className={`w-full py-4 px-6 rounded-2xl font-black text-base shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              !isAlreadyClaimedToday
                ? isTodayFriday
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:brightness-110 text-slate-950 ring-2 ring-amber-300 active:scale-95 shadow-amber-500/30'
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:brightness-110 text-white active:scale-95 shadow-blue-500/30'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <Gift className="w-5 h-5 text-amber-300" />
            <span>
              {!isAlreadyClaimedToday
                ? isTodayFriday
                  ? 'শুক্রবার জুমার ১,০০০ কয়েন সংগ্রহ করো! 🌟'
                  : `আজকের +${toBengaliNumber(todayReward)} কয়েন সংগ্রহ করো!`
                : 'আজকের কয়েন সংগ্রহ সম্পন্ন হয়েছে! কাল আবার এসো'}
            </span>
          </button>
        </div>

        {/* Quick Testing Bar (Allows instant previewing Friday & Saturday) */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>লাইভ ডেট সিমুলেটর (টেস্টিং):</span>
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={() => {
                // Find offset to Friday (jsDay 5)
                const diff = (5 - jsDay + 7) % 7;
                setTestDayOffset(diff);
              }}
              className="px-2 py-0.5 rounded-md bg-amber-950/80 border border-amber-500 text-amber-300 font-bold hover:bg-amber-900 cursor-pointer"
            >
              শুক্রবার পরীক্ষা (১০০০)
            </button>
            <button
              onClick={() => {
                // Find offset to Saturday (jsDay 6)
                const diff = (6 - jsDay + 7) % 7;
                setTestDayOffset(diff);
              }}
              className="px-2 py-0.5 rounded-md bg-red-950/80 border border-red-500 text-red-300 font-bold hover:bg-red-900 cursor-pointer"
            >
              শনিবার পরীক্ষা (লস হয়েছে)
            </button>
            {testDayOffset !== null && (
              <button
                onClick={() => setTestDayOffset(null)}
                className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
              >
                রিসেট
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
