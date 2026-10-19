import React from 'react';
import { AnswerRecord, Character } from '../types/game';
import { toBengaliNumber } from '../data/questionEngine';
import { Trophy, Coins, Star, CheckCircle2, XCircle, ArrowRight, RotateCcw, Compass, Sparkles } from 'lucide-react';

interface RoundSummaryModalProps {
  isOpen: boolean;
  answers: AnswerRecord[];
  activeCharacter: Character;
  currentLevel: number;
  onNextRound: () => void;
  onReplayRound: () => void;
  onChangeCategory: () => void;
  onOpenSuperheroStats?: () => void;
}

export const RoundSummaryModal: React.FC<RoundSummaryModalProps> = ({
  isOpen,
  answers,
  activeCharacter,
  currentLevel,
  onNextRound,
  onReplayRound,
  onChangeCategory,
  onOpenSuperheroStats,
}) => {
  if (!isOpen) return null;

  const totalQuestions = answers.length || 10;
  const correctCount = answers.filter(a => a.isCorrect).length;
  const wrongCount = totalQuestions - correctCount;
  const accuracy = Math.round((correctCount / totalQuestions) * 100);

  // Rewards calculation as explicitly requested by user (500 or 400 coins etc.)
  let earnedCoins = 200;
  let starCount = 1;
  let title = 'সাহসী ক্ষুদে অভিযাত্রী';

  if (correctCount === 10) {
    earnedCoins = 500;
    starCount = 3;
    title = 'সোনার বাংলার ক্ষুদে জ্ঞানবীর! 🌟';
  } else if (correctCount >= 8) {
    earnedCoins = 400;
    starCount = 2;
    title = 'মেধাবী রত্ন ও চ্যাম্পিয়ন! ⭐';
  } else if (correctCount >= 6) {
    earnedCoins = 300;
    starCount = 2;
    title = 'উজ্জ্বল প্রতিভা ও বুদ্ধিমান! ✨';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl border-2 border-amber-300 shadow-2xl max-w-xl w-full p-6 sm:p-8 my-8 relative overflow-hidden">
        {/* Decorative Top Accent Banner */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-emerald-500 via-amber-400 to-teal-500" />

        {/* Header Celebration */}
        <div className="text-center mt-2">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-300 text-4xl shadow-sm mb-2">
            🏆
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            রাউন্ড সমাপ্ত! মহা পুরস্কার 🎁
          </h2>
          <p className="text-sm font-semibold text-emerald-800 mt-1">
            {title}
          </p>

          {/* Stars */}
          <div className="flex items-center justify-center gap-1.5 my-3">
            {[1, 2, 3].map(i => (
              <Star
                key={i}
                className={`w-7 h-7 sm:w-8 sm:h-8 transition-transform ${
                  i <= starCount
                    ? 'text-amber-400 fill-amber-400 drop-shadow-sm scale-110'
                    : 'text-slate-200 fill-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Character Victory Speech */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center gap-3 my-4">
          <div className="text-3xl shrink-0 p-2 rounded-xl bg-white border border-amber-200">
            {activeCharacter.avatarEmoji}
          </div>
          <div>
            <div className="text-xs font-bold text-amber-900">
              {activeCharacter.name} বলছেন:
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-800 italic mt-0.5">
              &ldquo;{activeCharacter.dialogue.victory}&rdquo;
            </p>
          </div>
        </div>

        {/* Performance Stats Cards */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 my-4">
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-700 text-xs font-bold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>সঠিক</span>
            </div>
            <div className="text-2xl font-black text-emerald-900 tabular-nums">
              {toBengaliNumber(correctCount)}টি
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-center">
            <div className="flex items-center justify-center gap-1 text-rose-700 text-xs font-bold mb-1">
              <XCircle className="w-3.5 h-3.5" />
              <span>ভুল</span>
            </div>
            <div className="text-2xl font-black text-rose-900 tabular-nums">
              {toBengaliNumber(wrongCount)}টি
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-center">
            <div className="flex items-center justify-center gap-1 text-amber-800 text-xs font-bold mb-1">
              <Coins className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              <span>পুরস্কার</span>
            </div>
            <div className="text-2xl font-black text-amber-900 tabular-nums">
              +{toBengaliNumber(earnedCoins)}
            </div>
          </div>
        </div>

        {/* Detailed Question Review Accordion / List */}
        <div className="my-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            ১০টি প্রশ্নের মূল্যায়ন বিবরণী:
          </h3>
          <div className="max-h-40 overflow-y-auto space-y-2 pr-1 custom-scrollbar text-xs">
            {answers.map((ans, idx) => (
              <div
                key={ans.questionId}
                className={`p-2.5 rounded-xl border flex items-start gap-2 ${
                  ans.isCorrect
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50/60 border-rose-200 text-rose-950'
                }`}
              >
                <span className="font-bold shrink-0 mt-0.5">
                  {toBengaliNumber(idx + 1)}.
                </span>
                <div className="flex-1">
                  <div className="font-semibold">{ans.questionText}</div>
                  {!ans.isCorrect && (
                    <div className="text-[11px] text-emerald-800 font-medium mt-1">
                      সঠিক উত্তর: {ans.options[ans.correctIndex]}
                    </div>
                  )}
                </div>
                {ans.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 mt-6">
          {/* Primary CTA: Next 10 Questions */}
          <button
            onClick={onNextRound}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-base sm:text-lg shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>পরবর্তী ১০টি প্রশ্ন খেলুন</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Secondary CTAs */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={onReplayRound}
              className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>আবার এই ১০টি খেলুন</span>
            </button>
            <button
              onClick={onChangeCategory}
              className="py-2.5 px-4 rounded-xl border border-amber-300 bg-amber-50/70 hover:bg-amber-100/70 text-amber-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 text-amber-700" />
              <span>বিষয় পরিবর্তন</span>
            </button>
          </div>

          {onOpenSuperheroStats && (
            <button
              onClick={onOpenSuperheroStats}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer border border-cyan-500/40"
            >
              <span>📊</span>
              <span>সুপারহিরো সঠিক বনাম ভুল গ্রাফ দেখুন (recharts)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
