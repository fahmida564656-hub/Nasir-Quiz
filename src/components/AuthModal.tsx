import React, { useState } from 'react';
import { UserProfile } from '../types/game';
import { toBengaliNumber } from '../data/questionEngine';
import { X, Gift, Sparkles, Check, User, LogIn, UserPlus, LogOut, Cloud, ShieldCheck } from 'lucide-react';
import { auth, googleProvider, signInWithPopup, signOut } from '../lib/firebase';
import { NasirQuizLogo } from './NasirQuizLogo';

interface AuthModalProps {
  isOpen: boolean;
  currentUser: UserProfile | null;
  onLogin: (name: string, avatar: string, grade: string, email?: string, uid?: string) => Promise<void> | void;
  onLogout: () => void;
  onClose: () => void;
}

const AVATARS = ['🦸‍♂️', '🦸‍♀️', '⚡', '👑', '🤖', '🐅', '🧕', '🚀', '🌟', '🦁', '🦉', '👦', '👧'];
const GRADES = ['শিশু শ্রেণি (Nursery/KG)', '১ম শ্রেণি', '২য় শ্রেণি', '৩য় শ্রেণি', '৪র্থ শ্রেণি', '৫ম শ্রেণি', '৬ষ্ঠ-৮ম শ্রেণি', 'সাধারণ শিক্ষার্থী'];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  currentUser,
  onLogin,
  onLogout,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [grade, setGrade] = useState(GRADES[2]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const displayName = user.displayName || name || 'নাসির';
      await onLogin(displayName, selectedAvatar, grade, user.email || undefined, user.uid);
      onClose();
    } catch (err: unknown) {
      console.error('Google Sign In error:', err);
      setError('গুগল সাইন ইনে সমস্যা হয়েছে বা বাতিল করা হয়েছে। আপনি নিচের ফর্মে নাম লিখেও অ্যাকাউন্ট তৈরি করতে পারেন।');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('দয়া করে শিক্ষার্থীর নাম লিখুন');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onLogin(name.trim(), selectedAvatar, grade);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border-2 border-indigo-400 dark:border-indigo-500/80 rounded-3xl shadow-2xl max-w-lg w-full p-5 sm:p-7 my-6 relative overflow-hidden text-slate-800 dark:text-slate-100">
        {/* Top Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-600 shadow-md" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {currentUser?.isLoggedIn ? (
          /* Profile Card if already logged in */
          <div className="text-center py-4">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-50 dark:bg-indigo-950/80 border-2 border-indigo-400 flex items-center justify-center text-5xl shadow-lg shadow-indigo-500/20 mb-3">
              {currentUser.avatarEmoji}
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {currentUser.name}
            </h3>
            <p className="text-xs font-semibold text-indigo-600 dark:text-cyan-400 mt-1">
              {currentUser.superheroTitle || 'সুপারহিরো'} · {currentUser.grade}
            </p>

            {currentUser.email && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {currentUser.email}
              </p>
            )}

            <div className="my-5 p-4 rounded-2xl bg-emerald-50 dark:bg-slate-800/80 border border-emerald-300 dark:border-emerald-500/40 text-left">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-bold text-sm mb-1">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>ক্লাউড প্রোফাইল সক্রিয় ও সুরক্ষিত</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                তোমার প্রোফাইল, অর্জিত কয়েন এবং লেভেল ক্লাউড ডেটাবেসে নিরাপদে সেভ আছে। ১ম বারের ১০০০ কয়েন বোনাস ইতিমধ্যে সংগৃহীত হয়েছে।
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-bold text-sm cursor-pointer shadow-md transition-colors"
              >
                খেলায় ফিরে যাও
              </button>
              <button
                onClick={() => {
                  signOut(auth).catch(() => {});
                  onLogout();
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-rose-300 dark:border-rose-500/40 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 font-bold text-sm cursor-pointer transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>লগআউট</span>
              </button>
            </div>
          </div>
        ) : (
          /* Sign In / Sign Up Form */
          <div>
            <div className="text-center mb-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 text-xs font-black border border-amber-300 dark:border-amber-500/40 mb-2">
                <Gift className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-bounce" />
                <span>১ম বার সাইন-ইন করলেই ১,০০০ কয়েন বোনাস! (একবারই প্রযোজ্য)</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                নাসির কুইজ শিক্ষার্থী অ্যাকাউন্ট
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                লগইন করলে কয়েন ও লেভেল আজীবন ক্লাউড ডেটাবেসে সুরক্ষিত থাকবে।
              </p>
            </div>

            {/* Quick 1-Click Google Sign In */}
            <div className="mb-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-3 px-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-900 dark:text-white font-black text-sm flex items-center justify-center gap-2.5 shadow-md active:scale-98 transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{loading ? 'লগইন হচ্ছে...' : 'Google দিয়ে সরাসরি সাইন-ইন (১-ক্লিক)'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 my-3 text-slate-400 text-xs">
              <span className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
              <span>অথবা শিক্ষার্থীর নাম লিখুন</span>
              <span className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  শিক্ষার্থীর নাম:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: নাসির, আরিয়ান, সুমাইয়া..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                    required
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  পছন্দের অবতার বা ছবি বেছে নাও:
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVATARS.map(av => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setSelectedAvatar(av)}
                      className={`w-9 h-9 rounded-xl text-xl flex items-center justify-center transition-transform cursor-pointer border ${
                        selectedAvatar === av
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950 scale-110 ring-2 ring-indigo-400 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              {/* Class/Grade */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  শ্রেণি / বিভাগ:
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
                >
                  {GRADES.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* Error */}
              {error && (
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs font-semibold">
                  {error}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:brightness-110 text-white font-extrabold text-sm shadow-xl shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>সাইন-ইন সম্পন্ন করো</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
