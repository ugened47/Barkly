import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getISODate, calculateNewStreak } from '@/utils/streak';

type DogProfile = {
  name: string;
  breed: string;
};

type AppState = {
  // ── Existing ──────────────────────────────────────────────────────────────
  streak: number;
  masteredTricks: string[];
  dogProfile: DogProfile;

  // ── New ───────────────────────────────────────────────────────────────────
  /** ISO date of the last day the user practiced at least one trick. */
  lastPracticeDate: string | null;
  /** Number of clicker taps in the current session. */
  sessionClicks: number;
  /** All-time clicker tap count. */
  totalClicks: number;
  /** Whether the clicker sound is enabled. */
  soundEnabled: boolean;
  /** Trick IDs practiced today (resets each calendar day). */
  practicedToday: string[];

  // ── Actions ───────────────────────────────────────────────────────────────
  incrementStreak: () => void;
  resetStreak: () => void;
  toggleMastered: (trickId: string) => void;
  setDogProfile: (profile: Partial<DogProfile>) => void;
  recordClick: () => void;
  resetSessionClicks: () => void;
  recordPractice: (trickId: string) => void;
  toggleSound: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // ── Initial state ──────────────────────────────────────────────────────
      streak: 0,
      masteredTricks: [],
      dogProfile: { name: '', breed: '' },
      lastPracticeDate: null,
      sessionClicks: 0,
      totalClicks: 0,
      soundEnabled: true,
      practicedToday: [],

      // ── Existing actions ───────────────────────────────────────────────────
      incrementStreak: () => set({ streak: get().streak + 1 }),

      resetStreak: () => set({ streak: 0 }),

      toggleMastered: (trickId: string) => {
        const current = get().masteredTricks;
        if (current.includes(trickId)) {
          set({ masteredTricks: current.filter((id) => id !== trickId) });
        } else {
          set({ masteredTricks: [...current, trickId] });
        }
      },

      setDogProfile: (profile) =>
        set({ dogProfile: { ...get().dogProfile, ...profile } }),

      // ── New actions ────────────────────────────────────────────────────────
      recordClick: () =>
        set({ sessionClicks: get().sessionClicks + 1, totalClicks: get().totalClicks + 1 }),

      resetSessionClicks: () => set({ sessionClicks: 0 }),

      recordPractice: (trickId: string) => {
        const today = getISODate();
        const { streak, lastPracticeDate, practicedToday } = get();

        // If it's a new calendar day, start fresh for practicedToday
        const todayPracticed = lastPracticeDate === today ? practicedToday : [];

        const { streak: newStreak, lastPracticeDate: newDate } = calculateNewStreak(
          lastPracticeDate,
          today,
          streak,
        );

        set({
          streak: newStreak,
          lastPracticeDate: newDate,
          practicedToday: todayPracticed.includes(trickId)
            ? todayPracticed
            : [...todayPracticed, trickId],
        });
      },

      toggleSound: () => set({ soundEnabled: !get().soundEnabled }),
    }),
    {
      name: 'barkly-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
