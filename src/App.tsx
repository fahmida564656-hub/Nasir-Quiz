import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CategoryId,
  Question,
  AnswerRecord,
  Character,
  ThemeId,
  CardFrameStyle,
  UserProfile,
  CustomTextColor,
  CharacterLogoUpgrade
} from './types/game';
import { CHARACTERS } from './data/characters';
import { CATEGORIES } from './data/categories';
import { THEMES } from './data/themes';
import { CUSTOM_TEXT_COLORS, CHARACTER_LOGO_UPGRADES } from './data/shopCustomizations';
import { getQuestionsForRound, toBengaliNumber } from './data/questionEngine';
import { SoundEffects, speakBengaliText, stopSpeaking } from './utils/sound';
import { launchConfetti } from './utils/confetti';
import {
  auth,
  db,
  doc,
  getDoc,
  setDoc,
  onAuthStateChanged,
  testConnection,
  handleFirestoreError,
  OperationType,
  type User
} from './lib/firebase';
import { Header } from './components/Header';
import { CharacterGuide } from './components/CharacterGuide';
import { QuestionCard } from './components/QuestionCard';
import { RoundSummaryModal } from './components/RoundSummaryModal';
import { CharacterSelectModal } from './components/CharacterSelectModal';
import { CategoryPicker } from './components/CategoryPicker';
import { LevelSelectorModal } from './components/LevelSelectorModal';
import { CoinShopModal } from './components/CoinShopModal';
import { AuthModal } from './components/AuthModal';
import { ThemeStudioModal } from './components/ThemeStudioModal';
import { NavigationDrawer } from './components/NavigationDrawer';
import { DailyCheckinModal } from './components/DailyCheckinModal';
import { CustomizerShopModal } from './components/CustomizerShopModal';
import { ProfileEditModal } from './components/ProfileEditModal';
import { SuperheroStatsModal } from './components/SuperheroStatsModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import {
  Sparkles,
  Trophy,
  BarChart3,
  Globe,
  Calendar,
  ShoppingBag,
  Zap,
  Shield,
  Crown,
  Flame,
  CheckCircle2,
  XCircle,
  Target
} from 'lucide-react';

const STORAGE_KEY = 'nasir_quiz_v5';

const DEFAULT_PROFILE: UserProfile = {
  isLoggedIn: true,
  name: 'নাসির',
  avatarEmoji: '🦸‍♂️',
  superheroTitle: 'সুপার নাসির',
  superheroPower: '⚡ বিদ্যুৎ গতি বুদ্ধি',
  slogan: 'জ্ঞানের শক্তিতে গড়ব সোনার দেশ!',
  grade: '৩য় শ্রেণি',
  equippedRoom: 'কোয়ান্টাম সাইবার ল্যাব রুম',
  equippedAccessory: 'বজ্র বিদ্যুৎ লাইটনিং বোল্ট',
  claimedBonus: true,
  joinedDate: new Date().toLocaleDateString('bn-BD'),
};

export default function App() {
  // User Profile
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_user`);
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Persistent coins state
  const [coins, setCoins] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_coins`);
      return saved ? Number(saved) : 500;
    } catch {
      return 500;
    }
  });

  const [currentLevel, setCurrentLevel] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_level`);
      return saved ? Number(saved) : 1;
    } catch {
      return 1;
    }
  });

  const [highestLevel, setHighestLevel] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_highestLevel`);
      return saved ? Number(saved) : 1;
    } catch {
      return 1;
    }
  });

  // Superhero Themes
  const [activeThemeId, setActiveThemeId] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_theme`);
      return (saved as ThemeId) || 'superhero-blue';
    } catch {
      return 'superhero-blue';
    }
  });

  const [unlockedThemeIds, setUnlockedThemeIds] = useState<ThemeId[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_unlockedThemes`);
      return saved ? JSON.parse(saved) : ['superhero-blue'];
    } catch {
      return ['superhero-blue'];
    }
  });

  const [activeFrameStyle, setActiveFrameStyle] = useState<CardFrameStyle>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_frame`);
      return (saved as CardFrameStyle) || 'classic';
    } catch {
      return 'classic';
    }
  });

  const [isMonochrome, setIsMonochrome] = useState<boolean>(() => {
    try {
      return localStorage.getItem(`${STORAGE_KEY}_monochrome`) === 'true';
    } catch {
      return false;
    }
  });

  // Character Text Color and Logo Customization
  const [customTextColor, setCustomTextColor] = useState<string>(() => {
    try {
      return localStorage.getItem(`${STORAGE_KEY}_textColor`) || '#38BDF8';
    } catch {
      return '#38BDF8';
    }
  });

  const [unlockedTextColorIds, setUnlockedTextColorIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_unlockedColors`);
      return saved ? JSON.parse(saved) : ['blue'];
    } catch {
      return ['blue'];
    }
  });

  const [selectedLogoUpgrade, setSelectedLogoUpgrade] = useState<string>(() => {
    try {
      return localStorage.getItem(`${STORAGE_KEY}_logoUpgrade`) || 'crown';
    } catch {
      return 'crown';
    }
  });

  const [unlockedLogoUpgradeIds, setUnlockedLogoUpgradeIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_unlockedLogos`);
      return saved ? JSON.parse(saved) : ['default', 'crown'];
    } catch {
      return ['default', 'crown'];
    }
  });

  // Daily Checkin Tracking
  const [claimedDates, setClaimedDates] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_claimedDates`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [fridayMissedDates, setFridayMissedDates] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_missedFridays`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [autoTreeLevel, setAutoTreeLevel] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_treeLvl`);
      return saved ? Number(saved) : 1;
    } catch {
      return 1;
    }
  });

  // Category and Characters
  const [activeCategoryId, setActiveCategoryId] = useState<CategoryId>('mixed');
  const [activeCharacterId, setActiveCharacterId] = useState<string>('nasir');
  const [unlockedCharacterIds, setUnlockedCharacterIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_unlockedChars`);
      return saved ? JSON.parse(saved) : ['nasir', 'lightning', 'bagha', 'noori'];
    } catch {
      return ['nasir', 'lightning', 'bagha', 'noori'];
    }
  });

  const [totalCorrect, setTotalCorrect] = useState<number>(() => {
    try {
      return Number(localStorage.getItem(`${STORAGE_KEY}_totalCorrect`)) || 0;
    } catch {
      return 0;
    }
  });

  const [totalWrong, setTotalWrong] = useState<number>(() => {
    try {
      return Number(localStorage.getItem(`${STORAGE_KEY}_totalWrong`)) || 0;
    } catch {
      return 0;
    }
  });

  const [totalRounds, setTotalRounds] = useState<number>(() => {
    try {
      return Number(localStorage.getItem(`${STORAGE_KEY}_totalRounds`)) || 0;
    } catch {
      return 0;
    }
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Active round state (10 questions per round)
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answersInRound, setAnswersInRound] = useState<AnswerRecord[]>([]);
  const [streak, setStreak] = useState<number>(0);

  // Lifelines
  const [hintUsed, setHintUsed] = useState<boolean>(false);
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState<boolean>(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);

  // Mascot guide visual state
  const [mascotState, setMascotState] = useState<'idle' | 'correct' | 'wrong' | 'hint'>('idle');

  // Modals state
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isDailyCheckinOpen, setIsDailyCheckinOpen] = useState<boolean>(false);
  const [isCustomizerShopOpen, setIsCustomizerShopOpen] = useState<boolean>(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState<boolean>(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState<boolean>(false);
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState<boolean>(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState<boolean>(false);
  const [isShopModalOpen, setIsShopModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);
  const [isSuperheroStatsOpen, setIsSuperheroStatsOpen] = useState<boolean>(false);

  // Derived objects
  const activeCharacter = useMemo(() => {
    return CHARACTERS.find(c => c.id === activeCharacterId) || CHARACTERS[0];
  }, [activeCharacterId]);

  const activeTheme = useMemo(() => {
    return THEMES.find(t => t.id === activeThemeId) || THEMES[0];
  }, [activeThemeId]);

  const currentLogoUpgrade = useMemo(() => {
    return CHARACTER_LOGO_UPGRADES.find(l => l.id === selectedLogoUpgrade) || CHARACTER_LOGO_UPGRADES[0];
  }, [selectedLogoUpgrade]);

  // Test Firebase connection on boot
  useEffect(() => {
    testConnection();
  }, []);

  // Listen to Firebase Auth state and sync with Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (firebaseUser) {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        try {
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            const data = snap.data();
            if (data.coins !== undefined) setCoins(data.coins);
            if (data.currentLevel !== undefined) setCurrentLevel(data.currentLevel);
            if (data.totalCorrect !== undefined) setTotalCorrect(data.totalCorrect);
            if (data.totalWrong !== undefined) setTotalWrong(data.totalWrong);
            if (data.totalRounds !== undefined) setTotalRounds(data.totalRounds);
            if (data.streak !== undefined) setStreak(data.streak);
            if (Array.isArray(data.unlockedCharacters)) {
              setUnlockedCharacterIds(data.unlockedCharacters);
            }
            setCurrentUser(prev => ({
              ...prev,
              userId: firebaseUser.uid,
              isLoggedIn: true,
              email: firebaseUser.email || prev.email,
              name: data.name || firebaseUser.displayName || prev.name,
              avatarEmoji: data.avatarEmoji || prev.avatarEmoji,
              superheroTitle: data.superheroTitle || prev.superheroTitle,
              superheroPower: data.superheroPower || prev.superheroPower,
              slogan: data.slogan || prev.slogan,
              grade: data.grade || prev.grade,
              equippedRoom: data.equippedRoom || prev.equippedRoom,
              equippedAccessory: data.equippedAccessory || prev.equippedAccessory,
              claimedBonus: data.claimedBonus ?? prev.claimedBonus,
            }));
          } else {
            // First time sign-in: write initial profile to Firestore
            await setDoc(userDocRef, {
              userId: firebaseUser.uid,
              name: firebaseUser.displayName || currentUser.name,
              email: firebaseUser.email || '',
              avatarEmoji: currentUser.avatarEmoji,
              superheroTitle: currentUser.superheroTitle,
              superheroPower: currentUser.superheroPower,
              slogan: currentUser.slogan,
              grade: currentUser.grade,
              equippedRoom: currentUser.equippedRoom || 'কোয়ান্টাম সাইবার ল্যাব রুম',
              equippedAccessory: currentUser.equippedAccessory || 'বজ্র বিদ্যুৎ লাইটনিং বোল্ট',
              coins: coins + 1000,
              currentLevel,
              totalCorrect,
              totalWrong,
              totalRounds,
              streak,
              unlockedCharacters: unlockedCharacterIds,
              claimedBonus: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
            setCoins(c => c + 1000);
          }
        } catch (error) {
          console.warn('Firestore load error:', error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Save changes to Firestore if user is authenticated
  const syncToFirestore = useCallback(async () => {
    if (!auth.currentUser) return;
    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(
        userDocRef,
        {
          userId: auth.currentUser.uid,
          name: currentUser.name,
          email: auth.currentUser.email || currentUser.email || '',
          avatarEmoji: currentUser.avatarEmoji,
          superheroTitle: currentUser.superheroTitle,
          superheroPower: currentUser.superheroPower,
          slogan: currentUser.slogan,
          grade: currentUser.grade,
          equippedRoom: currentUser.equippedRoom || 'কোয়ান্টাম সাইবার ল্যাব রুম',
          equippedAccessory: currentUser.equippedAccessory || 'বজ্র বিদ্যুৎ লাইটনিং বোল্ট',
          coins,
          currentLevel,
          totalCorrect,
          totalWrong,
          totalRounds,
          streak,
          unlockedCharacters: unlockedCharacterIds,
          claimedBonus: currentUser.claimedBonus ?? true,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (err) {
      console.warn('Firestore sync warning:', err);
    }
  }, [
    currentUser,
    coins,
    currentLevel,
    totalCorrect,
    totalWrong,
    totalRounds,
    streak,
    unlockedCharacterIds
  ]);

  // Load 10 questions whenever level or category changes
  const loadRoundQuestions = useCallback((lvl: number, cat: CategoryId) => {
    const roundQuestions = getQuestionsForRound(lvl, cat);
    setQuestions(roundQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswersInRound([]);
    setHintUsed(false);
    setFiftyFiftyUsed(false);
    setEliminatedOptions([]);
    setMascotState('idle');
    setIsSummaryOpen(false);
    stopSpeaking();
  }, []);

  useEffect(() => {
    loadRoundQuestions(currentLevel, activeCategoryId);
  }, [currentLevel, activeCategoryId, loadRoundQuestions]);

  // Periodic Auto-Coin Generator
  useEffect(() => {
    const timer = setInterval(() => {
      const generated = autoTreeLevel * 5;
      setCoins(c => c + generated);
    }, 30000);
    return () => clearInterval(timer);
  }, [autoTreeLevel]);

  // LocalStorage & Cloud Sync
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_user`, JSON.stringify(currentUser));
      localStorage.setItem(`${STORAGE_KEY}_coins`, String(coins));
      localStorage.setItem(`${STORAGE_KEY}_level`, String(currentLevel));
      localStorage.setItem(`${STORAGE_KEY}_highestLevel`, String(highestLevel));
      localStorage.setItem(`${STORAGE_KEY}_unlockedChars`, JSON.stringify(unlockedCharacterIds));
      localStorage.setItem(`${STORAGE_KEY}_theme`, activeThemeId);
      localStorage.setItem(`${STORAGE_KEY}_unlockedThemes`, JSON.stringify(unlockedThemeIds));
      localStorage.setItem(`${STORAGE_KEY}_frame`, activeFrameStyle);
      localStorage.setItem(`${STORAGE_KEY}_monochrome`, String(isMonochrome));
      localStorage.setItem(`${STORAGE_KEY}_textColor`, customTextColor);
      localStorage.setItem(`${STORAGE_KEY}_unlockedColors`, JSON.stringify(unlockedTextColorIds));
      localStorage.setItem(`${STORAGE_KEY}_logoUpgrade`, selectedLogoUpgrade);
      localStorage.setItem(`${STORAGE_KEY}_unlockedLogos`, JSON.stringify(unlockedLogoUpgradeIds));
      localStorage.setItem(`${STORAGE_KEY}_claimedDates`, JSON.stringify(claimedDates));
      localStorage.setItem(`${STORAGE_KEY}_missedFridays`, JSON.stringify(fridayMissedDates));
      localStorage.setItem(`${STORAGE_KEY}_treeLvl`, String(autoTreeLevel));
      localStorage.setItem(`${STORAGE_KEY}_totalCorrect`, String(totalCorrect));
      localStorage.setItem(`${STORAGE_KEY}_totalWrong`, String(totalWrong));
      localStorage.setItem(`${STORAGE_KEY}_totalRounds`, String(totalRounds));
    } catch {
      // LocalStorage fallback
    }

    syncToFirestore();
  }, [
    coins,
    currentLevel,
    highestLevel,
    unlockedCharacterIds,
    activeThemeId,
    unlockedThemeIds,
    activeFrameStyle,
    isMonochrome,
    customTextColor,
    unlockedTextColorIds,
    selectedLogoUpgrade,
    unlockedLogoUpgradeIds,
    claimedDates,
    fridayMissedDates,
    autoTreeLevel,
    totalCorrect,
    totalWrong,
    totalRounds,
    currentUser,
    syncToFirestore
  ]);

  const currentQuestion = questions[currentQuestionIndex];

  // Handle selecting an option
  const handleSelectAnswer = (idx: number) => {
    if (selectedAnswer !== null || !currentQuestion) return;

    setSelectedAnswer(idx);
    const isCorrect = idx === currentQuestion.correctIndex;

    const record: AnswerRecord = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      options: currentQuestion.options,
      selectedIndex: idx,
      correctIndex: currentQuestion.correctIndex,
      isCorrect,
      explanation: currentQuestion.explanation,
    };

    setAnswersInRound(prev => [...prev, record]);

    if (isCorrect) {
      SoundEffects.correct(!soundEnabled);
      setStreak(s => s + 1);
      setTotalCorrect(c => c + 1);
      setMascotState('correct');
    } else {
      SoundEffects.wrong(!soundEnabled);
      setStreak(0);
      setTotalWrong(w => w + 1);
      setMascotState('wrong');
    }
  };

  // Handle Next Question or Round Completion
  const handleNextQuestion = () => {
    stopSpeaking();
    SoundEffects.click(!soundEnabled);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(idx => idx + 1);
      setSelectedAnswer(null);
      setHintUsed(false);
      setFiftyFiftyUsed(false);
      setEliminatedOptions([]);
      setMascotState('idle');
    } else {
      finishRound();
    }
  };

  const finishRound = () => {
    const finalAnswers = answersInRound;
    const correctCount = finalAnswers.filter(a => a.isCorrect).length;

    let prizeCoins = 200;
    if (correctCount === 10) {
      prizeCoins = 500;
    } else if (correctCount >= 8) {
      prizeCoins = 400;
    } else if (correctCount >= 6) {
      prizeCoins = 300;
    }

    setCoins(prev => prev + prizeCoins);
    setTotalRounds(r => r + 1);
    setHighestLevel(h => Math.max(h, currentLevel + 1));

    SoundEffects.victory(!soundEnabled);
    launchConfetti();
    setIsSummaryOpen(true);
  };

  // Next Round
  const handleNextRound = () => {
    const nextLvl = currentLevel + 1;
    setCurrentLevel(nextLvl);
    loadRoundQuestions(nextLvl, activeCategoryId);
  };

  // Replay
  const handleReplayRound = () => {
    loadRoundQuestions(currentLevel, activeCategoryId);
  };

  // Lifelines
  const handleUseHint = () => {
    if (hintUsed || selectedAnswer !== null) return;
    setHintUsed(true);
    setMascotState('hint');
    SoundEffects.lifeline(!soundEnabled);
  };

  const handleUseFiftyFifty = () => {
    if (fiftyFiftyUsed || selectedAnswer !== null || !currentQuestion) return;
    setFiftyFiftyUsed(true);
    SoundEffects.lifeline(!soundEnabled);

    const wrongIndexes = [0, 1, 2, 3].filter(i => i !== currentQuestion.correctIndex);
    const shuffledWrong = wrongIndexes.sort(() => 0.5 - Math.random());
    setEliminatedOptions(shuffledWrong.slice(0, 2));
  };

  // Unlock character with coins
  const handleUnlockCharacter = (char: Character) => {
    if (coins >= char.coinPrice && !unlockedCharacterIds.includes(char.id)) {
      setCoins(c => c - char.coinPrice);
      setUnlockedCharacterIds(prev => [...prev, char.id]);
      setActiveCharacterId(char.id);
      SoundEffects.coin(!soundEnabled);
      launchConfetti();
    }
  };

  // Unlock theme with coins
  const handleUnlockTheme = (theme: typeof THEMES[0]) => {
    if (coins >= theme.coinPrice && !unlockedThemeIds.includes(theme.id)) {
      setCoins(c => c - theme.coinPrice);
      setUnlockedThemeIds(prev => [...prev, theme.id]);
      setActiveThemeId(theme.id);
      SoundEffects.coin(!soundEnabled);
      launchConfetti();
    }
  };

  // Upgrade Auto-Coin Tree
  const handleUpgradeAutoTree = () => {
    const cost = (autoTreeLevel + 1) * 250;
    if (coins >= cost) {
      setCoins(c => c - cost);
      setAutoTreeLevel(lvl => lvl + 1);
      SoundEffects.coin(!soundEnabled);
      launchConfetti();
    }
  };

  // Profile Save
  const handleSaveProfile = (updated: UserProfile) => {
    setCurrentUser(updated);
    setIsProfileEditOpen(false);
    SoundEffects.victory(!soundEnabled);
    launchConfetti();
  };

  // Sign In / Profile Creation with +1000 Bonus Coins
  const handleLogin = (
    name: string,
    avatarEmoji: string,
    grade: string,
    email?: string,
    uid?: string
  ) => {
    const hadClaimedBonus = currentUser?.claimedBonus || false;
    const bonusToGive = hadClaimedBonus ? 0 : 1000;

    const newProfile: UserProfile = {
      ...currentUser,
      userId: uid || currentUser.userId,
      email: email || currentUser.email,
      isLoggedIn: true,
      name,
      avatarEmoji,
      grade,
      claimedBonus: true,
    };

    setCurrentUser(newProfile);
    if (bonusToGive > 0) {
      setCoins(c => c + bonusToGive);
    }
    SoundEffects.victory(!soundEnabled);
    launchConfetti();
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(DEFAULT_PROFILE);
    setIsAuthModalOpen(false);
    SoundEffects.click(!soundEnabled);
  };

  // Claim Daily Checkin (Lifetime 100, Friday 1000)
  const handleClaimDailyDay = (rewardCoins: number, dateKey: string) => {
    setCoins(c => c + rewardCoins);
    setClaimedDates(prev => [...prev, dateKey]);
    SoundEffects.coin(!soundEnabled);
    launchConfetti();
  };

  // Customizer: Unlock & Select Text Color
  const handleUnlockTextColor = (item: CustomTextColor) => {
    if (coins >= item.price && !unlockedTextColorIds.includes(item.id)) {
      setCoins(c => c - item.price);
      setUnlockedTextColorIds(prev => [...prev, item.id]);
      setCustomTextColor(item.hex);
      SoundEffects.coin(!soundEnabled);
      launchConfetti();
    }
  };

  // Customizer: Unlock & Select Logo Upgrade
  const handleUnlockLogoUpgrade = (item: CharacterLogoUpgrade) => {
    if (coins >= item.price && !unlockedLogoUpgradeIds.includes(item.id)) {
      setCoins(c => c - item.price);
      setUnlockedLogoUpgradeIds(prev => [...prev, item.id]);
      setSelectedLogoUpgrade(item.id);
      SoundEffects.coin(!soundEnabled);
      launchConfetti();
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 pb-16 md:pb-8 bg-gradient-to-b ${activeTheme.bgGradient}`}
    >
      {/* Top Bar Header */}
      <Header
        coins={coins}
        streak={streak}
        activeCharacter={activeCharacter}
        currentLevel={currentLevel}
        soundEnabled={soundEnabled}
        currentUser={currentUser}
        activeTheme={activeTheme}
        customTextColor={customTextColor}
        customLogoEmoji={currentLogoUpgrade.id !== 'default' ? currentLogoUpgrade.emojiIcon : ''}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenShop={() => setIsShopModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenProfileEdit={() => setIsProfileEditOpen(true)}
        onOpenSuperheroStats={() => setIsSuperheroStatsOpen(true)}
      />

      {/* Main Playfield Area (Expanded, Big & Magnificent Layout) */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-7 flex flex-col gap-4 sm:gap-6">
        {/* Grand Superhero Hero Arena / Room Showcase Banner */}
        <section className="relative rounded-3xl overflow-hidden p-4 sm:p-6 bg-slate-900/90 border-2 border-indigo-500/40 shadow-2xl backdrop-blur-xl">
          {/* Subtle Room Aura Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-500/10 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
            {/* Left: Nasir & Hero Persona + Equipped Room/Accessory */}
            <div className="flex items-center gap-3.5 sm:gap-4.5 text-left w-full lg:w-auto">
              <div className="relative shrink-0">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center text-4xl sm:text-5xl shadow-xl shadow-indigo-500/30 ring-3 ring-indigo-400/60">
                  {currentUser.avatarEmoji}
                </div>
                <span className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  ONLINE
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    {currentUser.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-xs font-black shadow-xs">
                    {currentUser.superheroTitle}
                  </span>
                  <span className="text-xs text-cyan-300 font-semibold px-2 py-0.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30">
                    {currentUser.grade}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 italic mt-1 font-medium line-clamp-1">
                  &ldquo;{currentUser.slogan}&rdquo;
                </p>

                {/* Equipped Room & Accessory Badges */}
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                  <span className="px-2.5 py-1 rounded-xl bg-slate-800/90 border border-indigo-500/30 text-indigo-300 font-bold flex items-center gap-1.5 shadow-xs">
                    <Crown className="w-3.5 h-3.5 text-amber-400" />
                    <span>{currentUser.equippedRoom || 'কোয়ান্টাম সাইবার ল্যাব রুম'}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-slate-800/90 border border-cyan-500/30 text-cyan-300 font-bold flex items-center gap-1.5 shadow-xs">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{currentUser.equippedAccessory || 'বজ্র বিদ্যুৎ লাইটনিং বোল্ট'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Live KPI Hero Stats & Graph CTA */}
            <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto justify-between lg:justify-end">
              {/* Level Badge */}
              <button
                onClick={() => setIsLevelModalOpen(true)}
                className="flex-1 lg:flex-initial p-2.5 sm:p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-750 border border-slate-700 text-center transition-colors cursor-pointer group"
                title="লেভেল পরিবর্তন করুন"
              >
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-bold block">
                  ধাপ / লেভেল
                </span>
                <span className="text-lg sm:text-2xl font-black text-amber-400 group-hover:scale-105 transition-transform inline-block">
                  {toBengaliNumber(currentLevel)}
                </span>
              </button>

              {/* Streak Badge */}
              <div className="flex-1 lg:flex-initial p-2.5 sm:p-3 rounded-2xl bg-slate-800/90 border border-slate-700 text-center">
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-bold block flex items-center justify-center gap-0.5">
                  <Flame className="w-3 h-3 text-orange-400 fill-orange-400" /> স্ট্রিক
                </span>
                <span className="text-lg sm:text-2xl font-black text-orange-400">
                  {toBengaliNumber(streak)}🔥
                </span>
              </div>

              {/* Recharts Bar Chart Button */}
              <button
                onClick={() => setIsSuperheroStatsOpen(true)}
                className="flex-1 lg:flex-initial p-2.5 sm:p-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs sm:text-sm shadow-lg shadow-cyan-500/20 active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer border border-cyan-400/40"
              >
                <div className="flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-cyan-200" />
                  <span>গ্রাফ দেখুন</span>
                </div>
                <span className="text-[10px] text-cyan-100/90 font-semibold mt-0.5">
                  সঠিক বনাম ভুল
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Character Guide Companion Banner */}
        <CharacterGuide
          character={activeCharacter}
          state={mascotState}
          hintText={currentQuestion?.hint}
          customTextColor={customTextColor}
          customLogoEmoji={currentLogoUpgrade.id !== 'default' ? currentLogoUpgrade.emojiIcon : ''}
          customBadgeTitle={currentLogoUpgrade.id !== 'default' ? currentLogoUpgrade.badgeTitle : ''}
          onOpenCharacterSelect={() => setIsCharacterModalOpen(true)}
        />

        {/* Active Question Card (Spacious and Rich) */}
        {currentQuestion ? (
          <QuestionCard
            question={currentQuestion}
            questionIndex={currentQuestionIndex}
            totalQuestions={questions.length || 10}
            selectedAnswer={selectedAnswer}
            activeTheme={activeTheme}
            activeFrameStyle={activeFrameStyle}
            onSelectAnswer={handleSelectAnswer}
            onNextQuestion={handleNextQuestion}
            onReadAloud={(text) => {
              if (soundEnabled) speakBengaliText(text);
            }}
            onUseHint={handleUseHint}
            onUseFiftyFifty={handleUseFiftyFifty}
            hintUsed={hintUsed}
            fiftyFiftyUsed={fiftyFiftyUsed}
            eliminatedOptions={eliminatedOptions}
          />
        ) : (
          <div className="bg-slate-900/90 rounded-3xl p-10 text-center border border-indigo-500/40 text-white shadow-2xl">
            <p className="font-bold text-slate-200 text-lg">প্রশ্ন প্রস্তুত হচ্ছে...</p>
          </div>
        )}

        {/* Bottom Quick Feature Dock */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs font-bold">
          <button
            onClick={() => setIsProfileEditOpen(true)}
            className="p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-indigo-500/40 text-slate-200 flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
          >
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>অনলাইন রুম ও অবতার</span>
          </button>

          <button
            onClick={() => setIsSuperheroStatsOpen(true)}
            className="p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
          >
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span>সুপারহিরো গ্রাফ</span>
          </button>

          <button
            onClick={() => setIsDailyCheckinOpen(true)}
            className="p-3 rounded-2xl bg-amber-950/60 hover:bg-amber-900/70 border border-amber-500/50 text-amber-300 flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>ডেইলি চেক-ইন (১০০০)</span>
          </button>

          <button
            onClick={() => setIsCharacterModalOpen(true)}
            className="p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-purple-500/40 text-purple-300 flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>ক্যারেক্টার নির্বাচন</span>
          </button>
        </section>
      </main>

      {/* Navigation Drawer (Opens from 3-dots button) */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        isMonochrome={isMonochrome}
        soundEnabled={soundEnabled}
        currentLevel={currentLevel}
        coins={coins}
        onToggleMonochrome={() => setIsMonochrome(m => !m)}
        onToggleSound={() => setSoundEnabled(s => !s)}
        onOpenCategories={() => setIsCategoryModalOpen(true)}
        onOpenCharacters={() => setIsCharacterModalOpen(true)}
        onOpenThemes={() => setIsThemeModalOpen(true)}
        onOpenLevels={() => setIsLevelModalOpen(true)}
        onOpenShop={() => setIsShopModalOpen(true)}
        onOpenDailyCheckin={() => setIsDailyCheckinOpen(true)}
        onOpenCustomizerShop={() => setIsCustomizerShopOpen(true)}
        onOpenProfileEdit={() => setIsProfileEditOpen(true)}
        onOpenSuperheroStats={() => setIsSuperheroStatsOpen(true)}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Profile Edit Modal (ইচ্ছামত প্রোফাইল সাজানো + অনলাইন অবতার ও রুম সার্চ) */}
      <ProfileEditModal
        isOpen={isProfileEditOpen}
        currentUser={currentUser}
        coins={coins}
        onSaveProfile={handleSaveProfile}
        onClose={() => setIsProfileEditOpen(false)}
        onOpenStats={() => {
          setIsProfileEditOpen(false);
          setIsSuperheroStatsOpen(true);
        }}
      />

      {/* Superhero Stats Modal with recharts Colorful Bar Chart */}
      <SuperheroStatsModal
        isOpen={isSuperheroStatsOpen}
        totalCorrect={totalCorrect}
        totalWrong={totalWrong}
        totalRounds={totalRounds}
        currentLevel={currentLevel}
        coins={coins}
        streak={streak}
        onClose={() => setIsSuperheroStatsOpen(false)}
      />

      {/* Daily Check-in Modal with Lifetime 100 coins & Friday 1000 / Saturday missed logic */}
      <DailyCheckinModal
        isOpen={isDailyCheckinOpen}
        claimedDates={claimedDates}
        fridayMissedDates={fridayMissedDates}
        onClaimDay={handleClaimDailyDay}
        onClose={() => setIsDailyCheckinOpen(false)}
      />

      {/* Customizer & Shopping Tools Modal */}
      <CustomizerShopModal
        isOpen={isCustomizerShopOpen}
        activeCharacter={activeCharacter}
        selectedTextColor={customTextColor}
        unlockedTextColorIds={unlockedTextColorIds}
        selectedLogoUpgrade={selectedLogoUpgrade}
        unlockedLogoUpgradeIds={unlockedLogoUpgradeIds}
        userCoins={coins}
        onSelectTextColor={(hex) => setCustomTextColor(hex)}
        onUnlockTextColor={handleUnlockTextColor}
        onSelectLogoUpgrade={(id) => setSelectedLogoUpgrade(id)}
        onUnlockLogoUpgrade={handleUnlockLogoUpgrade}
        onClose={() => setIsCustomizerShopOpen(false)}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentUser={currentUser}
        onOpenCategories={() => setIsCategoryModalOpen(true)}
        onOpenCharacters={() => setIsCharacterModalOpen(true)}
        onOpenThemes={() => setIsThemeModalOpen(true)}
        onOpenSuperheroStats={() => setIsSuperheroStatsOpen(true)}
        onOpenProfileEdit={() => setIsProfileEditOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Round Summary Modal */}
      <RoundSummaryModal
        isOpen={isSummaryOpen}
        answers={answersInRound}
        activeCharacter={activeCharacter}
        currentLevel={currentLevel}
        onNextRound={handleNextRound}
        onReplayRound={handleReplayRound}
        onChangeCategory={() => {
          setIsSummaryOpen(false);
          setIsCategoryModalOpen(true);
        }}
        onOpenSuperheroStats={() => {
          setIsSummaryOpen(false);
          setIsSuperheroStatsOpen(true);
        }}
      />

      {/* Character Select Modal */}
      <CharacterSelectModal
        isOpen={isCharacterModalOpen}
        activeCharacterId={activeCharacterId}
        unlockedCharacterIds={unlockedCharacterIds}
        userCoins={coins}
        onSelectCharacter={(char) => {
          setActiveCharacterId(char.id);
          SoundEffects.click(!soundEnabled);
        }}
        onUnlockCharacter={handleUnlockCharacter}
        onClose={() => setIsCharacterModalOpen(false)}
      />

      {/* Theme Studio Modal */}
      <ThemeStudioModal
        isOpen={isThemeModalOpen}
        activeThemeId={activeThemeId}
        unlockedThemeIds={unlockedThemeIds}
        activeFrameStyle={activeFrameStyle}
        unlockedFrameStyles={[
          'classic',
          'royal',
          'golden-emperor',
          'nature',
          'superhero-cyber',
          'magic',
          'cosmic-aurora',
          'fire-blaze'
        ]}
        userCoins={coins}
        autoTreeLevel={autoTreeLevel}
        onSelectTheme={(id) => {
          setActiveThemeId(id);
          SoundEffects.click(!soundEnabled);
        }}
        onUnlockTheme={handleUnlockTheme}
        onSelectFrame={(style) => {
          setActiveFrameStyle(style);
          SoundEffects.click(!soundEnabled);
        }}
        onUpgradeAutoTree={handleUpgradeAutoTree}
        onClose={() => setIsThemeModalOpen(false)}
      />

      {/* Auth Modal with Firebase Google Sign In */}
      <AuthModal
        isOpen={isAuthModalOpen}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Category Picker */}
      <CategoryPicker
        isOpen={isCategoryModalOpen}
        activeCategoryId={activeCategoryId}
        onSelectCategory={(catId) => {
          setActiveCategoryId(catId);
          SoundEffects.click(!soundEnabled);
        }}
        onClose={() => setIsCategoryModalOpen(false)}
      />

      {/* Level Selector Modal */}
      <LevelSelectorModal
        isOpen={isLevelModalOpen}
        currentLevel={currentLevel}
        highestLevelReached={highestLevel}
        onSelectLevel={(lvl) => {
          setCurrentLevel(lvl);
          SoundEffects.click(!soundEnabled);
        }}
        onClose={() => setIsLevelModalOpen(false)}
      />

      {/* Coin Shop & Badges Modal */}
      <CoinShopModal
        isOpen={isShopModalOpen}
        coins={coins}
        totalCorrect={totalCorrect}
        totalWrong={totalWrong}
        totalRounds={totalRounds}
        onClaimDailyGift={() => setIsDailyCheckinOpen(true)}
        canClaimGift={!claimedDates.includes(new Date().toISOString().split('T')[0])}
        onClose={() => setIsShopModalOpen(false)}
      />
    </div>
  );
}
