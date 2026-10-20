import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question, CardFrameStyle, ThemeConfig } from '../types/game';
import { toBengaliNumber } from '../data/questionEngine';
import { Volume2, Sparkles, CheckCircle2, XCircle, ArrowRight, Lightbulb, SplitSquareVertical } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { FRAME_STYLES } from '../data/themes';

interface QuestionCardProps {
  question: Question;
  questionIndex: number; // 0 to 9
  totalQuestions: number; // 10
  selectedAnswer: number | null;
  activeTheme: ThemeConfig;
  activeFrameStyle: CardFrameStyle;
  onSelectAnswer: (index: number) => void;
  onNextQuestion: () => void;
  onReadAloud: (text: string) => void;
  onUseHint: () => void;
  onUseFiftyFifty: () => void;
  hintUsed: boolean;
  fiftyFiftyUsed: boolean;
  eliminatedOptions: number[];
}

const OPTION_PREFIXES = ['ক', 'খ', 'গ', 'ঘ'];

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  activeTheme,
  activeFrameStyle,
  onSelectAnswer,
  onNextQuestion,
  onReadAloud,
  onUseHint,
  onUseFiftyFifty,
  hintUsed,
  fiftyFiftyUsed,
  eliminatedOptions,
}) => {
  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === question.correctIndex;
  const currentCategory = CATEGORIES.find(c => c.id === question.category) || CATEGORIES[0];
  const frameConfig = FRAME_STYLES.find(f => f.id === activeFrameStyle) || FRAME_STYLES[0];

  const handleReadQuestion = () => {
    const textToRead = `${question.question}. অপশন ক: ${question.options[0]}. অপশন খ: ${question.options[1]}. অপশন গ: ${question.options[2]}. অপশন ঘ: ${question.options[3]}`;
    onReadAloud(textToRead);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 18, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -18, scale: 0.99 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={`p-5 sm:p-7 transition-all bg-white dark:bg-slate-900/95 border-2 border-slate-200 dark:border-indigo-500/40 text-slate-900 dark:text-white shadow-xl ${frameConfig.className}`}
      >
        {/* Top Meta Bar: Category, Progress & Tools */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          {/* Category Badge */}
          <div className="flex items-center gap-2">
            <span className="text-xl">{currentCategory.icon}</span>
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
              {currentCategory.name}
            </span>
          </div>

          {/* Progress Text & Lifelines */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 50:50 Lifeline Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onUseFiftyFifty}
              disabled={fiftyFiftyUsed || isAnswered}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                fiftyFiftyUsed || isAnswered
                  ? 'opacity-40 bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 cursor-pointer shadow-2xs'
              }`}
              title="ভুল দুটি অপশন মুছে ফেলুন"
            >
              <SplitSquareVertical className="w-3.5 h-3.5" />
              <span>৫০:৫০</span>
            </motion.button>

            {/* Hint Lifeline Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onUseHint}
              disabled={hintUsed || isAnswered}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                hintUsed || isAnswered
                  ? 'opacity-40 bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 cursor-pointer shadow-2xs'
              }`}
              title="ইঙ্গিত বা ক্লু দেখুন"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>ইঙ্গিত</span>
            </motion.button>

            {/* Read Aloud Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReadQuestion}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 cursor-pointer transition-all shadow-2xs"
              title="প্রশ্নটি বাংলায় পড়ে শোনাও"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">শুনুন</span>
            </motion.button>

            {/* Question Index Badge */}
            <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs sm:text-sm font-black border border-emerald-300">
              প্রশ্ন {toBengaliNumber(questionIndex + 1)} / {toBengaliNumber(totalQuestions)}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-black/5 rounded-full h-2 my-4 overflow-hidden">
          <motion.div
            className="h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: activeTheme.previewColor }}
          />
        </div>

        {/* Question Text */}
        <div className="my-4 sm:my-6">
          <h2 className="text-lg sm:text-2xl font-black leading-snug tracking-tight">
            {question.question}
          </h2>
        </div>

        {/* 4 Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-5">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const isTargetCorrect = idx === question.correctIndex;
            const isEliminated = eliminatedOptions.includes(idx);

            let optionStyle = 'bg-white/90 hover:bg-black/5 border-slate-200 text-slate-800 hover:border-amber-300';
            let prefixStyle = 'bg-slate-100 text-slate-700';

            if (isAnswered) {
              if (isTargetCorrect) {
                optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-300';
                prefixStyle = 'bg-emerald-500 text-white';
              } else if (isSelected && !isTargetCorrect) {
                optionStyle = 'bg-rose-50 border-rose-500 text-rose-950 line-through opacity-80';
                prefixStyle = 'bg-rose-500 text-white';
              } else {
                optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-50';
                prefixStyle = 'bg-slate-200 text-slate-400';
              }
            }

            if (isEliminated) {
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/40 text-slate-300 opacity-30 select-none flex items-center gap-3 cursor-not-allowed"
                >
                  <span className="w-8 h-8 rounded-xl bg-slate-200/50 flex items-center justify-center text-xs font-bold">
                    {OPTION_PREFIXES[idx]}
                  </span>
                  <span className="line-through text-sm">{option}</span>
                </div>
              );
            }

            return (
              <motion.button
                key={idx}
                whileHover={!isAnswered ? { scale: 1.015, y: -2 } : {}}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
                onClick={() => !isAnswered && onSelectAnswer(idx)}
                disabled={isAnswered}
                className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left flex items-center gap-3 transition-all duration-200 shadow-2xs group ${optionStyle} ${
                  !isAnswered ? 'cursor-pointer hover:shadow-xs' : ''
                }`}
              >
                <span
                  className={`w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl flex items-center justify-center font-bold text-sm sm:text-base transition-colors ${prefixStyle}`}
                >
                  {OPTION_PREFIXES[idx]}
                </span>
                <span className="flex-1 text-sm sm:text-base font-semibold leading-relaxed">
                  {option}
                </span>
                {isAnswered && isTargetCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswered && isSelected && !isTargetCorrect && (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Answer Feedback & Educational Professional Explanation with smooth animation */}
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`mt-6 p-5 sm:p-6 rounded-3xl border-2 transition-all ${
              isCorrect
                ? 'bg-emerald-950/90 border-emerald-400/80 text-emerald-100 shadow-xl shadow-emerald-950/40'
                : 'bg-slate-950/90 border-amber-500/80 text-amber-100 shadow-xl shadow-amber-950/40'
            }`}
          >
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{isCorrect ? '🌟' : '💡'}</span>
                <div>
                  <h4 className="font-black text-sm sm:text-base leading-tight">
                    {isCorrect ? (
                      <span className="text-emerald-300">চমৎকার! তোমার উত্তর ১০০% সঠিক হয়েছে!</span>
                    ) : (
                      <span className="text-amber-300">
                        সঠিক উত্তর: &ldquo;{question.options[question.correctIndex]}&rdquo;
                      </span>
                    )}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-semibold block mt-0.5">
                    প্রামাণ্য তথ্য ও সঠিক বিশ্লেষণ
                  </span>
                </div>
              </div>

              <span className={`text-[11px] font-black px-2.5 py-1 rounded-full border ${
                isCorrect
                  ? 'bg-emerald-900/80 text-emerald-200 border-emerald-500/60'
                  : 'bg-amber-900/80 text-amber-200 border-amber-500/60'
              }`}>
                {isCorrect ? 'অর্জন +১০ পয়েন্ট' : 'পুনঃপাঠ আবশ্যক'}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-medium leading-relaxed text-slate-200">
              {question.explanation}
            </p>

            {question.funFact && (
              <div className="mt-3.5 pt-3 border-t border-white/10 text-xs text-amber-300/90 flex items-start gap-2 font-medium">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-amber-200 font-bold">জ্ঞানকোষ ও বিশেষ তথ্য:</strong> {question.funFact}
                </span>
              </div>
            )}

            {/* Next Button */}
            <div className="mt-5 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onNextQuestion}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm sm:text-base shadow-lg transition-all cursor-pointer ${activeTheme.primaryButton}`}
              >
                <span>{questionIndex === totalQuestions - 1 ? 'ফলাফল ও মহা পুরস্কার দেখুন 🏆' : 'পরবর্তী প্রশ্ন →'}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
