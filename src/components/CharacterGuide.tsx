import React from 'react';
import { motion } from 'framer-motion';
import { Character } from '../types/game';
import { MessageCircle } from 'lucide-react';

interface CharacterGuideProps {
  character: Character;
  state: 'idle' | 'correct' | 'wrong' | 'hint';
  hintText?: string;
  customTextColor?: string;
  customLogoEmoji?: string;
  customBadgeTitle?: string;
  onOpenCharacterSelect: () => void;
}

export const CharacterGuide: React.FC<CharacterGuideProps> = ({
  character,
  state,
  hintText,
  customTextColor,
  customLogoEmoji,
  customBadgeTitle,
  onOpenCharacterSelect,
}) => {
  let dialogueText = character.dialogue.greeting;
  let emotionBg = 'bg-white border-amber-200 text-slate-800';

  if (state === 'correct') {
    dialogueText = character.dialogue.correct;
    emotionBg = 'bg-emerald-50 border-emerald-300 text-emerald-950';
  } else if (state === 'wrong') {
    dialogueText = character.dialogue.wrong;
    emotionBg = 'bg-rose-50 border-rose-300 text-rose-950';
  } else if (state === 'hint' && hintText) {
    dialogueText = `💡 ইঙ্গিত: "${hintText}"`;
    emotionBg = 'bg-amber-50 border-amber-300 text-amber-950';
  }

  const displayedEmoji = customLogoEmoji || character.avatarEmoji;
  const displayedBadge = customBadgeTitle || character.badge;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white/80 border border-amber-200/80 shadow-xs"
    >
      {/* Avatar Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpenCharacterSelect}
        className="relative shrink-0 focus:outline-hidden cursor-pointer"
        title="চরিত্র পরিবর্তন করতে ক্লিক করো"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-400 flex items-center justify-center text-3xl sm:text-4xl shadow-sm">
          {displayedEmoji}
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[10px] text-white">
          ✓
        </div>
      </motion.button>

      {/* Speech Bubble */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-1.5">
            <span
              className="font-bold text-sm sm:text-base leading-none transition-colors"
              style={{ color: customTextColor || '#0f172a' }}
            >
              {character.name}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold">
              {displayedBadge}
            </span>
          </div>
          <button
            onClick={onOpenCharacterSelect}
            className="text-[11px] text-emerald-700 hover:text-emerald-800 font-bold cursor-pointer underline"
          >
            পরিবর্তন
          </button>
        </div>

        <motion.div
          key={dialogueText}
          initial={{ scale: 0.98, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className={`relative px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all ${emotionBg}`}
        >
          <div className="flex items-start gap-1.5">
            <MessageCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-70" />
            <p className="leading-relaxed">{dialogueText}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
