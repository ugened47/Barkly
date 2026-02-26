import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type DogProfile = {
  name: string;
  breed: string;
};

type AppState = {
  streak: number;
  masteredTricks: string[];
  dogProfile: DogProfile;
  incrementStreak: () => void;
  resetStreak: () => void;
  toggleMastered: (trickId: string) => void;
  setDogProfile: (profile: Partial<DogProfile>) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      streak: 0,
      masteredTricks: [],
      dogProfile: { name: '', breed: '' },

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
    }),
    {
      name: 'barkly-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
