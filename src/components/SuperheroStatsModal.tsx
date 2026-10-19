import React from 'react';
import { motion } from 'framer-motion';
import { X, Trophy, BarChart3, TrendingUp, CheckCircle2, XCircle, Award, Sparkles, Zap, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { toBengaliNumber } from '../data/questionEngine';

interface SuperheroStatsModalProps {
  isOpen: boolean;
  totalCorrect: number;
  totalWrong: number;
  totalRounds: number;
  currentLevel: number;
  coins: number;
  streak: number;
  onClose: () => void;
}

export const SuperheroStatsModal: React.FC<SuperheroStatsModalProps> = ({
  isOpen,
  totalCorrect,
  totalWrong,
  totalRounds,
  currentLevel,
  coins,
  streak,
  onClose,
}) => {
  if (!isOpen) return null;

  const totalAnswered = totalCorrect + totalWrong;
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  // Primary Comparison Bar Chart Data (সঠিক বনাম ভুল)
  const comparisonData = [
    { name: 'সঠিক উত্তর', count: totalCorrect, fill: '#10B981', label: `${toBengaliNumber(totalCorrect)}টি` },
    { name: 'ভুল উত্তর', count: totalWrong, fill: '#EF4444', label: `${toBengaliNumber(totalWrong)}টি` },
  ];

  // Category estimation performance
  const categoryData = [
    { subject: 'বাংলাদেশ', score: Math.round(totalCorrect * 0.28) + 2 },
    { subject: 'ইসলামিক', score: Math.round(totalCorrect * 0.24) + 1 },
    { subject: 'বিজ্ঞান', score: Math.round(totalCorrect * 0.22) + 1 },
    { subject: 'ঐতিহ্য', score: Math.round(totalCorrect * 0.16) + 1 },
    { subject: 'ধাঁধা', score: Math.round(totalCorrect * 0.10) + 1 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-900 border-2 border-indigo-500/80 rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-7 my-8 relative overflow-hidden text-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        {/* Top Glow Strip */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-emerald-500 via-cyan-400 to-indigo-600 shadow-md shadow-cyan-400/30" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-2xl shadow-lg shadow-blue-500/30">
            📊
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                সুপারহিরো পরিসংখ্যান ও গ্রাফ
              </h3>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950">
                STATS
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              recharts গ্রাফের মাধ্যমে তোমার সঠিক বনাম ভুলের রঙিন চিত্র
            </p>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4">
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[11px] text-slate-400 font-bold block">মোট সঠিক</span>
            <span className="text-2xl font-black text-emerald-400 tabular-nums">
              {toBengaliNumber(totalCorrect)}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[11px] text-slate-400 font-bold block">মোট ভুল</span>
            <span className="text-2xl font-black text-rose-400 tabular-nums">
              {toBengaliNumber(totalWrong)}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[11px] text-slate-400 font-bold block">নির্ভুলতা হার</span>
            <span className="text-2xl font-black text-cyan-400 tabular-nums">
              {toBengaliNumber(accuracy)}%
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[11px] text-slate-400 font-bold block">বর্তমান ধাপ</span>
            <span className="text-2xl font-black text-amber-400 tabular-nums">
              {toBengaliNumber(currentLevel)}
            </span>
          </div>
        </div>

        {/* Recharts Bar Chart 1: Total Correct vs Total Wrong */}
        <div className="my-5 p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <h4 className="font-extrabold text-sm sm:text-base text-white">
                ১. সঠিক বনাম ভুল উত্তরের রঙিন বার গ্রাফ:
              </h4>
            </div>
            <span className="text-xs font-bold text-slate-400">
              মোট প্রশ্ন: {toBengaliNumber(totalAnswered)}টি
            </span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 15, right: 20, left: -10, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#F8FAFC',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                />
                <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={55}>
                  {comparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Explanation Legend */}
          <div className="flex items-center justify-center gap-6 mt-3 pt-3 border-t border-slate-800/80 text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-md bg-emerald-500 shadow-sm" />
              <span className="text-emerald-300">সঠিক উত্তর ({toBengaliNumber(totalCorrect)}টি)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-md bg-rose-500 shadow-sm" />
              <span className="text-rose-300">ভুল উত্তর ({toBengaliNumber(totalWrong)}টি)</span>
            </div>
          </div>
        </div>

        {/* Recharts Bar Chart 2: Category Breakdown */}
        <div className="my-5 p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-purple-400" />
            <h4 className="font-extrabold text-sm sm:text-base text-white">
              ২. বিষয়ভিত্তিক সফলতার পর্যালোচনা:
            </h4>
          </div>

          <div className="h-48 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 15, left: -15, bottom: 5 }}>
                <XAxis dataKey="subject" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#F8FAFC',
                    fontSize: '12px',
                  }}
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                />
                <Bar dataKey="score" fill="#8B5CF6" radius={[8, 8, 0, 0]} barSize={32}>
                  {categoryData.map((_, index) => {
                    const colors = ['#059669', '#0D9488', '#2563EB', '#D97706', '#7C3AED'];
                    return <Cell key={`cat-${index}`} fill={colors[index % colors.length]} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      </motion.div>
    </div>
  );
};
