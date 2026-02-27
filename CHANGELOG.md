# Changelog

All notable changes to the Barkly project will be documented in this file.

## [Unreleased]

### Added
- **Clicker Sound** — Added `assets/sounds/click.mp3` (free dog training clicker sound); `ClickerButton` now loads it via `expo-av` `Audio.Sound` and calls `replayAsync()` on every press
- **Clicker Flash Animation** — `clicker.tsx` shows a full-screen cyan pulse (`withSequence` fade-in/out) on each tap, providing visual feedback for deaf dogs
- **Trick Data** — Populated `TricksData.ts` with 12 real dog tricks across 3 categories:
  - Basic Obedience (5): Sit, Stay, Come, Down, Leave It
  - Puppy Tricks (4): Shake Paws, Spin, Roll Over, High Five
  - Advanced (3): Play Dead, Weave Through Legs, Fetch & Return
- **Zustand Store** — Full implementation in `useAppStore.ts` with AsyncStorage persistence:
  - `streak` counter with increment/reset actions
  - `masteredTricks` array with toggle action
  - `dogProfile` (name, breed) with setter
- **TrickCard Component** — Enhanced with difficulty badge (color-coded), mastered checkmark, step count, and `borderCurve="continuous"` squircle styling
- **Library Screen** — Tricks grouped by category with mastery progress counter and navigation to trick detail
- **Trick Detail Screen** — Numbered step-by-step instructions, difficulty badge, category label, and "Mark as Mastered" toggle button

### Scaffolded (placeholder only)
- Project structure with Expo Router file-based routing
- Bottom tab navigation (Home, Library, Clicker, Profile)
- NativeWind v5 / Tailwind CSS v4 styling setup
- Color design tokens in `Colors.ts`
