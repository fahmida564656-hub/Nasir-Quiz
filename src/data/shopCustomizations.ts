import { CustomTextColor, CharacterLogoUpgrade } from '../types/game';

export const CUSTOM_TEXT_COLORS: CustomTextColor[] = [
  { id: 'black', name: 'চিরায়ত কালো', hex: '#1E293B', price: 0 },
  { id: 'blue', name: 'রাজকীয় নীল', hex: '#2563EB', price: 300 },
  { id: 'green', name: 'পান্না সবুজ', hex: '#059669', price: 400 },
  { id: 'red', name: 'রুবি লাল', hex: '#DC2626', price: 500 },
  { id: 'gold', name: 'উজ্জ্বল সোনালী', hex: '#D97706', price: 600 },
  { id: 'purple', name: 'ম্যাজিক বেগুনি', hex: '#7C3AED', price: 700 },
  { id: 'cyan', name: 'সাইবার সাইয়ান', hex: '#0891B2', price: 800 },
  { id: 'pink', name: 'নিওন গোলাপী', hex: '#DB2777', price: 900 },
];

export const CHARACTER_LOGO_UPGRADES: CharacterLogoUpgrade[] = [
  { id: 'default', name: 'চিরায়ত রূপ', emojiIcon: '🐅', badgeTitle: 'সাহসী প্রহরী', price: 0 },
  { id: 'crown', name: 'রাজমুকুট রাজকীয় সংস্করণ', emojiIcon: '👑', badgeTitle: 'রাজা বাঘ মামা', price: 1000 },
  { id: 'superhero', name: 'সুপারহিরো সংস্করণ', emojiIcon: '🦸‍♂️', badgeTitle: 'সুপার বাঘ মামা', price: 1500 },
  { id: 'space', name: 'মহাকাশচারী সংস্করণ', emojiIcon: '🧑‍🚀', badgeTitle: 'গ্যালাক্সি বাঘ মামা', price: 2500 },
  { id: 'diamond', name: 'হীরক ডায়মন্ড লিজেন্ড', emojiIcon: '💎', badgeTitle: 'হীরক বাঘ মামা', price: 3500 },
  { id: 'champion', name: 'মেগা গোল্ডেন সম্রাট (৫,০০০ কয়েন)', emojiIcon: '🏆', badgeTitle: '৫০০০ কয়েন গোল্ডেন বাঘ মামা', price: 5000 },
];

export const DAILY_CHECKIN_REWARDS = [
  { day: 1, coins: 100, label: 'দিন ১' },
  { day: 2, coins: 150, label: 'দিন ২' },
  { day: 3, coins: 200, label: 'দিন ৩' },
  { day: 4, coins: 250, label: 'দিন ৪' },
  { day: 5, coins: 300, label: 'দিন ৫' },
  { day: 6, coins: 400, label: 'দিন ৬' },
  { day: 7, coins: 1000, label: 'দিন ৭ (মেগা জ্যাকপট!)' },
];
