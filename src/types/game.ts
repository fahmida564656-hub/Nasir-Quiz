export type CategoryId = 'bangladesh' | 'islamic' | 'heritage' | 'science' | 'riddle' | 'mixed';

export type ThemeId =
  | 'superhero-blue'
  | 'fire-phoenix'
  | 'cosmic-galaxy'
  | 'stealth-vibranium'
  | 'cyber-emerald'
  | 'golden-royal'
  | 'neon-matrix'
  | 'deep-ocean'
  | 'crimson-dragon';

export type CardFrameStyle =
  | 'classic'
  | 'royal'
  | 'nature'
  | 'magic'
  | 'superhero-cyber'
  | 'golden-emperor'
  | 'cosmic-aurora'
  | 'fire-blaze';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  emoji: string;
  coinPrice: number;
  bgGradient: string;
  headerBg: string;
  cardBg: string;
  cardBorder: string;
  primaryButton: string;
  accentText: string;
  badgeBg: string;
  previewColor: string;
}

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  tagline: string;
  icon: string;
  themeColor: string;
  badgeBg: string;
}

export interface Question {
  id: string;
  category: CategoryId;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  hint: string;
  funFact?: string;
}

export interface CharacterDialogue {
  greeting: string;
  correct: string;
  wrong: string;
  victory: string;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  badge: string;
  avatarEmoji: string;
  primaryColor: string;
  accentBg: string;
  cardBorder: string;
  dialogue: CharacterDialogue;
  coinPrice: number;
  unlockedByDefault: boolean;
}

export interface AnswerRecord {
  questionId: string;
  questionText: string;
  options: [string, string, string, string];
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
  explanation: string;
}

export type SoundPackId = 'funny-cartoon' | 'epic-hero' | 'futuristic' | 'gentle-melody';

export interface SoundPackInfo {
  id: SoundPackId;
  name: string;
  tagline: string;
  emoji: string;
  badge: string;
  description: string;
}

export interface UserProfile {
  userId?: string;
  isLoggedIn: boolean;
  email?: string;
  name: string;
  avatarEmoji: string;
  superheroTitle: string;
  superheroPower: string;
  slogan: string;
  grade: string;
  equippedRoom?: string;
  equippedAccessory?: string;
  soundPack?: SoundPackId;
  claimedBonus: boolean;
  joinedDate: string;
}

export interface CustomTextColor {
  id: string;
  name: string;
  hex: string;
  price: number;
}

export interface CharacterLogoUpgrade {
  id: string;
  name: string;
  emojiIcon: string;
  badgeTitle: string;
  price: number;
}

export interface OnlineSearchItem {
  id: string;
  type: 'avatar' | 'room' | 'accessory';
  name: string;
  tagline: string;
  icon: string;
  category: string;
  tags: string[];
  previewGradient?: string;
  coinPrice: number;
}
