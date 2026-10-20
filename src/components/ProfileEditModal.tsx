import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  User,
  Zap,
  Shield,
  Sparkles,
  Check,
  Crown,
  Flame,
  Star,
  Home,
  CheckCircle2,
  Lock,
  Layers
} from 'lucide-react';
import { UserProfile, OnlineSearchItem } from '../types/game';
import { ONLINE_SEARCH_CATALOG } from '../data/onlineSearchCatalog';
import { toBengaliNumber } from '../data/questionEngine';

interface ProfileEditModalProps {
  isOpen: boolean;
  currentUser: UserProfile | null;
  coins: number;
  onSaveProfile: (updatedProfile: UserProfile) => void;
  onClose: () => void;
  onOpenStats?: () => void;
}

const HERO_AVATARS = ['🦸‍♂️', '🦸‍♀️', '⚡', '👑', '🤖', '🐅', '🦁', '🦅', '🧑‍🚀', '🧕', '🕊️', '🐲', '🦾', '🥷'];

const HERO_TITLES = [
  'সুপার নাসির',
  'সুলতান সুলেমান',
  'বজ্র নায়ক',
  'জ্ঞানের ক্যাপ্টেন',
  'মহাজাগতিক স্টার',
  'কুইজ সম্রাট',
  'সাহসী বীর',
  'আলোর যোদ্ধা',
  'সাইবার রোবটিক্স মাস্টার',
];

const HERO_POWERS = [
  '⚡ বিদ্যুৎ গতি বুদ্ধি',
  '👑 রাজকীয় স্বর্ণ প্রজ্ঞা',
  '🧠 সুপার কম্পিউটার ব্রেন',
  '🛡️ অজেয় জ্ঞানের ঢাল',
  '🔥 অগ্নি মেধা ও তেজ',
  '🌟 আলোর জাদুকরী দৃষ্টি',
  '🚀 মহাজাগতিক অন্তর্দৃষ্টি',
];

const SLOGANS = [
  'জ্ঞানের শক্তিতে গড়ব সোনার দেশ!',
  'সুপারহিরোর মতো এগিয়ে যাব!',
  'আলোর পাঠশালায় আমি সেরা!',
  'মেধা ও সততায় আমি অজেয়!',
  'সত্য ও ন্যায়ের পথে আলোর দিশারী!',
];

const CATEGORY_CHIPS = [
  { id: 'all', label: 'সবগুলো আইটেম' },
  { id: 'মুকুট ও রাজকীয়', label: '👑 রাজকীয় মুকুট' },
  { id: 'রোবটিক্স ও সাইবার', label: '🤖 সাইবার রোবট' },
  { id: 'সুপারহিরো ইউনিভার্স', label: '🦸‍♂️ সুপারহিরো' },
  { id: 'প্রকৃতি ও প্রাণী', label: '🐅 বাঘ ও প্রাণী' },
  { id: 'মহাকাশ অভিযাত্রা', label: '🚀 মহাকাশ' },
  { id: 'ইসলামিক ও শান্তি', label: '🕌 ইসলামিক নূর' },
  { id: 'ড্রাগন ও ম্যাজিক', label: '🐲 রূপকথা' },
];

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  currentUser,
  coins,
  onSaveProfile,
  onClose,
  onOpenStats,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'avatar_studio'>('info');

  // Profile form state
  const [name, setName] = useState(currentUser?.name || 'নাসির');
  const [avatarEmoji, setAvatarEmoji] = useState(currentUser?.avatarEmoji || '🦸‍♂️');
  const [superheroTitle, setSuperheroTitle] = useState(currentUser?.superheroTitle || HERO_TITLES[0]);
  const [superheroPower, setSuperheroPower] = useState(currentUser?.superheroPower || HERO_POWERS[0]);
  const [slogan, setSlogan] = useState(currentUser?.slogan || SLOGANS[0]);
  const [grade, setGrade] = useState(currentUser?.grade || '৩য় শ্রেণি');
  const [equippedRoom, setEquippedRoom] = useState(currentUser?.equippedRoom || 'কোয়ান্টাম সাইবার ল্যাব রুম');
  const [equippedAccessory, setEquippedAccessory] = useState(currentUser?.equippedAccessory || 'বজ্র বিদ্যুৎ লাইটনিং বোল্ট');

  // Categorized Avatar & Room Studio (No search bar)
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | 'avatar' | 'room' | 'accessory'>('all');
  const [equippedSuccessMsg, setEquippedSuccessMsg] = useState<string | null>(null);

  // Filtered catalog
  const filteredCatalog = useMemo(() => {
    let list = ONLINE_SEARCH_CATALOG;
    if (selectedCategory !== 'all') {
      list = list.filter(item => item.category === selectedCategory);
    }
    if (filterType !== 'all') {
      list = list.filter(item => item.type === filterType);
    }
    return list;
  }, [selectedCategory, filterType]);

  if (!isOpen) return null;

  const handleEquipItem = (item: OnlineSearchItem) => {
    if (item.type === 'avatar') {
      setAvatarEmoji(item.icon);
      setEquippedSuccessMsg(`অবতার হিসেবে "${item.name}" সেট করা হয়েছে!`);
    } else if (item.type === 'room') {
      setEquippedRoom(item.name);
      setEquippedSuccessMsg(`রুম হিসেবে "${item.name}" সেট করা হয়েছে!`);
    } else if (item.type === 'accessory') {
      setEquippedAccessory(item.name);
      setEquippedSuccessMsg(`এক্সেসরিজ হিসেবে "${item.name}" সজ্জিত করা হয়েছে!`);
    }
    setTimeout(() => setEquippedSuccessMsg(null), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      userId: currentUser?.userId,
      isLoggedIn: true,
      email: currentUser?.email,
      name: name.trim() || 'নাসির',
      avatarEmoji,
      superheroTitle,
      superheroPower,
      slogan,
      grade,
      equippedRoom,
      equippedAccessory,
      claimedBonus: currentUser?.claimedBonus ?? true,
      joinedDate: currentUser?.joinedDate || new Date().toLocaleDateString('bn-BD'),
    };
    onSaveProfile(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto animate-fade-in">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="bg-white dark:bg-slate-900 border-2 border-indigo-400 dark:border-indigo-500/80 rounded-3xl shadow-2xl max-w-3xl w-full p-5 sm:p-7 my-6 relative overflow-hidden text-slate-900 dark:text-slate-100 max-h-[92vh] flex flex-col"
      >
        {/* Top Glow Strip */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-600 shadow-md" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Preview Banner */}
        <div className="pt-2 pb-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-rose-500 flex items-center justify-center text-3xl shadow-lg shadow-indigo-500/25 ring-2 ring-indigo-400">
                {avatarEmoji}
              </div>
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-emerald-500 text-[10px] font-black text-white flex items-center gap-0.5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                HERO
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                  {name || 'নাসির'}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-500/40 font-bold">
                  {superheroTitle}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> {equippedRoom}
                </span>
                <span>•</span>
                <span className="text-indigo-700 dark:text-cyan-400 font-bold">{equippedAccessory}</span>
              </div>
            </div>
          </div>

          {onOpenStats && (
            <button
              type="button"
              onClick={onOpenStats}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-indigo-600 dark:text-cyan-300 border border-slate-300 dark:border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
            >
              <span>📊 সুপারহিরো গ্রাফ</span>
            </button>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-950/80 rounded-2xl my-3 border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'info'
                ? 'bg-white dark:bg-indigo-600 text-indigo-700 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>প্রোফাইল তথ্য ও খেতাব</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('avatar_studio')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'avatar_studio'
                ? 'bg-white dark:bg-indigo-600 text-indigo-700 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 text-indigo-600 dark:text-cyan-300" />
            <span>অবতার, মুকুট ও রুম গ্যালারি</span>
          </button>
        </div>

        {/* Notification Toast */}
        {equippedSuccessMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{equippedSuccessMsg}</span>
          </motion.div>
        )}

        {/* Tab 1: Profile Info */}
        {activeTab === 'info' ? (
          <form onSubmit={handleSave} className="space-y-4 overflow-y-auto pr-1 custom-scrollbar flex-1">
            {/* Superhero Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                তোমার নাম:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: নাসির..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 text-sm"
                required
              />
            </div>

            {/* Quick Avatar Row */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  সুপারহিরো কস্টিউম / অবতার:
                </label>
                <button
                  type="button"
                  onClick={() => setActiveTab('avatar_studio')}
                  className="text-xs text-indigo-600 dark:text-cyan-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" /> আরও মুকুট ও অবতার দেখুন
                </button>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {HERO_AVATARS.map(av => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setAvatarEmoji(av)}
                    className={`h-11 rounded-xl text-2xl flex items-center justify-center transition-all cursor-pointer ${
                      avatarEmoji === av
                        ? 'bg-indigo-600 text-white scale-110 ring-2 ring-indigo-400 shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* Superhero Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                সুপারহিরো খেতাব:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {HERO_TITLES.map(title => (
                  <button
                    key={title}
                    type="button"
                    onClick={() => setSuperheroTitle(title)}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all cursor-pointer border ${
                      superheroTitle === title
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-200 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750'
                    }`}
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>

            {/* Superhero Power & Grade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  প্রিয় সুপারপাওয়ার ব্যাজ:
                </label>
                <select
                  value={superheroPower}
                  onChange={(e) => setSuperheroPower(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
                >
                  {HERO_POWERS.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  শ্রেণি / বিভাগ:
                </label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="যেমন: ৩য় শ্রেণি"
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                তোমার সুপারহিরো স্লোগান:
              </label>
              <select
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                className="w-full px-3 py-2 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
              >
                {SLOGANS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Save Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:brightness-110 text-white font-black text-sm shadow-xl shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>প্রোফাইল সেভ করো!</span>
              </button>
            </div>
          </form>
        ) : (
          /* Tab 2: Categorized Avatar, Crown & Room Gallery */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Category Chips (Child-safe, organized) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 custom-scrollbar">
              {CATEGORY_CHIPS.map(chip => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setSelectedCategory(chip.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black shrink-0 transition-colors cursor-pointer border ${
                    selectedCategory === chip.id
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-750'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Sub-filter by Type */}
            <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-1">
                {(['all', 'avatar', 'room', 'accessory'] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFilterType(type)}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer ${
                      filterType === type
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {type === 'all' && 'সবগুলো'}
                    {type === 'avatar' && 'অবতার'}
                    {type === 'room' && 'রুম ও ব্যাকগ্রাউন্ড'}
                    {type === 'accessory' && 'এক্সেসরিজ'}
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">
                {toBengaliNumber(filteredCatalog.length)}টি আইটেম
              </span>
            </div>

            {/* Catalog Grid */}
            <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {filteredCatalog.map(item => {
                  const isEquipped =
                    (item.type === 'avatar' && avatarEmoji === item.icon) ||
                    (item.type === 'room' && equippedRoom === item.name) ||
                    (item.type === 'accessory' && equippedAccessory === item.name);

                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                        isEquipped
                          ? 'bg-indigo-50/80 dark:bg-indigo-950/70 border-indigo-500 shadow-md ring-2 ring-indigo-400/40'
                          : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-indigo-300 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                              {item.name}
                            </h4>
                            <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-slate-100 dark:bg-slate-700 text-indigo-700 dark:text-cyan-300 font-bold">
                              {item.type === 'avatar' ? 'অবতার' : item.type === 'room' ? 'রুম' : 'পাওয়ার'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                            {item.tagline}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleEquipItem(item)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                          isEquipped
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        }`}
                      >
                        {isEquipped ? '✓ সেট করা' : 'সেট করো'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Save Action */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 mt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                পছন্দের আইটেম সেট করে 'প্রোফাইল সেভ' বাটনে ক্লিক করো
              </span>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md cursor-pointer transition-all"
              >
                প্রোফাইল সেভ করো
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
