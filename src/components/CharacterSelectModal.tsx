import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Character } from '../types/game';
import { CHARACTERS } from '../data/characters';
import { toBengaliNumber } from '../data/questionEngine';
import { X, Check, Lock, Coins, Sparkles, Search } from 'lucide-react';

interface CharacterSelectModalProps {
  isOpen: boolean;
  activeCharacterId: string;
  unlockedCharacterIds: string[];
  userCoins: number;
  onSelectCharacter: (char: Character) => void;
  onUnlockCharacter: (char: Character) => void;
  onClose: () => void;
}

export const CharacterSelectModal: React.FC<CharacterSelectModalProps> = ({
  isOpen,
  activeCharacterId,
  unlockedCharacterIds,
  userCoins,
  onSelectCharacter,
  onUnlockCharacter,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredCharacters = CHARACTERS.filter(c => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.subtitle.toLowerCase().includes(q) ||
      c.badge.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-900 border-2 border-indigo-500/80 rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-7 my-8 relative text-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🦸‍♂️</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  সুপারহিরো ক্যারেক্টার নির্বাচন
                </h3>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950">
                  {toBengaliNumber(CHARACTERS.length)} জন হিরো
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                তোমার পছন্দের সঙ্গীর সাথে জ্ঞানের রোমাঞ্চকর অভিযান শুরু করো
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Coin Balance & Search Bar */}
        <div className="my-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="যেকোনো সুপারহিরো খুঁজুন (যেমন: নাসির, রোবট, বাঘ...)"
              className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-hidden focus:border-cyan-400"
            />
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-amber-950/60 border border-amber-500/50 flex items-center justify-between sm:justify-center gap-2 text-xs font-black text-amber-300 shrink-0">
            <span>কয়েন:</span>
            <div className="flex items-center gap-1">
              <Coins className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{toBengaliNumber(userCoins)}</span>
            </div>
          </div>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4 max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
          {filteredCharacters.map(char => {
            const isUnlocked = unlockedCharacterIds.includes(char.id);
            const isSelected = char.id === activeCharacterId;
            const canAfford = userCoins >= char.coinPrice;

            return (
              <div
                key={char.id}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/70 shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400'
                    : isUnlocked
                    ? 'border-slate-800 hover:border-slate-700 bg-slate-850/80'
                    : 'border-slate-800/80 bg-slate-950/60 opacity-80'
                }`}
              >
                <div>
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 flex items-center justify-center text-3xl shadow-sm shrink-0">
                      {char.avatarEmoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-black text-white text-base leading-tight">
                          {char.name}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 font-semibold shrink-0 border border-slate-700">
                          {char.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium mt-0.5">
                        {char.title}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                        {char.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Character Greeting Quote */}
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 italic">
                    &ldquo;{char.dialogue.greeting}&rdquo;
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  {isSelected ? (
                    <div className="flex items-center gap-1.5 text-xs font-black text-cyan-400">
                      <Check className="w-4 h-4" />
                      <span>বর্তমান সঙ্গী</span>
                    </div>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => {
                        onSelectCharacter(char);
                        onClose();
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-md cursor-pointer transition-colors"
                    >
                      সঙ্গী হিসেবে বেছে নাও
                    </button>
                  ) : (
                    <button
                      onClick={() => onUnlockCharacter(char)}
                      disabled={!canAfford}
                      className={`w-full py-2 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-colors ${
                        canAfford
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer shadow-md'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                      }`}
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>{toBengaliNumber(char.coinPrice)} কয়েন দিয়ে আনলক করো</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      </motion.div>
    </div>
  );
};
